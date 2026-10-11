"use client"

import { useEffect, useMemo, useState } from "react"
import { Compass } from "lucide-react"
import { LandingScreen } from "./landing-screen"
import { ProfileScreen } from "./profile-screen"
import { QuizScreen } from "./quiz-screen"
import { ReportScreen } from "./report-screen"
import { ResearchScreen } from "./research-screen"
import { generateReport, type Answers, type PathwayAnswers, type Report } from "@/lib/recommend"
import {
  loadProfile,
  loadSavedReports,
  saveProfile,
  saveReport,
  type Profile,
  type SavedReport,
} from "@/lib/storage"

type Stage = "landing" | "research" | "profile" | "quiz" | "report"

export function PathfinderApp() {
  const [stage, setStage] = useState<Stage>("landing")
  const [profile, setProfile] = useState<Profile | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [pathwayAnswers, setPathwayAnswers] = useState<PathwayAnswers | undefined>()
  const [report, setReport] = useState<Report | null>(null)
  const [savedReports, setSavedReports] = useState<SavedReport[]>([])
  const [savedCurrent, setSavedCurrent] = useState(false)

  // Hydrate persisted state after mount — localStorage is not available during SSR.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- client-only storage hydrate */
    setProfile(loadProfile())
    setSavedReports(loadSavedReports())
    /* eslint-enable react-hooks/set-state-in-effect */
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

  function handleQuizComplete(finalAnswers: Answers, finalPathwayAnswers: PathwayAnswers) {
    if (!profile) return
    setAnswers(finalAnswers)
    setPathwayAnswers(finalPathwayAnswers)
    const generated = generateReport(finalAnswers, finalPathwayAnswers)
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
      pathwayAnswers,
      report,
    }
    setSavedReports(saveReport(entry))
    setSavedCurrent(true)
  }

  function handleRetake() {
    setAnswers({})
    setPathwayAnswers(undefined)
    setReport(null)
    setSavedCurrent(false)
    setStage("quiz")
  }

  function viewSaved(id: string) {
    const found = savedReports.find((r) => r.id === id)
    if (!found) return
    setProfile(found.profile)
    setAnswers(found.answers)
    setPathwayAnswers(found.pathwayAnswers)
    setReport(generateReport(found.answers, found.pathwayAnswers))
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
            onResearch={() => setStage("research")}
            savedReports={savedReports}
            onViewSaved={viewSaved}
          />
        )}
        {stage === "research" && <ResearchScreen onBack={() => setStage("landing")} />}
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
            initialPathway={pathwayAnswers}
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
