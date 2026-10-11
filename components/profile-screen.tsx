"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowRight } from "lucide-react"
import { GEORGIA_REGION, type Region } from "@/lib/pathfinder-data"
import type { Profile } from "@/lib/storage"

type Props = {
  initial: Profile | null
  onContinue: (profile: Profile) => void
  onBack: () => void
}

const REGIONS: Region[] = [GEORGIA_REGION]

export function ProfileScreen({ initial, onContinue, onBack }: Props) {
  const [name, setName] = useState(initial?.name ?? "")
  const [region, setRegion] = useState<Region>(initial?.region ?? GEORGIA_REGION)

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <p className="mb-2 text-sm font-medium text-primary">Step 1 of 2 · About you</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Let&apos;s set up your profile
      </h1>
      <p className="mt-2 text-muted-foreground">
        We use this to tailor your report and recommend public colleges in your state.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        No account is needed — finish the scenarios to see your report.
      </p>

      <Card className="mt-6 space-y-5 p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jordan"
            autoComplete="given-name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Location</Label>
          <Select value={region} onValueChange={(v) => setRegion(v as Region)}>
            <SelectTrigger id="region" className="w-full">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            PathFinder recommends in-state public 4-year colleges in the state you select.
          </p>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          className="gap-2"
          onClick={() =>
            onContinue({
              name: name.trim(),
              region,
            })
          }
        >
          Start scenarios
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
