import type { College } from "./pathfinder-data"

/** STEM major areas used in the compare table. Several are grouped into the same
 * 2-digit CIP family in the Scorecard data, but we still show distinct major areas
 * to match the app's eight-area STEM model.
 */
export const STEM_CIP_FAMILIES = [
  { code: "11", label: "Computer Science" },
  { code: "14", label: "Engineering" },
  { code: "26", label: "Biology" },
  { code: "27", label: "Mathematics" },
  { code: "27", label: "Statistics / Data Science" },
  { code: "40", label: "Chemistry" },
  { code: "40", label: "Physics" },
  { code: "40", label: "Environmental Science" },
] as const

export type StemCipFamilyCode = (typeof STEM_CIP_FAMILIES)[number]["code"]

/** CIP 2-digit families aligned with each major for college STEM overlap scoring. */
export const MAJOR_CIP_FAMILIES: Record<string, string[]> = {
  biology: ["26"],
  chemistry: ["40"],
  physics: ["40"],
  "environmental-science": ["40"],
  mathematics: ["27"],
  "statistics-data-science": ["27"],
  "computer-science": ["11"],
  engineering: ["14"],
}

export function getCollegeCipFamilies(college: College): Set<string> {
  return new Set(college.stemCipCodes.map((code) => code.slice(0, 2)))
}

export function collegeHasCipFamily(college: College, familyCode: string): boolean {
  return college.stemCipCodes.some((code) => code.slice(0, 2) === familyCode)
}

export function countStemFamilyOverlap(
  college: College,
  majorIds: string[],
): number {
  const families = new Set(
    majorIds.flatMap((id) => MAJOR_CIP_FAMILIES[id] ?? []),
  )
  if (families.size === 0) return 0

  const collegeFamilies = getCollegeCipFamilies(college)
  let overlap = 0
  for (const family of families) {
    if (collegeFamilies.has(family)) overlap += 1
  }
  return overlap
}

export type MajorStemOverlap = {
  matchedMajors: { id: string; name: string }[]
  matchCount: number
  totalTopMajors: number
  otherStemCount: number
}

export function getMajorStemOverlap(
  college: College,
  topMajors: { major: { id: string; name: string } }[],
  limit = 3,
): MajorStemOverlap {
  const majors = topMajors.slice(0, limit)
  const collegeFamilies = getCollegeCipFamilies(college)

  const matchedMajors = majors
    .filter((match) => {
      const families = MAJOR_CIP_FAMILIES[match.major.id] ?? []
      return families.some((family) => collegeFamilies.has(family))
    })
    .map((match) => ({ id: match.major.id, name: match.major.name }))

  const matchedFamilySet = new Set(
    matchedMajors.flatMap((major) => MAJOR_CIP_FAMILIES[major.id] ?? []),
  )
  const otherStemCount = college.stemPrograms.filter(
    (program) => !matchedFamilySet.has(program.code.slice(0, 2)),
  ).length

  return {
    matchedMajors,
    matchCount: matchedMajors.length,
    totalTopMajors: majors.length,
    otherStemCount,
  }
}

export function formatStemProgramTitle(title: string): string {
  return title.replace(/\.$/, "")
}
