import type { Answers, PathwayAnswers, Report } from "./recommend"
import type { Region } from "./pathfinder-data"

export type Profile = {
  name: string
  stage: "hs-senior" | "freshman" | "returning"
  region: Region
}

export type SavedReport = {
  id: string
  createdAt: number
  profile: Profile
  answers: Answers
  pathwayAnswers?: PathwayAnswers
  report: Report
}

const KEY = "pathfinder:saved-reports"
const PROFILE_KEY = "pathfinder:profile"

export function loadSavedReports(): SavedReport[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SavedReport[]) : []
  } catch {
    return []
  }
}

export function saveReport(entry: SavedReport): SavedReport[] {
  const existing = loadSavedReports()
  const next = [entry, ...existing].slice(0, 10)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // ignore quota / private mode errors
  }
  return next
}

export function deleteReport(id: string): SavedReport[] {
  const next = loadSavedReports().filter((r) => r.id !== id)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
  return next
}

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY)
    return raw ? (JSON.parse(raw) as Profile) : null
  } catch {
    return null
  }
}

export function saveProfile(profile: Profile) {
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  } catch {
    // ignore
  }
}
