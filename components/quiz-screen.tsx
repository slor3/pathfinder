"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { SCENARIOS } from "@/lib/pathfinder-data"
import type { Answers } from "@/lib/recommend"

type Props = {
  initial: Answers
  onComplete: (answers: Answers) => void
  onExit: () => void
}

export function QuizScreen({ initial, onComplete, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>(initial)

  const scenario = SCENARIOS[index]
  const total = SCENARIOS.length
  const selected = answers[scenario.id]
  const isLast = index === total - 1

  function choose(optionId: string) {
    setAnswers((prev) => ({ ...prev, [scenario.id]: optionId }))
  }

  function next() {
    if (!selected) return
    if (isLast) {
      onComplete(answers)
    } else {
      setIndex((i) => i + 1)
    }
  }

  function back() {
    if (index === 0) {
      onExit()
    } else {
      setIndex((i) => i - 1)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-14">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>{Math.round(((index + (selected ? 1 : 0)) / total) * 100)}% complete</span>
        </div>
        <Progress value={((index + (selected ? 1 : 0)) / total) * 100} className="h-2" />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <p className="text-sm font-medium uppercase tracking-wide text-primary">Scenario</p>
        <p className="mt-2 text-pretty text-lg leading-relaxed text-foreground md:text-xl">
          {scenario.situation}
        </p>
        <p className="mt-4 font-display text-lg font-semibold">{scenario.prompt}</p>

        <div className="mt-5 grid gap-3" role="radiogroup" aria-label={scenario.prompt}>
          {scenario.options.map((opt) => {
            const active = selected === opt.id
            return (
              <button
                key={opt.id}
                role="radio"
                aria-checked={active}
                onClick={() => choose(opt.id)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left text-[15px] leading-relaxed transition-all ${
                  active
                    ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                    : "border-border bg-background hover:border-primary/40 hover:bg-secondary/40"
                }`}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border text-xs ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/40 text-transparent"
                  }`}
                  aria-hidden
                >
                  <Check className="size-3.5" />
                </span>
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" className="gap-2" onClick={back}>
          <ArrowLeft className="size-4" aria-hidden />
          {index === 0 ? "Exit" : "Back"}
        </Button>
        <Button className="gap-2" disabled={!selected} onClick={next}>
          {isLast ? "See my report" : "Next"}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
