import { FirebaseError } from "firebase/app"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore"
import { getFirebaseFirestore } from "./firebase"
import type { SavedReport } from "./storage"

function savedReportsCollection(userId: string) {
  return collection(getFirebaseFirestore(), "users", userId, "savedReports")
}

export async function saveFirebaseReport(
  userId: string,
  entry: SavedReport,
): Promise<SavedReport> {
  const reportRef = doc(savedReportsCollection(userId))
  const { pathwayAnswers, ...reportData } = entry

  await setDoc(reportRef, {
    ...reportData,
    id: reportRef.id,
    ...(pathwayAnswers ? { pathwayAnswers } : {}),
  })

  return { ...entry, id: reportRef.id }
}

export async function loadFirebaseReports(userId: string): Promise<SavedReport[]> {
  const reportsQuery = query(
    savedReportsCollection(userId),
    orderBy("createdAt", "desc"),
    limit(10),
  )
  const snapshot = await getDocs(reportsQuery)

  return snapshot.docs.map((reportDoc) => ({
    ...reportDoc.data(),
    id: reportDoc.id,
  }) as SavedReport)
}

export async function deleteFirebaseReport(userId: string, reportId: string): Promise<void> {
  await deleteDoc(doc(savedReportsCollection(userId), reportId))
}

export function savedReportErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "permission-denied":
        return "Firebase denied access to saved reports. Check that Firestore is enabled and its security rules allow this account to access its own reports."
      case "unavailable":
        return "Could not reach Firebase. Check your connection and try again."
      case "failed-precondition":
        return "Firebase could not complete this request. Check the Firestore database setup and try again."
      default:
        return "Could not sync saved reports with Firebase. Try again."
    }
  }

  return "Could not sync saved reports with Firebase. Try again."
}
