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
import { REGIONS, type Region } from "@/lib/pathfinder-data"
import type { Profile } from "@/lib/storage"

type Props = {
  initial: Profile | null
  onContinue: (profile: Profile) => void
  onBack: () => void
}

const STAGES: { value: Profile["stage"]; label: string }[] = [
  { value: "hs-senior", label: "High school senior" },
  { value: "freshman", label: "College freshman / undecided" },
  { value: "returning", label: "Adult returning to school" },
]

export function ProfileScreen({ initial, onContinue, onBack }: Props) {
  const [name, setName] = useState(initial?.name ?? "")
  const [stage, setStage] = useState<Profile["stage"] | "">(initial?.stage ?? "")
  const [region, setRegion] = useState<Region | "">(initial?.region ?? "")

  const valid = stage !== "" && region !== ""

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-4 py-12">
      <p className="mb-2 text-sm font-medium text-primary">Step 1 of 2 · About you</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Let&apos;s set up your profile
      </h1>
      <p className="mt-2 text-muted-foreground">
        We use this to tailor your report and find colleges near you.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        No account is needed — finish the scenarios to see your report.
      </p>

      <Card className="mt-6 space-y-5 p-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your name (optional)</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jordan"
            autoComplete="given-name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stage">Where are you right now?</Label>
          <Select value={stage} onValueChange={(v) => setStage(v as Profile["stage"])}>
            <SelectTrigger id="stage" className="w-full">
              <SelectValue placeholder="Select your stage" />
            </SelectTrigger>
            <SelectContent>
              {STAGES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Your region</Label>
          <Select value={region} onValueChange={(v) => setRegion(v as Region)}>
            <SelectTrigger id="region" className="w-full">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          className="gap-2"
          disabled={!valid}
          onClick={() => valid && onContinue({ name: name.trim(), stage: stage as Profile["stage"], region: region as Region })}
        >
          Start scenarios
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}
