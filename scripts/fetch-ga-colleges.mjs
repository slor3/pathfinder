#!/usr/bin/env node
/**
 * PAT-17: Fetch GA public 4-year colleges from College Scorecard API.
 * Usage: COLLEGE_SCORECARD_API_KEY=... node scripts/fetch-ga-colleges.mjs
 */

import { writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const API_BASE = "https://api.data.gov/ed/collegescorecard/v1/schools"

/** STEM CIP 2-digit families per PAT-26 / sprint recommendations */
const STEM_CIP_FAMILIES = ["11", "14", "26", "27", "40", "41"]

/** Non-USG institutions to exclude when filtering 4-year public bachelor's */
const EXCLUDED_SCHOOLS = new Set(["Georgia Military College"])

const apiKey = process.env.COLLEGE_SCORECARD_API_KEY
if (!apiKey) {
  console.error("Set COLLEGE_SCORECARD_API_KEY (see .env.example)")
  process.exit(1)
}

function isStemCip(code) {
  const family = String(code).slice(0, 2)
  return STEM_CIP_FAMILIES.includes(family)
}

function isFourYearPublic(school) {
  const highest = school["school.degrees_awarded.highest"]
  const name = school["school.name"] ?? ""
  return (highest ?? 0) >= 3 && !EXCLUDED_SCHOOLS.has(name)
}

async function fetchGaSchools() {
  const params = new URLSearchParams({
    "school.state": "GA",
    "school.ownership": "1",
    per_page: "100",
    fields: [
      "id",
      "school.name",
      "school.city",
      "school.degrees_awarded.highest",
      "latest.cost.tuition.in_state",
      "latest.completion.rate_suppressed.overall",
      "latest.student.size",
      "latest.programs.cip_4_digit.code",
      "latest.programs.cip_4_digit.title",
    ].join(","),
    all_programs_nested: "true",
    api_key: apiKey,
  })

  const url = `${API_BASE}?${params}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`College Scorecard API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  if (data.errors) {
    throw new Error(`API errors: ${JSON.stringify(data.errors)}`)
  }

  return data.results ?? []
}

function normalizeSchool(raw) {
  const programs = raw["latest.programs.cip_4_digit"] ?? []
  const stemPrograms = []
  const seen = new Set()

  for (const program of programs) {
    const code = String(program.code ?? "")
    if (!code || !isStemCip(code) || seen.has(code)) continue
    seen.add(code)
    stemPrograms.push({
      code,
      title: program.title ?? "",
    })
  }

  stemPrograms.sort((a, b) => a.code.localeCompare(b.code))

  return {
    id: String(raw.id),
    name: raw["school.name"],
    city: raw["school.city"],
    inStateTuition: raw["latest.cost.tuition.in_state"] ?? null,
    completionRate: raw["latest.completion.rate_suppressed.overall"] ?? null,
    studentSize: raw["latest.student.size"] ?? null,
    stemCipCodes: stemPrograms.map((p) => p.code),
    stemPrograms,
  }
}

async function main() {
  console.log("Fetching GA public colleges from College Scorecard...")
  const rawSchools = await fetchGaSchools()
  const fourYear = rawSchools.filter(isFourYearPublic)
  const schools = fourYear.map(normalizeSchool).sort((a, b) => a.name.localeCompare(b.name))

  const ggc = schools.find((s) => s.name.includes("Georgia Gwinnett"))
  if (!ggc) {
    console.warn("WARNING: Georgia Gwinnett College not found in results")
  } else {
    console.log(`GGC included: ${ggc.name} (${ggc.stemCipCodes.length} STEM CIP codes)`)
  }

  console.log(`Fetched ${schools.length} GA public 4-year institutions (target ~25 USG)`)

  const output = {
    fetchedAt: new Date().toISOString().slice(0, 10),
    source: "https://collegescorecard.ed.gov/data/api/",
    filters: {
      state: "GA",
      ownership: "public (1)",
      fourYear: "school.degrees_awarded.highest >= 3 (bachelor's or higher)",
      stemCipFamilies: STEM_CIP_FAMILIES,
    },
    count: schools.length,
    schools,
  }

  const outPath = join(__dirname, "..", "lib", "ga-colleges.json")
  writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`)
  console.log(`Wrote ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
