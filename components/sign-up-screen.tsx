"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  createEmailAccount,
  isFirebaseConfigured,
  signUpErrorMessage,
  validateSignUpInput,
  type SignUpFieldErrors,
} from "@/lib/firebase"

type Props = {
  signedInEmail: string | null
  onBack: () => void
  onStartQuiz: () => void
}

export function SignUpScreen({ signedInEmail, onBack, onStartQuiz }: Props) {
  const configured = isFirebaseConfigured()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [createdEmail, setCreatedEmail] = useState<string | null>(null)

  const activeEmail = createdEmail ?? signedInEmail

  if (activeEmail) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
        <p className="mb-2 text-sm font-medium text-primary">Account</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {createdEmail ? "Account created" : "You\u2019re signed in"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Signed in as {activeEmail}. You can take the quiz now. An account is not required.
        </p>
        <div className="mt-6 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button className="gap-2" onClick={onStartQuiz}>
            Start the quiz
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateSignUpInput({ email, password, confirmPassword })
    setFieldErrors(nextErrors)
    setFormError(null)
    if (Object.keys(nextErrors).length > 0) return
    if (!configured) {
      setFormError(
        "Sign-up is not set up yet. Add the Firebase keys from .env.example to .env.local, then restart the app.",
      )
      return
    }

    setSubmitting(true)
    try {
      const credential = await createEmailAccount(email, password)
      setCreatedEmail(credential.user.email ?? email.trim())
    } catch (error) {
      setFormError(signUpErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <p className="mb-2 text-sm font-medium text-primary">Account</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Create an account</h1>
      <p className="mt-2 text-muted-foreground">
        Use your email and a password. The quiz still works if you skip this.
      </p>

      <form className="mt-6" onSubmit={handleSubmit} noValidate>
        <Card className="space-y-5 p-6">
          {!configured && (
            <p className="text-sm text-muted-foreground" role="status">
              Sign-up needs Firebase keys in .env.local. You can still take the quiz.
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@school.edu"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              disabled={submitting}
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? "signup-email-error" : undefined}
            />
            {fieldErrors.email && (
              <p id="signup-email-error" className="text-sm text-destructive">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              disabled={submitting}
              aria-invalid={fieldErrors.password ? true : undefined}
              aria-describedby={fieldErrors.password ? "signup-password-error" : undefined}
            />
            {fieldErrors.password ? (
              <p id="signup-password-error" className="text-sm text-destructive">
                {fieldErrors.password}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">At least 6 characters.</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-confirm">Confirm password</Label>
            <Input
              id="signup-confirm"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              disabled={submitting}
              aria-invalid={fieldErrors.confirmPassword ? true : undefined}
              aria-describedby={fieldErrors.confirmPassword ? "signup-confirm-error" : undefined}
            />
            {fieldErrors.confirmPassword && (
              <p id="signup-confirm-error" className="text-sm text-destructive">
                {fieldErrors.confirmPassword}
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
            {submitting ? "Creating account…" : "Create account"}
          </Button>
        </div>
      </form>
    </div>
  )
}
