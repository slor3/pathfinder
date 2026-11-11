"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  email: string
  title: string
  onBack: () => void
  onStartQuiz: () => void
  onSignOut: () => void
  signingOut: boolean
}

export function AccountSignedIn({
  email,
  title,
  onBack,
  onStartQuiz,
  onSignOut,
  signingOut,
}: Props) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <p className="mb-2 text-sm font-medium text-primary">Account</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-muted-foreground">
        Signed in as {email}. You can take the quiz now. An account is not required.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={onBack} disabled={signingOut}>
          Back
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={onSignOut} disabled={signingOut}>
            {signingOut ? "Signing out…" : "Sign out"}
          </Button>
          <Button className="gap-2" onClick={onStartQuiz} disabled={signingOut}>
            Start the quiz
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
