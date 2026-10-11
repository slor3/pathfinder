import {
  SCENARIOS,
  MAJORS,
  COLLEGES,
  type Trait,
  type PathSignal,
  type Major,
  type College,
} from "./pathfinder-data"
import { countStemFamilyOverlap } from "./cip-families"

const TRAITS: Trait[] = ["analytical", "creative", "social", "handsOn", "leadership", "investigative"]

const DISPLAY_COLLEGE_LIMIT = 10
const DISPLAY_MAJOR_LIMIT = 3

export type Answers = Record<string, string> // scenarioId -> optionId
export type PathwayAnswers = {
  educationGoal: "degree-required" | "practical-skills" | "explore" | "unsure"
  learningPreference: "structured" | "applied" | "mixed" | "unsure"
  commitment: "several-years" | "shorter-first" | "work-first" | "unsure"
}

export type MajorMatch = { major: Major; score: number }
export type CollegeMatch = { college: College; score: number }

export type PathRecommendation = {
  key: PathSignal | "mixed"
  title: string
  summary: string
}

export type Report = {
  traitScores: Record<Trait, number> // normalized 0-100
  topTraits: Trait[]
  majors: MajorMatch[]
  path: PathRecommendation
  pathBreakdown: Record<PathSignal, number>
  colleges: CollegeMatch[]
}

const PATH_COPY: Record<PathSignal | "mixed", { title: string; summary: string }> = {
  structured: {
    title: "Explore a 4-year STEM degree at a Georgia public university.",
    summary:
      "Based on your answers, a structured bachelor's program in a STEM field at a Georgia public university may be worth exploring — especially if you want clear coursework and a degree path.",
  },
  applied: {
    title: "Consider a hands-on start with a 2-year transfer path",
    summary:
      "You may prefer learning by doing first. Many students start at a Georgia technical or community college, build skills in a shorter program, then transfer toward a 4-year STEM degree at a public university.",
  },
  flexible: {
    title: "Explore a flexible, interdisciplinary STEM track in college",
    summary:
      "Your answers suggest you might thrive combining design, leadership, and STEM coursework. Georgia public universities offer interdisciplinary majors, minors, and project-based paths within a college degree.",
  },
  mixed: {
    title: "Your college-fit signals are mixed — explore before you decide",
    summary:
      "Your scenario answers point in more than one direction. You might sample structured classes, hands-on labs, and flexible project work at Georgia public colleges before choosing a longer STEM path.",
  },
}

function percentileRank(value: number, values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const index = sorted.findIndex((v) => v >= value)
  const rank = index === -1 ? sorted.length - 1 : index
  return rank / Math.max(1, sorted.length - 1)
}

function stemCipOverlap(college: College, topMajors: MajorMatch[]): number {
  return countStemFamilyOverlap(
    college,
    topMajors.map((match) => match.major.id),
  )
}

function rankColleges(topMajors: MajorMatch[]): CollegeMatch[] {
  const completionRates = COLLEGES
    .map((c) => c.completionRate)
    .filter((v): v is number => v !== null)
  const tuitions = COLLEGES
    .map((c) => c.inStateTuition)
    .filter((v): v is number => v !== null)

  const collegeMatches: CollegeMatch[] = COLLEGES.map((college) => {
    const cipOverlap = stemCipOverlap(college, topMajors)
    const completionPercentile =
      college.completionRate !== null
        ? percentileRank(college.completionRate, completionRates)
        : 0
    const tuitionPercentile =
      college.inStateTuition !== null
        ? percentileRank(college.inStateTuition, tuitions)
        : 0.5

    // STEM CIP overlap (3×) + completion rate + inverse in-state price (per sprint recommendations).
    const score =
      3 * cipOverlap + completionPercentile + (1 - tuitionPercentile)

    return { college, score }
  })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, DISPLAY_COLLEGE_LIMIT)

  return collegeMatches
}

export function generateReport(
  answers: Answers,
  pathwayAnswers?: PathwayAnswers,
): Report {
  // 1. Tally trait scores and path signals from answers.
  const raw: Record<Trait, number> = {
    analytical: 0,
    creative: 0,
    social: 0,
    handsOn: 0,
    leadership: 0,
    investigative: 0,
  }
  const pathBreakdown: Record<PathSignal, number> = {
    structured: 0,
    applied: 0,
    flexible: 0,
  }

  for (const scenario of SCENARIOS) {
    const chosenId = answers[scenario.id]
    const option = scenario.options.find((o) => o.id === chosenId)
    if (!option) continue
    for (const [trait, value] of Object.entries(option.traits)) {
      raw[trait as Trait] += value as number
    }
    pathBreakdown[option.path] += 1
  }

  if (pathwayAnswers) {
    if (pathwayAnswers.educationGoal === "degree-required") pathBreakdown.structured += 1
    if (pathwayAnswers.learningPreference === "structured") pathBreakdown.structured += 1
    if (pathwayAnswers.commitment === "several-years") pathBreakdown.structured += 1
    if (pathwayAnswers.educationGoal === "practical-skills") pathBreakdown.applied += 1
    if (pathwayAnswers.learningPreference === "applied") pathBreakdown.applied += 1
    if (pathwayAnswers.commitment === "shorter-first") pathBreakdown.applied += 1
    if (pathwayAnswers.commitment === "work-first") pathBreakdown.applied += 1
  }

  // 2. Normalize traits to 0-100.
  const max = Math.max(1, ...TRAITS.map((t) => raw[t]))
  const traitScores = {} as Record<Trait, number>
  for (const t of TRAITS) {
    traitScores[t] = Math.round((raw[t] / max) * 100)
  }

  const topTraits = [...TRAITS].sort((a, b) => raw[b] - raw[a]).slice(0, 3)

  // 3. Score majors via dot product with the user's trait vector.
  const majorMatches: MajorMatch[] = MAJORS.map((major) => {
    let dot = 0
    let magnitude = 0
    for (const [trait, weight] of Object.entries(major.profile)) {
      dot += (weight as number) * raw[trait as Trait]
      magnitude += (weight as number) * (weight as number)
    }
    // Normalize by the major's own magnitude so broad majors don't dominate.
    const score = dot / Math.sqrt(magnitude || 1)
    return { major, score }
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, DISPLAY_MAJOR_LIMIT)

  // 4. Determine the recommended path.
  const rankedPaths = (Object.keys(pathBreakdown) as PathSignal[]).sort(
    (a, b) => pathBreakdown[b] - pathBreakdown[a],
  )
  const leadingPath = rankedPaths[0]
  const pathKey: PathSignal | "mixed" =
    pathBreakdown[leadingPath] - pathBreakdown[rankedPaths[1]] >= 2
      ? leadingPath
      : "mixed"

  // 5. Rank Georgia public colleges by STEM CIP overlap, completion rate, and in-state tuition.
  const collegeMatches = rankColleges(majorMatches)

  return {
    traitScores,
    topTraits,
    majors: majorMatches,
    path: { key: pathKey, ...PATH_COPY[pathKey] },
    pathBreakdown,
    colleges: collegeMatches,
  }
}
