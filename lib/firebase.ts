import { FirebaseError, getApps, initializeApp, type FirebaseApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type UserCredential,
} from "firebase/auth"

/**
 * Web app config from Firebase console → Project settings → Your apps.
 * Values are public client keys, but real ones stay in `.env.local`, not git.
 */
export type FirebaseWebConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

export type SignUpFieldErrors = {
  email?: string
  password?: string
  confirmPassword?: string
}

export type LoginFieldErrors = {
  email?: string
  password?: string
}

export class FirebaseConfigError extends Error {
  constructor() {
    super("Firebase web config is missing")
    this.name = "FirebaseConfigError"
  }
}

export function readFirebaseWebConfig(): FirebaseWebConfig | null {
  const config: FirebaseWebConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim() ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() ?? "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim() ?? "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim() ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim() ?? "",
  }

  if (Object.values(config).some((value) => value.length === 0)) return null
  return config
}

export function isFirebaseConfigured(): boolean {
  return readFirebaseWebConfig() !== null
}

function getFirebaseApp(config: FirebaseWebConfig): FirebaseApp {
  const existing = getApps().find((app) => app.name === "[DEFAULT]")
  return existing ?? initializeApp(config)
}

/**
 * Auth is created in the browser only, and only when every key is set.
 * An empty config must not throw — the quiz still runs with no account.
 */
export function getFirebaseAuth(): Auth | null {
  if (typeof window === "undefined") return null
  const config = readFirebaseWebConfig()
  if (!config) return null
  return getAuth(getFirebaseApp(config))
}

function emailFieldError(email: string): string | undefined {
  const trimmed = email.trim()
  if (!trimmed) return "Enter your email."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address."
  return undefined
}

export function validateSignUpInput(input: {
  email: string
  password: string
  confirmPassword: string
}): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {}
  const emailError = emailFieldError(input.email)
  if (emailError) errors.email = emailError

  if (!input.password) {
    errors.password = "Enter a password."
  } else if (input.password.length < 6) {
    errors.password = "Use a password with at least 6 characters."
  }

  if (!input.confirmPassword) {
    errors.confirmPassword = "Enter the password again."
  } else if (input.password && input.password !== input.confirmPassword) {
    errors.confirmPassword = "Passwords do not match."
  }

  return errors
}

export function validateLoginInput(input: { email: string; password: string }): LoginFieldErrors {
  const errors: LoginFieldErrors = {}
  const emailError = emailFieldError(input.email)
  if (emailError) errors.email = emailError
  if (!input.password) errors.password = "Enter your password."
  return errors
}

export async function createEmailAccount(email: string, password: string): Promise<UserCredential> {
  const auth = getFirebaseAuth()
  if (!auth) throw new FirebaseConfigError()
  return createUserWithEmailAndPassword(auth, email.trim(), password)
}

export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  const auth = getFirebaseAuth()
  if (!auth) throw new FirebaseConfigError()
  return signInWithEmailAndPassword(auth, email.trim(), password)
}

export async function signOutCurrentUser(): Promise<void> {
  const auth = getFirebaseAuth()
  if (!auth) throw new FirebaseConfigError()
  await signOut(auth)
}

export function signUpErrorMessage(error: unknown): string {
  if (error instanceof FirebaseConfigError) {
    return "Sign-up is not set up yet. Add the Firebase keys from .env.example to .env.local, then restart the app."
  }

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists."
      case "auth/invalid-email":
        return "Enter a valid email address."
      case "auth/weak-password":
        return "Use a password with at least 6 characters."
      case "auth/operation-not-allowed":
        return "Email and password sign-up is turned off in Firebase. Enable the Email/Password provider, then try again."
      case "auth/network-request-failed":
        return "Could not reach Firebase. Check your connection and try again."
      case "auth/too-many-requests":
        return "Too many attempts. Wait a moment and try again."
      default:
        return "Could not create the account. Try again."
    }
  }

  return "Could not create the account. Try again."
}

export function signInErrorMessage(error: unknown): string {
  if (error instanceof FirebaseConfigError) {
    return "Log in is not set up yet. Add the Firebase keys from .env.example to .env.local, then restart the app."
  }

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/wrong-password":
        return "That password is not right."
      case "auth/user-not-found":
        return "No account uses that email."
      case "auth/invalid-credential":
      case "auth/invalid-login-credentials":
        return "That email or password is not right."
      case "auth/invalid-email":
        return "Enter a valid email address."
      case "auth/user-disabled":
        return "This account is disabled."
      case "auth/operation-not-allowed":
        return "Email and password sign-in is turned off in Firebase. Enable the Email/Password provider, then try again."
      case "auth/network-request-failed":
        return "Could not reach Firebase. Check your connection and try again."
      case "auth/too-many-requests":
        return "Too many attempts. Wait a moment and try again."
      default:
        return "Could not log in. Try again."
    }
  }

  return "Could not log in. Try again."
}

export function signOutErrorMessage(error: unknown): string {
  if (error instanceof FirebaseConfigError) {
    return "Sign out is not set up yet. Add the Firebase keys from .env.example to .env.local, then restart the app."
  }

  if (error instanceof FirebaseError && error.code === "auth/network-request-failed") {
    return "Could not reach Firebase. Check your connection and try again."
  }

  return "Could not sign out. Try again."
}
