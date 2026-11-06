import { SCENARIOS } from "./stem-scenarios"

export type Trait =
  | "analytical"
  | "creative"
  | "social"
  | "handsOn"
  | "leadership"
  | "investigative"

export const TRAIT_LABELS: Record<Trait, string> = {
  analytical: "Analytical",
  creative: "Creative",
  social: "People-focused",
  handsOn: "Hands-on",
  leadership: "Leadership",
  investigative: "Investigative",
}

export type PathSignal = "structured" | "applied" | "entrepreneurial"

export type Riasec = "R" | "I" | "A" | "S" | "E" | "C"
export type ScenarioOption = {
  id: string
  label: string
  traits: Partial<Record<Trait, number>>
  path: PathSignal
  riasec: Riasec
  onetTheme: string
}

export type Scenario = {
  id: string
  situation: string
  prompt: string
  options: ScenarioOption[]
}

export { SCENARIOS } from "./stem-scenarios"

export const QUIZ_SIZE = 8

export function getRandomizedQuizQuestions(): Scenario[] {
  const shuffled = [...SCENARIOS]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled.slice(0, QUIZ_SIZE)
}

/** All report majors are STEM areas (Sprint 2 scope). */
export type Cluster = "stem"

export type Career = {
  title: string
  url: string
}

export type Major = {
  id: string
  name: string
  cluster: Cluster
  blurb: string
  careers: Career[]
  profile: Partial<Record<Trait, number>>
}

export const MAJORS: Major[] = [
  {
    id: "biology",
    name: "Biology",
    cluster: "stem",
    blurb: "Study living systems, organisms, and biological processes through observation, experiments, and data analysis.",
    careers: [
      { title: "Biological Technicians", url: "https://www.onetonline.org/link/summary/19-4021.00" },
      { title: "Agricultural Technicians", url: "https://www.onetonline.org/link/summary/19-4012.00" },
      { title: "Zoologists and Wildlife Biologists", url: "https://www.onetonline.org/link/summary/19-1023.00" },
    ],
    profile: { investigative: 3, analytical: 3, handsOn: 2, creative: 1 },
  },
  {
    id: "chemistry",
    name: "Chemistry",
    cluster: "stem",
    blurb: "Investigate matter, reactions, and materials using experiments, testing, and analytical reasoning.",
    careers: [
      { title: "Chemists", url: "https://www.onetonline.org/link/summary/19-2031.00" },
      { title: "Chemical Technicians", url: "https://www.onetonline.org/link/summary/19-4031.00" },
      { title: "Chemical Engineers", url: "https://www.onetonline.org/link/summary/17-2041.00" },
    ],
    profile: { investigative: 3, analytical: 3, handsOn: 2, creative: 2 },
  },
  {
    id: "physics",
    name: "Physics",
    cluster: "stem",
    blurb: "Examine physical laws, energy, systems, and motion through mathematical reasoning and experimentation.",
    careers: [
      { title: "Occupational Health and Safety Specialists", url: "https://www.onetonline.org/link/summary/19-5011.00" },
      { title: "Physical Therapist Assistants", url: "https://www.onetonline.org/link/summary/31-2021.00" },
      { title: "Career/Technical Education Teachers, Middle School", url: "https://www.onetonline.org/link/summary/25-2023.00" },
    ],
    profile: { investigative: 3, analytical: 3, handsOn: 1, creative: 2 },
  },
  {
    id: "environmental-science",
    name: "Environmental Science",
    cluster: "stem",
    blurb: "Study environmental and Earth systems through field observation, scientific analysis, and applied problem-solving.",
    careers: [
      { title: "Environmental Scientists and Specialists, Including Health", url: "https://www.onetonline.org/link/summary/19-2041.00" },
      { title: "Conservation Scientists", url: "https://www.onetonline.org/link/summary/19-1031.00" },
      { title: "Geoscientists, Except Hydrologists and Geographers", url: "https://www.onetonline.org/link/summary/19-2042.00" },
    ],
    profile: { investigative: 3, analytical: 2, handsOn: 3, social: 2, creative: 1 },
  },
  {
    id: "mathematics",
    name: "Mathematics",
    cluster: "stem",
    blurb: "Use quantitative reasoning and abstract modeling to solve problems in science, technology, and decision-making.",
    careers: [
      { title: "Elementary School Teachers, Except Special Education", url: "https://www.onetonline.org/link/summary/25-2021.00" },
      { title: "Statisticians", url: "https://www.onetonline.org/link/summary/15-2041.00" },
      { title: "Operations Research Analysts", url: "https://www.onetonline.org/link/summary/15-2031.00" },
    ],
    profile: { analytical: 3, investigative: 2, creative: 3, social: 1 },
  },
  {
    id: "statistics-data-science",
    name: "Statistics / Data Science",
    cluster: "stem",
    blurb: "Analyze patterns, interpret data, and build models that support insight and prediction across many fields.",
    careers: [
      { title: "Data Scientists", url: "https://www.onetonline.org/link/summary/15-2051.00" },
      { title: "Actuaries", url: "https://www.onetonline.org/link/summary/15-2011.00" },
      { title: "Biostatisticians", url: "https://www.onetonline.org/link/summary/15-2041.01" },
    ],
    profile: { analytical: 3, investigative: 3, creative: 2, social: 2, handsOn: 1 },
  },
  {
    id: "computer-science",
    name: "Computer Science",
    cluster: "stem",
    blurb: "Design software, systems, and computational tools to solve complex problems.",
    careers: [
      { title: "Software Developers", url: "https://www.onetonline.org/link/summary/15-1252.00" },
      { title: "Computer Network Architects", url: "https://www.onetonline.org/link/summary/15-1241.00" },
      { title: "Information Security Analysts", url: "https://www.onetonline.org/link/summary/15-1212.00" },
    ],
    profile: { analytical: 3, investigative: 2, creative: 3, social: 1, handsOn: 1 },
  },
  {
    id: "engineering",
    name: "Engineering",
    cluster: "stem",
    blurb: "Design, test, and improve structures, machines, materials, and technical systems.",
    careers: [
      { title: "Civil Engineers", url: "https://www.onetonline.org/link/summary/17-2051.00" },
      { title: "Mechanical Engineers", url: "https://www.onetonline.org/link/summary/17-2141.00" },
      { title: "Electrical Engineers", url: "https://www.onetonline.org/link/summary/17-2071.00" },
    ],
    profile: { analytical: 2, handsOn: 3, investigative: 2, creative: 3, social: 1, leadership: 1 },
  },
]

export const CLUSTER_LABELS: Record<Cluster, string> = {
  stem: "STEM",
}

import gaCollegesData from "./ga-colleges.json"

/** PathFinder is scoped to Georgia public 4-year colleges (PAT-17). */
export type Region = "Georgia"

export const GEORGIA_REGION: Region = "Georgia"

export type StemProgram = {
  code: string
  title: string
}

export type College = {
  id: string
  name: string
  city: string
  inStateTuition: number | null
  completionRate: number | null
  studentSize: number | null
  stemCipCodes: string[]
  stemPrograms: StemProgram[]
}

/** GA public 4-year institutions from College Scorecard (refreshed via scripts/fetch-ga-colleges.mjs). */
export const COLLEGES: College[] = gaCollegesData.schools