"use client"

import { useState } from "react"
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
import { Sprout, Loader2, Receipt, Bell, Vote, ImageIcon, DollarSign, ExternalLink } from "lucide-react"

const ContributionTier = z.enum(["20", "50", "100", "100+"])
const Interest = z.enum(["community", "housing", "opportunities", "education"])

const FormSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email").max(160),
  contributionTier: ContributionTier,
  interest: Interest,
  notes: z.string().max(2000).optional(),
  website: z.string().max(0).optional(),
})

type FormValues = z.infer<typeof FormSchema>

const TIERS: { value: z.infer<typeof ContributionTier>; label: string }[] = [
  { value: "20", label: "$20" },
  { value: "50", label: "$50" },
  { value: "100", label: "$100" },
  { value: "100+", label: "$100+" },
]

const INTERESTS: { value: z.infer<typeof Interest>; label: string; description: string }[] = [
  { value: "community", label: "Community projects", description: "Food gardens, gathering spaces" },
  { value: "housing", label: "Housing", description: "Land for affordable housing concepts" },
  { value: "opportunities", label: "Future opportunities", description: "Notify me of new auction targets" },
  { value: "education", label: "Education", description: "Tax liens, deeds, auction guides" },
]

export function JoinReserveForm() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      contributionTier: "20",
      interest: "community",
      notes: "",
      website: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        toast.error(data.error ?? "Something went wrong. Please try again.")
        return
      }
      toast.success("You're on the list. We'll be in touch soon.")
      setSubmitted(true)
      form.reset()
    } catch {
      toast.error("Network error. Please try again.")
    }
  }

  return (
    <section id="join" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Get involved</p>
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Join the Pool
          </h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
            Tell us how you&apos;d like to participate. We&apos;ll send deal updates and notify you of upcoming auctions.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left: value props */}
          <div className="lg:col-span-2 space-y-6 reveal">
            <h3 className="text-xl font-bold text-foreground">What you get</h3>
            <ul className="space-y-4">
              {[
                { icon: Receipt, text: "Tax-deductible donation receipt via Fortis Proles Inc. (501(c)(3))" },
                { icon: Bell, text: "Deal updates — real parcels, real prices, before anyone else" },
                { icon: Vote, text: "Member vote on how land is developed and used" },
                { icon: ImageIcon, text: "Real photos from the lots: before, during, and after" },
                { icon: DollarSign, text: "Start at just $20 — no credit check, no real estate license required" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3 items-start text-sm text-muted-foreground">
                  <span className="mt-0.5 flex-shrink-0 p-1.5 bg-primary/10 rounded-md">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3">Rather donate directly?</p>
              <a
                href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm transition-colors"
              >
                Give via Zeffy (100% to the land fund) <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 reveal" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">You&apos;re on the list.</h3>
              <p className="text-muted-foreground text-pretty">
                We&apos;ll reach out with deal updates and the next auction we&apos;re tracking.
              </p>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Submit another response
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
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contributionTier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How much would you contribute?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                        >
                          {TIERS.map((tier) => (
                            <Label
                              key={tier.value}
                              htmlFor={`tier-${tier.value}`}
                              className="flex items-center justify-center gap-2 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition"
                            >
                              <RadioGroupItem
                                id={`tier-${tier.value}`}
                                value={tier.value}
                                className="sr-only"
                              />
                              <span className="font-semibold">{tier.label}</span>
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
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What interests you most?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="grid sm:grid-cols-2 gap-3"
                        >
                          {INTERESTS.map((opt) => (
                            <Label
                              key={opt.value}
                              htmlFor={`interest-${opt.value}`}
                              className="flex items-start gap-3 border border-border rounded-lg px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition"
                            >
                              <RadioGroupItem
                                id={`interest-${opt.value}`}
                                value={opt.value}
                                className="mt-1"
                              />
                              <div>
                                <div className="font-semibold">{opt.label}</div>
                                <div className="text-xs text-muted-foreground">{opt.description}</div>
                              </div>
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
                        <Textarea
                          rows={3}
                          placeholder="Questions, ideas, or what you'd love to see us build..."
                          {...field}
                        />
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Sprout className="mr-2 h-4 w-4" />
                      Reserve My Spot
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center text-pretty">
                  By submitting you agree to receive updates from CommunityAcre.
                  This is a community impact pool, not an investment offering — no financial returns are promised.
                </p>
              </form>
            </Form>
          )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
