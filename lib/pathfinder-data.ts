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
    id: "cs",
    name: "Computer Science",
    cluster: "stem",
    blurb: "Design software and solve problems with logic and code.",
    careers: ["Software Engineer", "Data Scientist", "AI Researcher"],
    profile: { analytical: 3, investigative: 2, creative: 1 },
  },
  {
    id: "engineering",
    name: "Engineering",
    cluster: "stem",
    blurb: "Apply math and science to build systems that work in the real world.",
    careers: ["Mechanical Engineer", "Civil Engineer", "Robotics Engineer"],
    profile: { analytical: 3, handsOn: 2, investigative: 1 },
  },
  {
    id: "nursing",
    name: "Nursing & Health Sciences",
    cluster: "health",
    blurb: "Care for people directly with a mix of science and empathy.",
    careers: ["Registered Nurse", "Physician Assistant", "Physical Therapist"],
    profile: { social: 3, handsOn: 2, analytical: 1 },
  },
  {
    id: "psychology",
    name: "Psychology",
    cluster: "social-sciences",
    blurb: "Understand how people think, feel, and behave.",
    careers: ["Counselor", "Therapist", "HR Specialist"],
    profile: { social: 3, investigative: 2, analytical: 1 },
  },
  {
    id: "business",
    name: "Business & Management",
    cluster: "business",
    blurb: "Lead teams, run operations, and turn ideas into ventures.",
    careers: ["Product Manager", "Operations Lead", "Founder"],
    profile: { leadership: 3, social: 2, analytical: 1 },
  },
  {
    id: "marketing",
    name: "Marketing & Communications",
    cluster: "business",
    blurb: "Blend creativity and strategy to tell stories that move people.",
    careers: ["Brand Strategist", "Content Lead", "Social Media Manager"],
    profile: { creative: 3, social: 2, leadership: 1 },
  },
  {
    id: "design",
    name: "Design & Digital Media",
    cluster: "arts",
    blurb: "Create visual and interactive experiences people love to use.",
    careers: ["UX Designer", "Graphic Designer", "Motion Designer"],
    profile: { creative: 3, investigative: 1, handsOn: 2 },
  },
  {
    id: "fine-arts",
    name: "Fine & Performing Arts",
    cluster: "arts",
    blurb: "Express ideas through art, music, film, or performance.",
    careers: ["Artist", "Musician", "Filmmaker"],
    profile: { creative: 3, handsOn: 1, social: 1 },
  },
  {
    id: "education",
    name: "Education & Teaching",
    cluster: "education",
    blurb: "Help others learn and grow at every stage of life.",
    careers: ["Teacher", "Curriculum Designer", "School Counselor"],
    profile: { social: 3, leadership: 2, analytical: 1 },
  },
  {
    id: "skilled-trades",
    name: "Skilled Trades & Technology",
    cluster: "trades",
    blurb: "Build, repair, and run the systems the world depends on.",
    careers: ["Electrician", "HVAC Technician", "Welder"],
    profile: { handsOn: 3, analytical: 1, investigative: 1 },
  },
  {
    id: "culinary",
    name: "Culinary & Hospitality",
    cluster: "trades",
    blurb: "Create experiences and run hands-on, people-facing businesses.",
    careers: ["Chef", "Hospitality Manager", "Baker"],
    profile: { handsOn: 3, creative: 2, social: 1 },
  },
  {
    id: "biology",
    name: "Biology & Life Sciences",
    cluster: "stem",
    blurb: "Investigate living systems, from cells to ecosystems.",
    careers: ["Researcher", "Lab Scientist", "Pre-Med"],
    profile: { investigative: 3, analytical: 2, social: 1 },
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