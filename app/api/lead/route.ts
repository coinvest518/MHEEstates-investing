import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

const LeadSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  contributionTier: z.enum(["20", "50", "100", "100+"]),
  interest: z.enum(["community", "housing", "opportunities", "education"]),
  notes: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

const INTEREST_LABEL: Record<z.infer<typeof LeadSchema>["interest"], string> = {
  community: "Community projects",
  housing: "Housing",
  opportunities: "Future opportunities",
  education: "Education / guides",
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  )

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  const parsed = LeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 })
  }
  const data = parsed.data

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_TO_EMAIL
  const from = process.env.LEAD_FROM_EMAIL ?? "onboarding@resend.dev"

  if (!apiKey || !to) {
    console.error("[lead] missing RESEND_API_KEY or LEAD_TO_EMAIL", {
      hasKey: Boolean(apiKey),
      hasTo: Boolean(to),
    })
    return NextResponse.json(
      { ok: false, error: "Email is not configured." },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  const html = `
    <h2>New CommunityAcre lead</h2>
    <p><strong>Name:</strong> ${escape(data.name)}</p>
    <p><strong>Email:</strong> ${escape(data.email)}</p>
    <p><strong>Contribution tier:</strong> $${escape(data.contributionTier)}</p>
    <p><strong>Interest:</strong> ${escape(INTEREST_LABEL[data.interest])}</p>
    ${data.notes ? `<p><strong>Notes:</strong><br/>${escape(data.notes).replace(/\n/g, "<br/>")}</p>` : ""}
  `

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `[CommunityAcre] New lead: ${data.name} ($${data.contributionTier})`,
      html,
    })
    if (error) {
      console.error("[lead] resend error", error)
      return NextResponse.json({ ok: false, error: "Email failed" }, { status: 502 })
    }
  } catch (err) {
    console.error("[lead] send threw", err)
    return NextResponse.json({ ok: false, error: "Email failed" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
