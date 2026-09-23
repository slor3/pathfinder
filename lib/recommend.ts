import {
  SCENARIOS,
  MAJORS,
  COLLEGES,
  type Trait,
  type PathSignal,
  type Major,
  type College,
  type Region,
  type Cluster,
} from "./pathfinder-data"

const TRAITS: Trait[] = ["analytical", "creative", "social", "handsOn", "leadership", "investigative"]

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
    title: "A 4-year college is a strong fit",
    summary:
      "You tend to thrive with structured learning, clear goals, and deep study. A traditional degree path can give you the credentials and foundation your goals point toward.",
  },
  applied: {
    title: "A hands-on or 2-year path may suit you best",
    summary:
      "You learn best by doing. Community colleges, associate degrees, and trade programs get you building real skills faster — often at a lower cost, with the option to transfer later.",
  },
  entrepreneurial: {
    title: "Keep college flexible and goal-driven",
    summary:
      "You're driven, independent, and people-oriented. College can absolutely help, but choose it deliberately — for a specific goal, network, or skill — rather than by default.",
  },
  mixed: {
    title: "Your college-fit signals are mixed",
    summary:
      "Your answers point in more than one direction. Explore programs and learning environments that combine structure, hands-on practice, and flexibility before deciding.",
  },
}

export function generateReport(
  answers: Answers,
  region: Region,
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
    entrepreneurial: 0,
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
    .slice(0, 4)

  // 4. Determine the recommended path.
  const rankedPaths = (Object.keys(pathBreakdown) as PathSignal[]).sort(
    (a, b) => pathBreakdown[b] - pathBreakdown[a],
  )
  const leadingPath = rankedPaths[0]
  const scenarioPath =
    pathBreakdown[leadingPath] - pathBreakdown[rankedPaths[1]] >= 2
      ? leadingPath
      : "mixed"
  const pathKey =
    pathwayAnswers?.educationGoal === "degree-required" ||
    pathwayAnswers?.learningPreference === "structured" ||
    pathwayAnswers?.commitment === "several-years"
      ? "structured"
      : pathwayAnswers?.educationGoal === "practical-skills" ||
          pathwayAnswers?.commitment === "shorter-first" ||
          pathwayAnswers?.commitment === "work-first"
        ? "applied"
        : scenarioPath

  // 5. Recommend colleges in the chosen region that offer the top clusters.
  const topClusters = new Set<Cluster>(majorMatches.map((m) => m.major.cluster))
  const collegeMatches: CollegeMatch[] = COLLEGES.filter((c) => c.region === region)
    .map((college) => {
      const overlap = college.clusters.filter((c) => topClusters.has(c)).length
      // Boost colleges whose type matches the recommended path.
      const typeBonus =
        ((leadingPath === "structured" && college.type === "University") ||
        (leadingPath === "applied" &&
          (college.type === "Community College" || college.type === "Trade School"))
          ? 1.5
          : 0)
      const score = overlap + typeBonus + college.rating / 5
      return { college, score }
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)

  return {
    traitScores,
    topTraits,
    majors: majorMatches,
    path: { key: pathKey, ...PATH_COPY[pathKey] },
    pathBreakdown,
    colleges: collegeMatches,
  }
}
