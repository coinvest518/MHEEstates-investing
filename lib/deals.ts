export type DealStatus = "active" | "coming-soon" | "funded"

export interface ParcelDetails {
  municipality: string
  swis: string
  taxMapNumber: string
  classCode: string
  schoolDistrict: string
  lotSize: string
  landAssessment: number
  totalAssessment: number
  fullMarketValue: number
  sewerType: string
  waterSupply: string
  utilities: string
  description: string
}

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
  investmentPitch?: string
  parcelDetails?: ParcelDetails
}

export const DEALS: Deal[] = [
  {
    id: "property-001",
    title: "Property #001 — 246 Eagle St, Albany",
    location: "246 Eagle St, Albany, NY",
    parcelId: "76.56-4-60",
    status: "active",
    purchasePrice: 1075,
    targetRaise: 4000,
    raisedSoFar: 1306.5,
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
    investmentPitch:
      "Won at county tax auction for $1,075 against a $3,125 county-assessed market value — a built-in spread the day we get the deed. Public sewer, water, gas, and electric already at the curb means almost no infrastructure cost to convert into a working community garden. Walking distance from MHE Gardens' existing footprint, so volunteer labor and tools are already in the neighborhood.",
    parcelDetails: {
      municipality: "City of Albany",
      swis: "010100",
      taxMapNumber: "76.56-4-60",
      classCode: "311 — Residential Vacant Land",
      schoolDistrict: "Albany",
      lotSize: "11 ft × 66 ft",
      landAssessment: 3000,
      totalAssessment: 3000,
      fullMarketValue: 3125,
      sewerType: "Public",
      waterSupply: "Public",
      utilities: "Gas & Electric",
      description: "Vacant lot located to the left of house 244.",
    },
  },
  {
    id: "property-002",
    title: "Property #002 — 181 Third Ave, Albany",
    location: "181 Third Ave, Albany, NY",
    parcelId: "76.56-4-38",
    status: "active",
    purchasePrice: 1500,
    targetRaise: 4500,
    raisedSoFar: 1306.5,
    developmentPlan:
      "Second auction-won lot. Planned use to be decided with member input — options include companion food garden or a small community gathering space.",
    timeline: "Summer 2026",
    images: [
      { src: "/property-2-third-ave/third street33.jpg", alt: "Third Ave lot — street view" },
      { src: "/property-2-third-ave/second land deal image.jpg", alt: "Third Ave lot — property view" },
    ],
    highlights: [
      "Address: 181 Third Ave (Albany County, NY)",
      "Won at tax auction alongside Property #001 for $1,500",
      "Larger footprint — over 2,200 sq ft",
      "Members vote on development direction",
      "Remainder funds site prep and initial build-out",
    ],
    investmentPitch:
      "Same auction night, second win — $1,500 in for a parcel the county marks at $3,125. A larger footprint than Eagle St (over 2,200 sq ft) gives us room for either a companion food garden or a small open-air gathering space. Member vote decides the build.",
    parcelDetails: {
      municipality: "City of Albany",
      swis: "010100",
      taxMapNumber: "76.56-4-38",
      classCode: "311 — Residential Vacant Land",
      schoolDistrict: "Albany",
      lotSize: "21 ft × 105.48 ft",
      landAssessment: 3000,
      totalAssessment: 3000,
      fullMarketValue: 3125,
      sewerType: "Public",
      waterSupply: "Public",
      utilities: "Gas & Electric",
      description: "Vacant lot located to the right of house 183.",
    },
  },
]

export const progressPct = (d: Deal): number => {
  if (d.targetRaise <= 0) return 0
  return Math.min(100, Math.round((d.raisedSoFar / d.targetRaise) * 100))
}
