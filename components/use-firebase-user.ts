"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { getFirebaseAuth } from "@/lib/firebase"

export function useFirebaseUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) return
    return onAuthStateChanged(auth, setUser)
  }, [])

  return user
}

/**
 * Email to show the moment sign-up or log in succeeds.
 * When Firebase later reports a signed-out session, that local email is dropped
 * so the form comes back — including sign out from the header.
 */
export function useAccountEmail(signedInEmail: string | null) {
  const [localEmail, setLocalEmail] = useState<string | null>(null)
  const [trackedEmail, setTrackedEmail] = useState(signedInEmail)

  if (trackedEmail !== signedInEmail) {
    setTrackedEmail(signedInEmail)
    if (!signedInEmail) setLocalEmail(null)
  }

  const signedOut = trackedEmail !== null && signedInEmail === null
  const email = signedOut ? null : (localEmail ?? signedInEmail)

  return {
    email,
    rememberedHere: !signedOut && localEmail !== null,
    rememberEmail: setLocalEmail,
  }
}
