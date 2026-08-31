"use client"

import { useEffect, useMemo, useState } from "react"
import { Compass } from "lucide-react"
import { LandingScreen } from "./landing-screen"
import { ProfileScreen } from "./profile-screen"
import { QuizScreen } from "./quiz-screen"
import { ReportScreen } from "./report-screen"
import { generateReport, type Answers, type Report } from "@/lib/recommend"
import {
  loadProfile,
  loadSavedReports,
  saveProfile,
  saveReport,
  type Profile,
  type SavedReport,
} from "@/lib/storage"

type Stage = "landing" | "profile" | "quiz" | "report"

export function PathfinderApp() {
  const [stage, setStage] = useState<Stage>("landing")
  const [profile, setProfile] = useState<Profile | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [report, setReport] = useState<Report | null>(null)
  const [savedReports, setSavedReports] = useState<SavedReport[]>([])
  const [savedCurrent, setSavedCurrent] = useState(false)

  // Hydrate persisted state on mount.
  useEffect(() => {
    setProfile(loadProfile())
    setSavedReports(loadSavedReports())
  }, [])

  const activeProfile = useMemo(() => profile, [profile])

  function startFlow() {
    setStage("profile")
  }

  function handleProfile(p: Profile) {
    setProfile(p)
    saveProfile(p)
    setStage("quiz")
  }

  function handleQuizComplete(finalAnswers: Answers) {
    if (!profile) return
    setAnswers(finalAnswers)
    const generated = generateReport(finalAnswers, profile.region)
    setReport(generated)
    setSavedCurrent(false)
    setStage("report")
  }

  function handleSave() {
    if (!report || !profile) return
    const entry: SavedReport = {
      id: `${Date.now()}`,
      createdAt: Date.now(),
      profile,
      answers,
      report,
    }
    setSavedReports(saveReport(entry))
    setSavedCurrent(true)
  }

  function handleRetake() {
    setAnswers({})
    setReport(null)
    setSavedCurrent(false)
    setStage("quiz")
  }

  function viewSaved(id: string) {
    const found = savedReports.find((r) => r.id === id)
    if (!found) return
    setProfile(found.profile)
    setAnswers(found.answers)
    setReport(found.report)
    setSavedCurrent(true)
    setStage("report")
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button
            onClick={() => setStage("landing")}
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="size-5" aria-hidden />
            </span>
            PathFinder
          </button>
          {savedReports.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {savedReports.length} saved report{savedReports.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </header>

      <main>
        {stage === "landing" && (
          <LandingScreen
            onStart={startFlow}
            savedReports={savedReports}
            onViewSaved={viewSaved}
          />
        )}
        {stage === "profile" && (
          <ProfileScreen
            initial={activeProfile}
            onContinue={handleProfile}
            onBack={() => setStage("landing")}
          />
        )}
        {stage === "quiz" && (
          <QuizScreen
            initial={answers}
            onComplete={handleQuizComplete}
            onExit={() => setStage("landing")}
          />
        )}
        {stage === "report" && report && profile && (
          <ReportScreen
            report={report}
            profile={profile}
            onRetake={handleRetake}
            onSave={handleSave}
            saved={savedCurrent}
            onHome={() => setStage("landing")}
          />
        )}
      </main>
    </div>
  )
}
