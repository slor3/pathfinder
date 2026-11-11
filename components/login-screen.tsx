"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AccountSignedIn } from "./account-signed-in"
import { useAccountEmail } from "./use-firebase-user"
import {
  isFirebaseConfigured,
  signInErrorMessage,
  signInWithEmail,
  validateLoginInput,
  type LoginFieldErrors,
} from "@/lib/firebase"

type Props = {
  signedInEmail: string | null
  onBack: () => void
  onStartQuiz: () => void
  onCreateAccount: () => void
  onSignOut: () => void
  signingOut: boolean
}

export function LoginScreen({
  signedInEmail,
  onBack,
  onStartQuiz,
  onCreateAccount,
  onSignOut,
  signingOut,
}: Props) {
  const configured = isFirebaseConfigured()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { email: activeEmail, rememberEmail } = useAccountEmail(signedInEmail)

  if (activeEmail) {
    return (
      <AccountSignedIn
        email={activeEmail}
        title="You\u2019re signed in"
        onBack={onBack}
        onStartQuiz={onStartQuiz}
        onSignOut={onSignOut}
        signingOut={signingOut}
      />
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateLoginInput({ email, password })
    setFieldErrors(nextErrors)
    setFormError(null)
    if (Object.keys(nextErrors).length > 0) return
    if (!configured) {
      setFormError(
        "Log in is not set up yet. Add the Firebase keys from .env.example to .env.local, then restart the app.",
      )
      return
    }

    setSubmitting(true)
    try {
      const credential = await signInWithEmail(email, password)
      rememberEmail(credential.user.email ?? email.trim())
    } catch (error) {
      setFormError(signInErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <p className="mb-2 text-sm font-medium text-primary">Account</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Log in</h1>
      <p className="mt-2 text-muted-foreground">
        Use the email and password from your account. The quiz still works if you skip this.
      </p>

      <form className="mt-6" onSubmit={handleSubmit} noValidate>
        <Card className="space-y-5 p-6">
          {!configured && (
            <p className="text-sm text-muted-foreground" role="status">
              Log in needs Firebase keys in .env.local. You can still take the quiz.
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@school.edu"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              disabled={submitting}
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="login-email-error" className="text-sm text-destructive">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={submitting}
              aria-invalid={fieldErrors.password ? true : undefined}
              aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
            />
            {fieldErrors.password && (
              <p id="login-password-error" className="text-sm text-destructive">
                {fieldErrors.password}
              </p>
            )}
          </div>
        </Card>

        {formError && (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {formError}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <Button type="button" variant="ghost" onClick={onBack} disabled={submitting}>
            Back
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </Button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Need an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline-offset-4 hover:underline disabled:opacity-50"
            onClick={onCreateAccount}
            disabled={submitting}
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  )
}
