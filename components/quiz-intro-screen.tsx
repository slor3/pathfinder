"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ClipboardList,
  GraduationCap,
  MapPin,
  RotateCcw,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  onContinue: () => void
  onBack: () => void
  onResearch: () => void
}

type IntroStep = {
  title: string
  sentence: string
  color: string
  onColor: string
  iconColor: string
  icon: typeof ClipboardList
}

const STEPS: IntroStep[] = [
  {
    title: "Quiz answers",
    sentence: "You answer short scenarios about how you would start.",
    color: "oklch(0.46 0.1 185)",
    onColor: "oklch(0.99 0.01 190)",
    iconColor: "light-dark(oklch(0.40 0.09 185), oklch(0.82 0.08 185))",
    icon: ClipboardList,
  },
  {
    title: "Strength areas",
    sentence: "Your answers add up into strength areas.",
    color: "oklch(0.84 0.12 78)",
    onColor: "oklch(0.28 0.05 55)",
    iconColor: "light-dark(oklch(0.48 0.11 65), oklch(0.88 0.12 82))",
    icon: Sparkles,
  },
  {
    title: "Matching STEM majors",
    sentence: "Those strengths are matched to STEM majors.",
    color: "oklch(0.45 0.12 235)",
    onColor: "oklch(0.99 0.005 235)",
    iconColor: "light-dark(oklch(0.42 0.12 240), oklch(0.82 0.08 235))",
    icon: GraduationCap,
  },
  {
    title: "Career ideas and Georgia colleges",
    sentence: "You see career ideas and Georgia colleges for those majors.",
    color: "oklch(0.44 0.11 150)",
    onColor: "oklch(0.99 0.01 150)",
    iconColor: "light-dark(oklch(0.40 0.11 150), oklch(0.84 0.1 150))",
    icon: MapPin,
  },
]

const STEP_STAGGER_MS = 750

export function QuizIntroScreen({ onContinue, onBack, onResearch }: Props) {
  const [run, setRun] = useState(0)
  const [skipped, setSkipped] = useState(false)

  function skip() {
    setSkipped(true)
  }

  function replay() {
    setSkipped(false)
    setRun((value) => value + 1)
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8 md:py-14" aria-labelledby="quiz-intro-heading">
      <p className="text-sm font-medium text-primary">Before question 1</p>
      <h1
        id="quiz-intro-heading"
        className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight md:text-4xl"
      >
        How PathFinder works
      </h1>
      <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
        Four short steps, then the quiz. You can skip the motion or play it again.
      </p>

      <div key={run} className="quiz-intro mt-8" data-motion={skipped ? "off" : "on"}>
        <ol className="m-0 list-none p-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            const delay = index * STEP_STAGGER_MS
            return (
              <li key={step.title} className="relative pb-4 last:pb-0">
                {index < STEPS.length - 1 ? (
                  <span
                    aria-hidden
                    className="quiz-intro-line-y absolute top-10 bottom-0 w-0.5 rounded-full"
                    style={{
                      animationDelay: `${delay + 420}ms`,
                      backgroundColor: step.color,
                      left: "calc(1.25rem - 1px)",
                    }}
                  />
                ) : null}
                <div className="flex items-start gap-3">
                  <span
                    className="quiz-intro-step relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-0 text-sm font-semibold"
                    style={{
                      animationDelay: `${delay}ms`,
                      backgroundColor: step.color,
                      color: step.onColor,
                    }}
                  >
                    {index + 1}
                  </span>
                  <div
                    className="quiz-intro-step min-w-0 flex-1 rounded-2xl border p-4"
                    style={{
                      animationDelay: `${delay + 90}ms`,
                      borderColor: `color-mix(in oklch, ${step.color} 48%, var(--border))`,
                      backgroundColor: `color-mix(in oklch, ${step.color} 16%, var(--card))`,
                    }}
                  >
                    <h2 className="flex items-center gap-2 font-display text-lg font-semibold leading-tight">
                      <Icon className="size-5 shrink-0" style={{ color: step.iconColor }} aria-hidden />
                      {step.title}
                    </h2>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-foreground">{step.sentence}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Button variant="outline" onClick={skip} disabled={skipped} aria-label="Skip the animation">
          Skip
        </Button>
        <Button variant="ghost" className="gap-2" onClick={replay} aria-label="Replay the animation">
          <RotateCcw className="size-4" aria-hidden />
          Replay
        </Button>
        <Button variant="link" className="gap-2 px-2" onClick={onResearch}>
          <BookOpen className="size-4" aria-hidden />
          Research sources
        </Button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Button variant="ghost" className="gap-2" onClick={onBack}>
          <ArrowLeft className="size-4" aria-hidden />
          Back
        </Button>
        <Button className="gap-2" onClick={onContinue}>
          Start question 1
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </section>
  )
}
