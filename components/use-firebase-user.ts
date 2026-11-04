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
