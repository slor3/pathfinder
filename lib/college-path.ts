import { SCENARIOS, type PathSignal, type Riasec } from "./pathfinder-data"

export type PathwayAnswers = {
  educationGoal: "degree-required" | "practical-skills" | "explore" | "unsure"
  learningPreference: "structured" | "applied" | "mixed" | "unsure"
  commitment: "several-years" | "shorter-first" | "work-first" | "unsure"
}

/** Leader must win by this many votes or the headline is `mixed`. */
export const PATH_VOTE_MARGIN = 2

/**
 * Research guide: how Holland RIASEC themes usually map to our three college-bound
 * paths when we label scenario options. Scenario `path` votes follow this rubric in
 * `lib/stem-scenarios.ts` (with intentional nuance where an option blends themes).
 */
export const RIASEC_PATH_GUIDE: Record<
  Riasec,
  { typicalPath: PathSignal; rationale: string }
> = {
  R: {
    typicalPath: "applied",
    rationale:
      "Realistic (R) interests emphasize hands-on work with tools, equipment, and field tasks—often associated with applied training and transfer pathways.",
  },
  I: {
    typicalPath: "structured",
    rationale:
      "Investigative (I) interests emphasize analysis, experiments, and formal study—aligned with structured 4-year STEM degree exploration.",
  },
  A: {
    typicalPath: "flexible",
    rationale:
      "Artistic (A) interests emphasize design and novel approaches—often reflected in flexible, interdisciplinary college STEM tracks.",
  },
  S: {
    typicalPath: "applied",
    rationale:
      "Social (S) interests emphasize helping and communicating; we map most S options to applied or structured depending on whether the first move is fieldwork vs teaching.",
  },
  E: {
    typicalPath: "flexible",
    rationale:
      "Enterprising (E) interests emphasize leading projects and coordinating people—mapped to flexible, goal-driven college paths.",
  },
  C: {
    typicalPath: "structured",
    rationale:
      "Conventional (C) interests emphasize organizing data and procedures—aligned with structured degree programs.",
  },
}

export const PATHWAY_VOTE_RULES: {
  field: keyof PathwayAnswers
  prompt: string
  when: PathwayAnswers[keyof PathwayAnswers]
  choiceLabel: string
  path: PathSignal
  rationale: string
}[] = [
  {
    field: "educationGoal",
    prompt: "What do you hope your next step will help you do?",
    when: "degree-required",
    choiceLabel: "Earn a degree for a career that requires it",
    path: "structured",
    rationale: "States a degree is required—votes toward 4-year degree exploration.",
  },
  {
    field: "educationGoal",
    prompt: "What do you hope your next step will help you do?",
    when: "practical-skills",
    choiceLabel: "Build practical skills for work as soon as possible",
    path: "applied",
    rationale: "Prioritizes practical skills—votes toward hands-on / shorter-program start with transfer.",
  },
  {
    field: "learningPreference",
    prompt: "Which learning setup sounds most sustainable for you right now?",
    when: "structured",
    choiceLabel: "Several years of structured classes and assignments",
    path: "structured",
    rationale: "Prefers structured classes—votes toward 4-year degree exploration.",
  },
  {
    field: "learningPreference",
    prompt: "Which learning setup sounds most sustainable for you right now?",
    when: "applied",
    choiceLabel: "Shorter courses with projects and practical training",
    path: "applied",
    rationale: "Prefers project-based / practical training—votes toward applied transfer path.",
  },
  {
    field: "commitment",
    prompt: "How do you feel about committing to a program that may take several years?",
    when: "several-years",
    choiceLabel: "I am comfortable with that if it supports my goal",
    path: "structured",
    rationale: "Comfortable with a multi-year program—votes toward 4-year exploration.",
  },
  {
    field: "commitment",
    prompt: "How do you feel about committing to a program that may take several years?",
    when: "shorter-first",
    choiceLabel: "I would prefer a shorter program first",
    path: "applied",
    rationale: "Prefers a shorter program first—votes toward 2-year / transfer pathway.",
  },
  {
    field: "commitment",
    prompt: "How do you feel about committing to a program that may take several years?",
    when: "work-first",
    choiceLabel: "I would rather work, train, or explore before committing",
    path: "applied",
    rationale: "Wants work or training before a long commitment—votes toward applied pathway.",
  },
]

export type PathVoteContribution =
  | {
      kind: "scenario"
      scenarioId: string
      situation: string
      optionLabel: string
      path: PathSignal
      riasec: Riasec
      onetTheme: string
    }
  | {
      kind: "pathway"
      field: keyof PathwayAnswers
      prompt: string
      choiceLabel: string
      path: PathSignal
    }

export type PathVoteTally = {
  breakdown: Record<PathSignal, number>
  contributions: PathVoteContribution[]
}

export function emptyPathBreakdown(): Record<PathSignal, number> {
  return { structured: 0, applied: 0, flexible: 0 }
}

export function tallyCollegePathVotes(
  answers: Record<string, string>,
  pathwayAnswers?: PathwayAnswers,
): PathVoteTally {
  const breakdown = emptyPathBreakdown()
  const contributions: PathVoteContribution[] = []

  for (const scenario of SCENARIOS) {
    const chosenId = answers[scenario.id]
    if (!chosenId) continue
    const option = scenario.options.find((o) => o.id === chosenId)
    if (!option) continue
    breakdown[option.path] += 1
    contributions.push({
      kind: "scenario",
      scenarioId: scenario.id,
      situation: scenario.situation,
      optionLabel: option.label,
      path: option.path,
      riasec: option.riasec,
      onetTheme: option.onetTheme,
    })
  }

  if (pathwayAnswers) {
    for (const rule of PATHWAY_VOTE_RULES) {
      if (pathwayAnswers[rule.field] !== rule.when) continue
      breakdown[rule.path] += 1
      contributions.push({
        kind: "pathway",
        field: rule.field,
        prompt: rule.prompt,
        choiceLabel: rule.choiceLabel,
        path: rule.path,
      })
    }
  }

  return { breakdown, contributions }
}

export function resolveCollegePathKey(
  breakdown: Record<PathSignal, number>,
): PathSignal | "mixed" {
  const ranked = (Object.keys(breakdown) as PathSignal[]).sort(
    (a, b) => breakdown[b] - breakdown[a],
  )
  const leader = ranked[0]
  return breakdown[leader] - breakdown[ranked[1]] >= PATH_VOTE_MARGIN ? leader : "mixed"
}
