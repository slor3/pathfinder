"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { getRandomizedQuizQuestions, QUIZ_SIZE } from "@/lib/pathfinder-data"
import type { Answers, PathwayAnswers } from "@/lib/recommend"

type Props = {
  initial: Answers
  initialPathway?: PathwayAnswers
  onComplete: (answers: Answers, pathwayAnswers: PathwayAnswers) => void
  onExit: () => void
}

export function QuizScreen({ initial, initialPathway, onComplete, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>(initial)
  const [pathwayIndex, setPathwayIndex] = useState(0)
  const [pathwayAnswers, setPathwayAnswers] = useState<Partial<PathwayAnswers>>(
    initialPathway ?? {},
  )

  const questions = useMemo(() => getRandomizedQuizQuestions(), [])
  const scenario = questions[index]
  const pathwayQuestions = [
    {
      key: "educationGoal" as const,
      prompt: "What do you hope your next step will help you do?",
      options: [
        ["degree-required", "Earn a degree for a career that requires it"],
        ["practical-skills", "Build practical skills for work as soon as possible"],
        ["explore", "Explore subjects before choosing a direction"],
        ["unsure", "I am not sure yet"],
      ],
    },
    {
      key: "learningPreference" as const,
      prompt: "Which learning setup sounds most sustainable for you right now?",
      options: [
        ["structured", "Several years of structured classes and assignments"],
        ["applied", "Shorter courses with projects and practical training"],
        ["mixed", "A mix of classes, hands-on work, and real experience"],
        ["unsure", "I am still figuring that out"],
      ],
    },
    {
      key: "commitment" as const,
      prompt: "How do you feel about committing to a program that may take several years?",
      options: [
        ["several-years", "I am comfortable with that if it supports my goal"],
        ["shorter-first", "I would prefer a shorter program first"],
        ["work-first", "I would rather work, train, or explore before committing"],
        ["unsure", "I am unsure"],
      ],
    },
  ]
  const total = QUIZ_SIZE + pathwayQuestions.length
  const isPathway = index >= QUIZ_SIZE
  const pathwayQuestion = pathwayQuestions[pathwayIndex]
  const selected = isPathway ? pathwayAnswers[pathwayQuestion.key] : answers[scenario.id]
  const isLast = isPathway && pathwayIndex === pathwayQuestions.length - 1
  const options = isPathway
    ? pathwayQuestion.options.map(([id, label]) => ({ id, label }))
    : scenario.options

  function choose(optionId: string) {
    if (isPathway) {
      setPathwayAnswers((prev) => ({ ...prev, [pathwayQuestion.key]: optionId as never }))
    } else {
      setAnswers((prev) => ({ ...prev, [scenario.id]: optionId }))
    }
  }

  function next() {
    if (!selected) return
    if (isLast) {
      onComplete(answers, pathwayAnswers as PathwayAnswers)
    } else if (!isPathway && index === QUIZ_SIZE - 1) {
      setIndex(QUIZ_SIZE)
      setPathwayIndex(0)
    } else if (isPathway) {
      setPathwayIndex((i) => i + 1)
    } else {
      setIndex((i) => i + 1)
    }
  }

  function back() {
    if (isPathway && pathwayIndex === 0) {
      setIndex(QUIZ_SIZE - 1)
    } else if (isPathway) {
      setPathwayIndex((i) => i - 1)
    } else if (index === 0) {
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
            Question {isPathway ? QUIZ_SIZE + pathwayIndex + 1 : index + 1} of {total}
          </span>
          <span>
            {Math.round(
              ((isPathway ? QUIZ_SIZE + pathwayIndex : index) + (selected ? 1 : 0)) / total * 100,
            )}% complete
          </span>
        </div>
        <Progress
          value={(((isPathway ? QUIZ_SIZE + pathwayIndex : index) + (selected ? 1 : 0)) / total) * 100}
          className="h-2"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        {isPathway ? (
          <>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">
              Your education path
            </p>
            <p className="mt-4 font-display text-lg font-semibold">{pathwayQuestion.prompt}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              There is no right answer. This helps personalize your pathway recommendation and
              does not change your six trait scores.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Scenario</p>
            <p className="mt-2 text-pretty text-lg leading-relaxed text-foreground md:text-xl">
              {scenario.situation}
            </p>
            <p className="mt-4 font-display text-lg font-semibold">{scenario.prompt}</p>
          </>
        )}

        <div
          className="mt-5 grid gap-3"
          role="radiogroup"
          aria-label={isPathway ? pathwayQuestion.prompt : scenario.prompt}
        >
          {options.map((opt) => {
            const { id, label } = opt
            const active = selected === id
            return (
              <button
                key={id}
                role="radio"
                aria-checked={active}
                onClick={() => choose(id)}
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
                {label}
              </button>
            )
          })}
        </div>

        {!isPathway ? (
          <p className="mt-4 text-sm text-muted-foreground">
            There is no right answer — choose the first move that feels most like you.
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" className="gap-2" onClick={back}>
          <ArrowLeft className="size-4" aria-hidden />
          {index === 0 && !isPathway ? "Exit" : "Back"}
        </Button>
        <Button className="gap-2" disabled={!selected} onClick={next}>
          {isLast ? "See my report" : "Next"}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
