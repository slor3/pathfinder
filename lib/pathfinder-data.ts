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

export type Cluster =
  | "stem"
  | "health"
  | "business"
  | "arts"
  | "trades"
  | "social-sciences"
  | "education"

export type Major = {
  id: string
  name: string
  cluster: Cluster
  blurb: string
  careers: string[]
  profile: Partial<Record<Trait, number>>
}

export const MAJORS: Major[] = [
  {
    id: "biology",
    name: "Biology",
    cluster: "stem",
    blurb: "Study living systems, organisms, and biological processes through observation, experiments, and data analysis.",
    careers: ["Biologist", "Laboratory Analyst", "Biomedical Researcher"],
    profile: { investigative: 3, analytical: 3, handsOn: 2, creative: 1 },
  },
  {
    id: "chemistry",
    name: "Chemistry",
    cluster: "stem",
    blurb: "Investigate matter, reactions, and materials using experiments, testing, and analytical reasoning.",
    careers: ["Chemist", "Materials Scientist", "Quality Analyst"],
    profile: { investigative: 3, analytical: 3, handsOn: 2, creative: 2 },
  },
  {
    id: "physics",
    name: "Physics",
    cluster: "stem",
    blurb: "Examine physical laws, energy, systems, and motion through mathematical reasoning and experimentation.",
    careers: ["Physicist", "Research Scientist", "Lab Analyst"],
    profile: { investigative: 3, analytical: 3, handsOn: 1, creative: 2 },
  },
  {
    id: "environmental-science",
    name: "Environmental Science",
    cluster: "stem",
    blurb: "Study environmental and Earth systems through field observation, scientific analysis, and applied problem-solving.",
    careers: ["Environmental Scientist", "Conservation Specialist", "Sustainability Analyst"],
    profile: { investigative: 3, analytical: 2, handsOn: 3, social: 2, creative: 1 },
  },
  {
    id: "mathematics",
    name: "Mathematics",
    cluster: "stem",
    blurb: "Use quantitative reasoning and abstract modeling to solve problems in science, technology, and decision-making.",
    careers: ["Mathematician", "Operations Analyst", "Modeling Specialist"],
    profile: { analytical: 3, investigative: 2, creative: 3, social: 1 },
  },
  {
    id: "statistics-data-science",
    name: "Statistics / Data Science",
    cluster: "stem",
    blurb: "Analyze patterns, interpret data, and build models that support insight and prediction across many fields.",
    careers: ["Data Analyst", "Statistician", "Data Scientist"],
    profile: { analytical: 3, investigative: 3, creative: 2, social: 2, handsOn: 1 },
  },
  {
    id: "computer-science",
    name: "Computer Science",
    cluster: "stem",
    blurb: "Design software, systems, and computational tools to solve complex problems.",
    careers: ["Software Developer", "Data Analyst", "Systems Engineer"],
    profile: { analytical: 3, investigative: 2, creative: 3, social: 1, handsOn: 1 },
  },
  {
    id: "engineering",
    name: "Engineering",
    cluster: "stem",
    blurb: "Design, test, and improve structures, machines, materials, and technical systems.",
    careers: ["Civil Engineer", "Electrical Engineer", "Mechanical Engineer"],
    profile: { analytical: 2, handsOn: 3, investigative: 2, creative: 3, social: 1, leadership: 1 },
  },
]

export const CLUSTER_LABELS: Record<Cluster, string> = {
  stem: "STEM",
  health: "Health",
  business: "Business",
  arts: "Arts & Media",
  trades: "Skilled Trades",
  "social-sciences": "Social Sciences",
  education: "Education",
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