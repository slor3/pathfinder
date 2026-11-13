"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  MapPin,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react"
import type { SavedReport } from "@/lib/storage"

type Props = {
  onStart: () => void
  onResearch: () => void
  savedReports: SavedReport[]
  savedReportsLoading: boolean
  savedReportsError: string | null
  signedIn: boolean
  onViewSaved: (id: string) => void
  onDeleteSaved: (id: string) => Promise<boolean>
}

function formatSavedDate(createdAt: number): string {
  return new Date(createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const STEPS = [
  {
    icon: Sparkles,
    title: "Answer real scenarios",
    body: "No boring surveys. Respond to true-to-life situations and let your instincts do the talking.",
  },
  {
    icon: Target,
    title: "Match to majors",
    body: "We map your decision style and strengths to the academic fields where you'll thrive.",
  },
  {
    icon: MapPin,
    title: "Find your colleges",
    body: "Get nearby schools that actually offer your recommended paths — and compare them.",
  },
]

export function LandingScreen({
  onStart,
  onResearch,
  savedReports,
  savedReportsLoading,
  savedReportsError,
  signedIn,
  onViewSaved,
  onDeleteSaved,
}: Props) {
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function confirmDelete(id: string) {
    setDeletingId(id)
    try {
      const deleted = await onDeleteSaved(id)
      if (deleted) setPendingDeleteId((current) => (current === id ? null : current))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            <Compass className="size-4 text-primary" aria-hidden />
            Decision support for undecided students
          </div>
          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Not sure about college or your major?{" "}
            <span className="text-primary">Let&apos;s find your path.</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            PathFinder turns a few real-life scenarios into a personalized report — showing whether
            college fits your goals, which majors match your strengths, and where to study.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="gap-2" onClick={onStart}>
              Start the quiz
              <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={onResearch}>
              Read the research
              <BookOpen className="size-4" aria-hidden />
            </Button>
            <span className="text-sm text-muted-foreground">
              Takes about 3 minutes · 11 questions · No account required
            </span>
          </div>
        </div>

        <Card className="border-border/80 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap className="size-5" aria-hidden />
            </div>
            <div>
              <p className="font-display text-lg font-semibold leading-tight">Your report preview</p>
              <p className="text-sm text-muted-foreground">Here&apos;s what you&apos;ll get</p>
            </div>
          </div>
          <ul className="mt-4 space-y-4">
            {STEPS.map((s) => (
              <li key={s.title} className="flex gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
                  <s.icon className="size-4" aria-hidden />
                </div>
                <div>
                  <p className="font-medium leading-tight">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {(signedIn || savedReports.length > 0 || savedReportsLoading || savedReportsError) && (
        <div className="mt-14">
          <h2 className="mb-4 font-display text-xl font-semibold">Your saved reports</h2>
          {savedReportsLoading && (
            <p className="text-sm text-muted-foreground">Loading saved reports…</p>
          )}
          {savedReportsError && (
            <p className="mb-3 text-sm text-destructive" role="alert">
              {savedReportsError}
            </p>
          )}
          {!savedReportsLoading && signedIn && savedReports.length === 0 && !savedReportsError && (
            <p className="text-sm text-muted-foreground">You haven’t saved any reports yet.</p>
          )}
          {savedReports.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {savedReports.map((r) => {
              const name = r.profile.name || "Anonymous"
              const savedOn = formatSavedDate(r.createdAt)
              const pendingDelete = pendingDeleteId === r.id
              const confirmId = `delete-saved-report-${r.id}`

              return (
                <article
                  key={r.id}
                  className="rounded-xl border border-border bg-card transition-colors hover:border-primary/50 hover:bg-secondary/50"
                  onKeyDown={(event) => {
                    if (event.key === "Escape" && pendingDelete) setPendingDeleteId(null)
                  }}
                >
                  <div className="flex items-start gap-1 p-4">
                    <button
                      type="button"
                      onClick={() => onViewSaved(r.id)}
                      className="min-w-0 flex-1 rounded-lg text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      <p className="font-medium">{name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Top match: {r.report.majors[0]?.major.name}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">{savedOn}</p>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      aria-label={`Delete saved report for ${name}, ${savedOn}`}
                      aria-expanded={pendingDelete}
                      aria-controls={pendingDelete ? confirmId : undefined}
                      onClick={() =>
                        setPendingDeleteId((current) => (current === r.id ? null : r.id))
                      }
                    >
                      <Trash2 aria-hidden />
                    </Button>
                  </div>
                  {pendingDelete && (
                    <div
                      id={confirmId}
                      role="group"
                      aria-label={`Confirm deleting the saved report for ${name}`}
                      className="border-t border-border px-4 py-3"
                    >
                      <p className="text-sm">
                        Delete this saved report from your account?
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={deletingId === r.id}
                          onClick={() => setPendingDeleteId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={deletingId === r.id}
                          onClick={() => void confirmDelete(r.id)}
                        >
                          {deletingId === r.id ? "Deleting…" : "Delete"}
                        </Button>
                      </div>
                    </div>
                  )}
                </article>
              )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
