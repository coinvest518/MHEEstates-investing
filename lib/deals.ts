export type DealStatus = "active" | "coming-soon" | "funded"

export interface Deal {
  id: string
  title: string
  location: string
  parcelId?: string
  status: DealStatus
  purchasePrice: number
  targetRaise: number
  raisedSoFar: number
  contributorCount?: number
  developmentPlan: string
  timeline?: string
  images: { src: string; alt: string }[]
  highlights: string[]
}

export const DEALS: Deal[] = [
  {
    id: "property-001",
    title: "Property #001 — Albany County Lot",
    location: "Albany County, NY",
    status: "active",
    purchasePrice: 1075,
    targetRaise: 4000,
    raisedSoFar: 0,
    developmentPlan:
      "Convert to a community food garden with raised beds, a tool shed, and a shared harvest program for neighbors.",
    timeline: "Spring 2026",
    images: [
      { src: "/property-2-third-ave/property-1-eagle-images/Eagel Property 1.jpg", alt: "246 Eagle St — the lot as it stands today" },
      { src: "/property-2-third-ave/property-1-eagle-images/eagel street 2.PNG", alt: "246 Eagle St — street view" },
      { src: "/property-2-third-ave/property-1-eagle-images/eagek stree 3 live image .jpg", alt: "246 Eagle St — live site photo" },
      { src: "/property-2-third-ave/property-1-eagle-images/eagle street plot outline.jpg", alt: "246 Eagle St — parcel boundary map" },
    ],
    highlights: [
      "Address: 246 Eagle St (Albany County, NY)",
      "Won at county tax auction for $1,075",
      "Vacant land, zoned for community / agricultural use",
      "Walking distance to existing MHE Gardens project",
      "Estimated total with fees: $1,200–$1,400",
      "Remainder of pooled funds covers fencing, soil, raised beds, and tools",
    ],
  },
  {
    id: "property-002",
    title: "Property #002 — Third Ave Lot",
    location: "Third Ave, Upstate NY",
    status: "active",
    purchasePrice: 1500,
    targetRaise: 4500,
    raisedSoFar: 0,
    developmentPlan:
      "Second auction-won lot. Planned use to be decided with member input — options include companion food garden or a small community gathering space.",
    timeline: "Summer 2026",
    images: [
      { src: "/property-2-third-ave/third street33.jpg", alt: "Third Ave lot — street view" },
      { src: "/property-2-third-ave/second land deal image.jpg", alt: "Third Ave lot — property view" },
    ],
    highlights: [
      "Won at tax auction alongside Property #001",
      "Members vote on development direction",
      "Remainder funds site prep and initial build-out",
    ],
  },
  {
    id: "property-003",
    title: "The Vision — Vacant Lot to Food Garden",
    location: "Albany County, NY",
    status: "coming-soon",
    purchasePrice: 0,
    targetRaise: 0,
    raisedSoFar: 0,
    developmentPlan:
      "This is what your contribution builds. A neglected, overgrown lot — bought at a tax auction for under $2,000 — becomes a thriving community food garden with raised beds, composting stations, and a shared harvest program open to the whole neighborhood.",
    timeline: "Spring–Summer 2026",
    images: [
      { src: "/imagesnew/before-and-after.jpg", alt: "Before and after: vacant lot transformed into a community food garden" },
    ],
    highlights: [
      "Before: abandoned vacant lot acquired at tax auction",
      "After: raised beds, tool shed, composting station, open to all",
      "Shared harvest — neighbors grow and eat together",
      "Fencing, soil, seeds, and tools funded by pooled contributions",
      "Every $20 contribution moves the transformation forward",
      "Be part of the before-and-after story from day one",
    ],
  },
]

export const progressPct = (d: Deal): number => {
  if (d.targetRaise <= 0) return 0
  return Math.min(100, Math.round((d.raisedSoFar / d.targetRaise) * 100))
}
