"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Briefcase,
  Check,
  GraduationCap,
  MapPin,
  RotateCcw,
  School,
  Sparkles,
  Star,
} from "lucide-react"
import { TRAIT_LABELS, CLUSTER_LABELS, type CollegeType } from "@/lib/pathfinder-data"
import type { Report } from "@/lib/recommend"
import type { Profile } from "@/lib/storage"

type Props = {
  report: Report
  profile: Profile
  onRetake: () => void
  onSave: () => void
  saved: boolean
  onHome: () => void
}

const TYPE_ICON: Record<CollegeType, typeof School> = {
  University: GraduationCap,
  "Community College": School,
  "Trade School": Briefcase,
}

export function ReportScreen({ report, profile, onRetake, onSave, saved, onHome }: Props) {
  const [compare, setCompare] = useState<string[]>([])

  function toggleCompare(id: string) {
    setCompare((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 3 ? [...prev, id] : prev,
    )
  }

  const compareColleges = report.colleges
    .filter((c) => compare.includes(c.college.id))
    .map((c) => c.college)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden />
            Your PathFinder report
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {profile.name ? `${profile.name}, here's your direction` : "Here's your direction"}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={onSave} disabled={saved}>
            {saved ? <Check className="size-4" /> : <Bookmark className="size-4" />}
            {saved ? "Saved" : "Save report"}
          </Button>
          <Button variant="ghost" className="gap-2" onClick={onRetake}>
            <RotateCcw className="size-4" aria-hidden />
            Retake
          </Button>
        </div>
      </div>

      {/* College fit */}
      <Card className="mt-8 border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="size-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">Does college fit your goals?</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{report.path.title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{report.path.summary}</p>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
        {/* Strengths */}
        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Star className="size-5 text-accent-foreground" aria-hidden />
            Your strengths
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Based on how you make decisions.</p>
          <div className="mt-5 space-y-4">
            {(Object.keys(report.traitScores) as (keyof typeof report.traitScores)[])
              .sort((a, b) => report.traitScores[b] - report.traitScores[a])
              .map((trait) => {
                const isTop = report.topTraits.includes(trait)
                return (
                  <div key={trait}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className={isTop ? "font-medium text-foreground" : "text-muted-foreground"}>
                        {TRAIT_LABELS[trait]}
                      </span>
                      <span className="tabular-nums text-muted-foreground">
                        {report.traitScores[trait]}
                      </span>
                    </div>
                    <Progress value={report.traitScores[trait]} className="h-2" />
                  </div>
                )
              })}
          </div>
        </Card>

        {/* Majors */}
        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <BookOpen className="size-5 text-primary" aria-hidden />
            Recommended majors
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Fields that match your strengths and style.
          </p>
          <ul className="mt-4 space-y-3">
            {report.majors.map((m, i) => (
              <li
                key={m.major.id}
                className={`rounded-xl border p-4 ${
                  i === 0 ? "border-primary/40 bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{m.major.name}</p>
                  {i === 0 && <Badge className="shrink-0">Top match</Badge>}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.major.blurb}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="font-normal">
                    {CLUSTER_LABELS[m.major.cluster]}
                  </Badge>
                  {m.major.careers.slice(0, 2).map((c) => (
                    <Badge key={c} variant="outline" className="font-normal text-muted-foreground">
                      {c}
                    </Badge>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Colleges */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            <MapPin className="size-5 text-primary" aria-hidden />
            Colleges in the {profile.region}
          </h2>
          <span className="text-sm text-muted-foreground">Select up to 3 to compare</span>
        </div>

        {report.colleges.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            No matching schools found in your region yet — try broadening your search.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {report.colleges.map(({ college }) => {
              const Icon = TYPE_ICON[college.type]
              const inCompare = compare.includes(college.id)
              return (
                <div
                  key={college.id}
                  className={`rounded-xl border p-4 transition-colors ${
                    inCompare ? "border-primary bg-primary/5" : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                        <Icon className="size-4" aria-hidden />
                      </div>
                      <div>
                        <p className="font-medium leading-tight">{college.name}</p>
                        <p className="text-sm text-muted-foreground">{college.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="size-3.5 fill-accent text-accent" aria-hidden />
                      {college.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className="font-normal">
                      {college.type}
                    </Badge>
                    <Badge variant="outline" className="font-normal text-muted-foreground">
                      {college.costTier}
                    </Badge>
                  </div>
                  <button
                    onClick={() => toggleCompare(college.id)}
                    className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-medium transition-colors ${
                      inCompare
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:bg-secondary"
                    } ${!inCompare && compare.length >= 3 ? "cursor-not-allowed opacity-50" : ""}`}
                    disabled={!inCompare && compare.length >= 3}
                  >
                    {inCompare ? <Check className="size-4" /> : null}
                    {inCompare ? "Added to compare" : "Compare"}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Compare table */}
        {compareColleges.length >= 2 && (
          <Card className="mt-6 overflow-x-auto p-0">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 font-medium text-muted-foreground">Compare</th>
                  {compareColleges.map((c) => (
                    <th key={c.id} className="p-4 font-display font-semibold">
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/60">
                  <td className="p-4 text-muted-foreground">Location</td>
                  {compareColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.city}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/60">
                  <td className="p-4 text-muted-foreground">Type</td>
                  {compareColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.type}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/60">
                  <td className="p-4 text-muted-foreground">Cost</td>
                  {compareColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.costTier}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/60">
                  <td className="p-4 text-muted-foreground">Rating</td>
                  {compareColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.rating.toFixed(1)} / 5
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 text-muted-foreground">Programs</td>
                  {compareColleges.map((c) => (
                    <td key={c.id} className="p-4">
                      {c.clusters.map((cl) => CLUSTER_LABELS[cl]).join(", ")}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Card>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-8 text-center">
        <p className="text-muted-foreground">
          Your path can change — retake the quiz anytime as your goals evolve.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={onHome}>
            Back home
          </Button>
          <Button className="gap-2" onClick={onRetake}>
            Retake the quiz
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
