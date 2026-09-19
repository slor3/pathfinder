"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Compass, GraduationCap, MapPin, Sparkles, Target } from "lucide-react"
import type { SavedReport } from "@/lib/storage"

type Props = {
  onStart: () => void
  savedReports: SavedReport[]
  onViewSaved: (id: string) => void
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

export function LandingScreen({ onStart, savedReports, onViewSaved }: Props) {
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
            <span className="text-sm text-muted-foreground">
              Takes about 3 minutes · 8 questions · No account required
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

      {savedReports.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-4 font-display text-xl font-semibold">Your saved reports</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {savedReports.map((r) => (
              <button
                key={r.id}
                onClick={() => onViewSaved(r.id)}
                className="group rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-secondary/50"
              >
                <p className="font-medium">{r.profile.name || "Anonymous"}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Top match: {r.report.majors[0]?.major.name}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
