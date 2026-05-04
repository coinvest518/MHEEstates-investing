import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

const CommunityPoolSchema = z.object({
  source: z.literal("community-pool").default("community-pool"),
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  contributionTier: z.enum(["20", "50", "100", "100+"]),
  interest: z.enum(["community", "housing", "opportunities", "education"]),
  notes: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

const RentALotSchema = z.object({
  source: z.literal("rent-a-lot"),
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  preferredLot: z.enum(["eagle", "third", "either"]),
  plotTier: z.enum(["starter", "family", "communal"]),
  experience: z.enum(["first-timer", "some", "master"]),
  notes: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

const InvestorSchema = z.object({
  source: z.literal("investor"),
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  organization: z.string().max(160).optional(),
  phone: z.string().max(40).optional(),
  track: z.enum(["sponsor", "in-kind", "for-profit", "learning"]),
  checkSize: z.enum(["under-1k", "1k-5k", "5k-25k", "25k+", "other"]),
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

const LeadSchema = z.discriminatedUnion("source", [
  CommunityPoolSchema,
  RentALotSchema,
  InvestorSchema,
])

const INTEREST_LABEL = {
  community: "Community projects",
  housing: "Housing",
  opportunities: "Future opportunities",
  education: "Education / guides",
} as const

const LOT_LABEL = {
  eagle: "246 Eagle St",
  third: "181 Third Ave",
  either: "Either lot",
} as const

const TIER_LABEL = {
  starter: "Starter Plot (4×8) — ~$15/mo",
  family: "Family Plot (8×12) — ~$30/mo",
  communal: "Communal Share — ~$5/mo",
} as const

const EXPERIENCE_LABEL = {
  "first-timer": "First-timer",
  some: "Some experience",
  master: "Master gardener",
} as const

const TRACK_LABEL = {
  sponsor: "Sponsor a lot",
  "in-kind": "In-kind partner",
  "for-profit": "For-profit interest",
  learning: "Just learning",
} as const

const CHECK_LABEL = {
  "under-1k": "Under $1,000",
  "1k-5k": "$1,000–$5,000",
  "5k-25k": "$5,000–$25,000",
  "25k+": "$25,000+",
  other: "Other",
} as const

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  )

const row = (label: string, value: string) =>
  `<p><strong>${label}:</strong> ${escape(value)}</p>`

function buildEmail(data: z.infer<typeof LeadSchema>): { subject: string; html: string } {
  if (data.source === "rent-a-lot") {
    const html = `
      <h2>New Rent-a-Lot inquiry</h2>
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Preferred lot", LOT_LABEL[data.preferredLot])}
      ${row("Plot tier", TIER_LABEL[data.plotTier])}
      ${row("Experience", EXPERIENCE_LABEL[data.experience])}
      ${data.notes ? `<p><strong>Notes:</strong><br/>${escape(data.notes).replace(/\n/g, "<br/>")}</p>` : ""}
    `
    return {
      subject: `[Rent-a-Lot] ${data.name} — ${TIER_LABEL[data.plotTier]}`,
      html,
    }
  }

  if (data.source === "investor") {
    const html = `
      <h2>New Investor inquiry</h2>
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${data.organization ? row("Organization", data.organization) : ""}
      ${data.phone ? row("Phone", data.phone) : ""}
      ${row("Track", TRACK_LABEL[data.track])}
      ${row("Check size", CHECK_LABEL[data.checkSize])}
      ${data.message ? `<p><strong>Message:</strong><br/>${escape(data.message).replace(/\n/g, "<br/>")}</p>` : ""}
    `
    return {
      subject: `[Investor] ${data.name} — ${CHECK_LABEL[data.checkSize]}`,
      html,
    }
  }

  const html = `
    <h2>New CommunityAcre lead</h2>
    ${row("Name", data.name)}
    ${row("Email", data.email)}
    ${row("Contribution tier", `$${data.contributionTier}`)}
    ${row("Interest", INTEREST_LABEL[data.interest])}
    ${data.notes ? `<p><strong>Notes:</strong><br/>${escape(data.notes).replace(/\n/g, "<br/>")}</p>` : ""}
  `
  return {
    subject: `[CommunityAcre] New lead: ${data.name} ($${data.contributionTier})`,
    html,
  }
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
  }

  if (body && typeof body === "object" && !("source" in (body as Record<string, unknown>))) {
    ;(body as Record<string, unknown>).source = "community-pool"
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
  const { subject, html } = buildEmail(data)

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
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
