"use client"

import { ArrowLeft, BookOpen, Check, ExternalLink, Lightbulb, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Props = {
  onBack: () => void
}

const SOURCES = [
  {
    title: "Holland Codes (RIASEC)",
    body: "Holland's six interest themes—Realistic, Investigative, Artistic, Social, Enterprising, and Conventional—help define PathFinder's six traits. This is the research foundation for how we describe different ways of approaching work and learning.",
    href: "https://www.onetcenter.org/IP.html",
    label: "Read about the Interest Profiler",
  },
  {
    title: "O*NET occupations",
    body: "We compare GGC programs with representative O*NET occupations to check whether documented work activities support the trait-to-major mapping. O*NET is research evidence only; PathFinder does not recommend jobs. O*NET information is used under the O*NET Tools Developer License.",
    href: "https://www.onetonline.org/",
    label: "Explore O*NET occupations",
  },
  {
    title: "Georgia Gwinnett College degrees",
    body: "We started by mapping the traits to all 19 bachelor's programs listed by Georgia Gwinnett College. Those program profiles are suggestions for exploration, not official GGC classifications or guarantees of fit.",
    href: "https://www.ggc.edu/academics/degrees-and-programs",
    label: "View GGC degrees and programs",
  },
]

export function ResearchScreen({ onBack }: Props) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <Button variant="ghost" className="mb-8 gap-2" onClick={onBack}>
        <ArrowLeft className="size-4" aria-hidden />
        Back to home
      </Button>

      <div className="max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm text-secondary-foreground">
          <BookOpen className="size-4 text-primary" aria-hidden />
          How the research works
        </div>
        <h1 className="text-balance font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
          See how your first moves become a report
        </h1>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Lightbulb,
            title: "1. Choose a first move",
            body: "You answer eight realistic scenarios. There is no right answer—choose the option that feels most like how you would begin.",
          },
          {
            icon: Scale,
            title: "2. Build a pattern",
            body: "Each option contributes provisional weights to traits such as analytical, creative, social, hands-on, leadership, or investigative, plus a broad path signal.",
          },
          {
            icon: Check,
            title: "3. Explore your report",
            body: "Your eight scenario answers become strength bars. Three short pathway questions then add your stated education goals without changing your six trait scores.",
          },
        ].map((step) => (
          <Card key={step.title} className="p-5">
            <step.icon className="size-5 text-primary" aria-hidden />
            <h2 className="mt-4 font-display text-lg font-semibold">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </Card>
        ))}
      </div>

      <section className="mt-12" aria-labelledby="research-design-heading">
        <h2 id="research-design-heading" className="font-display text-2xl font-semibold">
          What we researched and what we are testing
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <h3 className="font-semibold">Six traits and major mapping</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We use research-informed definitions for six traits: analytical, investigative,
              creative, social, hands-on, and leadership. We started by mapping those traits to
              all 19 GGC bachelor&apos;s programs, using official program information and
              representative O*NET occupational activities as supporting evidence.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold">Sixteen original scenarios</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              PathFinder has 16 original scenarios, each with four first-move options. Every quiz
              randomly selects eight scenarios, so each run is different while staying eight
              questions long. After those scenarios, three short pathway questions ask about your
              goals, preferred learning setup, and comfort with a longer program to help clarify
              possible next moves. The option weights are provisional design choices—not
              research-proven measurements—and will be evaluated through review and testing.
            </p>
          </Card>
          <Card className="p-5 md:col-span-2">
            <h3 className="font-semibold">Georgia-wide college exploration</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The next college-data step is to use real institutions across Georgia and show a
              short list of leading matches, such as five or ten programs or colleges. College
              recommendations will be based on the user&apos;s state and program fit, with sources
              and limitations shown clearly—not on unsupported national rankings.
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="font-display text-2xl font-semibold">
          Research sources
        </h2>
        <div className="mt-5 space-y-4">
          {SOURCES.map((source) => (
            <Card key={source.title} className="p-5">
              <h3 className="font-semibold">{source.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{source.body}</p>
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {source.label}
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="results-heading">
        <h2 id="results-heading" className="font-display text-2xl font-semibold">
          How answers become results
        </h2>
        <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-6">
          <div className="grid gap-5 text-sm leading-relaxed md:grid-cols-4 md:items-center">
            <div>
              <p className="font-semibold">One first move</p>
              <p className="mt-1 text-muted-foreground">Adds a primary and supporting trait signal.</p>
            </div>
            <div className="text-primary md:text-center" aria-hidden>→</div>
            <div>
              <p className="font-semibold">Eight answers</p>
              <p className="mt-1 text-muted-foreground">Create your response pattern and scenario path signal.</p>
            </div>
            <div>
              <p className="font-semibold">Your report</p>
              <p className="mt-1 text-muted-foreground">Combines the scenario pattern with three stated pathway answers.</p>
            </div>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Major matches compare your response pattern with broad, research-informed program
          profiles. They are suggestions for exploration—not a verdict, diagnosis, admissions
          decision, or guarantee that a program is right for you. Program and occupational
          research informs the design, while the app uses its own transparent trait-matching
          model.
        </p>
      </section>

      <div className="mt-10">
        <Button onClick={onBack} variant="outline" className="gap-2">
          <ArrowLeft className="size-4" aria-hidden />
          Return to home
        </Button>
      </div>
    </div>
  )
}
