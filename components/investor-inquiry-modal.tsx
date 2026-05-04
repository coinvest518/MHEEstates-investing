"use client"

import { ReactNode, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Send } from "lucide-react"

const Track = z.enum(["sponsor", "in-kind", "for-profit", "learning"])
const CheckSize = z.enum(["under-1k", "1k-5k", "5k-25k", "25k+", "other"])

const FormSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email").max(160),
  organization: z.string().max(160).optional(),
  phone: z.string().max(40).optional(),
  track: Track,
  checkSize: CheckSize,
  message: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

type FormValues = z.infer<typeof FormSchema>

const TRACKS: { value: z.infer<typeof Track>; label: string; sub: string }[] = [
  { value: "sponsor", label: "Sponsor a lot", sub: "$5K–$25K, named on the parcel" },
  { value: "in-kind", label: "In-kind partner", sub: "Donate materials or services" },
  { value: "for-profit", label: "For-profit interest", sub: "Be on the list for MHE Estates LLC" },
  { value: "learning", label: "Just learning", sub: "Want a deeper conversation" },
]

const CHECKS: { value: z.infer<typeof CheckSize>; label: string }[] = [
  { value: "under-1k", label: "Under $1K" },
  { value: "1k-5k", label: "$1K–$5K" },
  { value: "5k-25k", label: "$5K–$25K" },
  { value: "25k+", label: "$25K+" },
  { value: "other", label: "Other / TBD" },
]

interface Props {
  trigger: ReactNode
}

export function InvestorInquiryModal({ trigger }: Props) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      phone: "",
      track: "sponsor",
      checkSize: "5k-25k",
      message: "",
      website: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, source: "investor" }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? "Something went wrong. Please try again.")
        return
      }
      toast.success("Got it. We'll be in touch within 48 hours.")
      setSubmitted(true)
      form.reset()
    } catch {
      toast.error("Network error. Please try again.")
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v)
        if (!v) setSubmitted(false)
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Express investor interest</DialogTitle>
          <DialogDescription>
            Tell us how you&apos;d like to be involved. We reply personally within 48 hours.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <h3 className="text-xl font-bold">Thanks — we&apos;ll be in touch.</h3>
            <p className="text-muted-foreground text-sm text-pretty">
              We review every investor inquiry personally. Expect an email from us shortly.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                {...form.register("website")}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" autoComplete="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Company / fund / family office" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone (optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (___) ___-____" autoComplete="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="track"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Track</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid sm:grid-cols-2 gap-3"
                      >
                        {TRACKS.map((t) => (
                          <Label
                            key={t.value}
                            htmlFor={`track-${t.value}`}
                            className="flex flex-col items-start gap-1 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition"
                          >
                            <RadioGroupItem id={`track-${t.value}`} value={t.value} className="sr-only" />
                            <span className="font-semibold text-sm">{t.label}</span>
                            <span className="text-xs text-muted-foreground">{t.sub}</span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check size you&apos;re considering</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-2 sm:grid-cols-5 gap-2"
                      >
                        {CHECKS.map((c) => (
                          <Label
                            key={c.value}
                            htmlFor={`check-${c.value}`}
                            className="flex items-center justify-center gap-1 border border-border rounded-lg px-3 py-2 cursor-pointer hover:border-primary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition"
                          >
                            <RadioGroupItem id={`check-${c.value}`} value={c.value} className="sr-only" />
                            <span className="font-semibold text-sm">{c.label}</span>
                          </Label>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message (optional)</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="What would make this make sense for you?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send inquiry
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center text-pretty">
                CommunityAcre is a community impact pool. This is not an offer to sell securities.
                We&apos;ll discuss any future for-profit structures (MHE Estates LLC) directly with you,
                in writing, with all required disclosures.
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
