"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
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
import { Sprout, Loader2 } from "lucide-react"

const PreferredLot = z.enum(["eagle", "third", "either"])
const PlotTier = z.enum(["starter", "family", "communal"])
const Experience = z.enum(["first-timer", "some", "master"])

const FormSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email").max(160),
  preferredLot: PreferredLot,
  plotTier: PlotTier,
  experience: Experience,
  notes: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

type FormValues = z.infer<typeof FormSchema>

const LOTS: { value: z.infer<typeof PreferredLot>; label: string; sub: string }[] = [
  { value: "eagle", label: "246 Eagle St", sub: "Albany — smaller lot, walking distance to MHE Gardens" },
  { value: "third", label: "181 Third Ave", sub: "Albany — larger lot, more communal space" },
  { value: "either", label: "Either", sub: "Match me to whichever has openings first" },
]

const TIERS: { value: z.infer<typeof PlotTier>; label: string; price: string }[] = [
  { value: "starter", label: "Starter Plot", price: "4×8 raised bed · ~$15/mo or $120/season" },
  { value: "family", label: "Family Plot", price: "8×12 raised bed · ~$30/mo or $240/season" },
  { value: "communal", label: "Communal Share", price: "Join workdays, split harvest · $5/mo suggested" },
]

const EXPERIENCE: { value: z.infer<typeof Experience>; label: string }[] = [
  { value: "first-timer", label: "First-timer" },
  { value: "some", label: "Some experience" },
  { value: "master", label: "Master gardener" },
]

export function RentALotForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      preferredLot: "either",
      plotTier: "starter",
      experience: "first-timer",
      notes: "",
      website: "",
    },
  })

  useEffect(() => {
    const tier = searchParams.get("tier")
    if (tier === "starter" || tier === "family" || tier === "communal") {
      form.setValue("plotTier", tier)
    }
  }, [searchParams, form])

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, source: "rent-a-lot" }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? "Something went wrong. Please try again.")
        return
      }
      toast.success("Got it — we'll reach out about plot openings.")
      setSubmitted(true)
      form.reset()
    } catch {
      toast.error("Network error. Please try again.")
    }
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
      {submitted ? (
        <div className="text-center py-10 space-y-4">
          <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
            <Sprout className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">You&apos;re on the waitlist.</h3>
          <p className="text-muted-foreground text-pretty">
            We&apos;ll reach out as soon as a plot matching your preference opens up.
          </p>
          <div className="pt-2 border-t border-border">
            <a
              href="/pdfs/project-outline.pdf"
              download
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
            >
              ↓ Download project outline
            </a>
          </div>
          <Button variant="outline" onClick={() => setSubmitted(false)} className="mt-2">
            Submit another
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...form.register("website")}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <div className="grid sm:grid-cols-2 gap-6">
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

            <FormField
              control={form.control}
              name="plotTier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plot tier</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid sm:grid-cols-3 gap-3"
                    >
                      {TIERS.map((tier) => (
                        <Label
                          key={tier.value}
                          htmlFor={`tier-${tier.value}`}
                          className="flex flex-col items-start gap-1 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition"
                        >
                          <RadioGroupItem id={`tier-${tier.value}`} value={tier.value} className="sr-only" />
                          <span className="font-semibold">{tier.label}</span>
                          <span className="text-xs text-muted-foreground">{tier.price}</span>
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
              name="preferredLot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred lot</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid sm:grid-cols-3 gap-3"
                    >
                      {LOTS.map((lot) => (
                        <Label
                          key={lot.value}
                          htmlFor={`lot-${lot.value}`}
                          className="flex flex-col items-start gap-1 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition"
                        >
                          <RadioGroupItem id={`lot-${lot.value}`} value={lot.value} className="sr-only" />
                          <span className="font-semibold">{lot.label}</span>
                          <span className="text-xs text-muted-foreground">{lot.sub}</span>
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
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gardening experience</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-3 gap-3"
                    >
                      {EXPERIENCE.map((opt) => (
                        <Label
                          key={opt.value}
                          htmlFor={`exp-${opt.value}`}
                          className="flex items-center justify-center gap-2 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition"
                        >
                          <RadioGroupItem id={`exp-${opt.value}`} value={opt.value} className="sr-only" />
                          <span className="font-semibold text-sm">{opt.label}</span>
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anything else? (optional)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="What do you want to grow? Questions about access?" {...field} />
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
                  <Sprout className="mr-2 h-4 w-4" /> Join the waitlist
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center text-pretty">
              No payment is collected here. Pricing is suggested and finalized once a plot is offered to you.
            </p>
          </form>
        </Form>
      )}
    </div>
  )
}
