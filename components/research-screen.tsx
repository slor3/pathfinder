"use client"

import { ArrowLeft, BookOpen, Check, ExternalLink, Lightbulb, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type Props = {
  onBack: () => void
  backLabel?: string
}

type LinkedSource = {
  title: string
  body: string
  href: string
  label: string
}

type InstitutionSource = {
  title: string
  body: string
}

const LINKED_SOURCES: LinkedSource[] = [
  {
    title: "Holland Codes (RIASEC)",
    body: "Holland's six interest themes—Realistic, Investigative, Artistic, Social, Enterprising, and Conventional—provide a framework for describing interests in different kinds of work and learning.",
    href: "https://www.careerkey.org/fit/personality/holland-personality-types",
    label: "Read about Holland personality types",
  },
  {
    title: "O*NET Interest Profiler Short Form",
    body: "This PDF describes the Interest Profiler items associated with the RIASEC framework. PathFinder's STEM scenarios are original adaptations informed by these themes; they are not a validated version of the profiler.",
    href: "https://www.onetcenter.org/dl_tools/ipsf/Interest_Profiler.pdf",
    label: "Read the Interest Profiler PDF",
  },
  {
    title: "College Scorecard",
    body: "The U.S. Department of Education's College Scorecard provides the institution data used for Georgia public four-year college recommendations, including tuition, completion, enrollment, and selected STEM program information. The current dataset is checked into the project and can be refreshed with its fetch script.",
    href: "https://collegescorecard.ed.gov/",
    label: "Explore College Scorecard",
  },
  {
    title: "NCES Classification of Instructional Programs",
    body: "College Scorecard program titles use CIP codes. These broad reporting groups help compare program availability, but do not replace institution catalog descriptions or establish that each area is a standalone degree at each school.",
    href: "https://nces.ed.gov/ipeds/cipcode/Default.aspx?y=56",
    label: "Browse the CIP taxonomy",
  },
  {
    title: "O*NET occupation descriptions",
    body: "Representative occupation descriptions and work activities help inform the provisional trait profiles for each broad STEM area. Occupations are examples of related work, not a complete definition of a major. O*NET information is used under the O*NET Tools Developer License.",
    href: "https://www.onetonline.org/link/summary/15-1252.00",
    label: "Explore O*NET occupations",
  },
]

const INSTITUTION_SOURCES: InstitutionSource[] = [
  {
    title: "University of Georgia Bulletin",
    body: "The 2026–2027 undergraduate bulletin provides descriptions for biology, chemistry, physics, mathematics, statistics, data science, computer science, and discipline-specific engineering programs.",
  },
  {
    title: "Georgia Southern degree programs",
    body: "Georgia Southern's program listings describe undergraduate programs including biology, chemistry, physics, computer science, mathematical sciences, geosciences, and several engineering disciplines.",
  },
  {
    title: "Georgia State geosciences programs",
    body: "Georgia State describes its geosciences degree and environmental-geosciences and environmental-science concentrations. These provide related evidence for environmental pathways, not proof that all eight profiles are standalone degrees at each school.",
  },
]

export function ResearchScreen({ onBack, backLabel }: Props) {
  const topLabel = backLabel ?? "Back to home"
  const bottomLabel = backLabel ?? "Return to home"

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <Button variant="ghost" className="mb-8 gap-2" onClick={onBack}>
        <ArrowLeft className="size-4" aria-hidden />
        {topLabel}
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
            body: "You answer eight STEM-themed scenarios randomly selected from a pool of 16. There is no right answer—choose the option that feels most like how you would begin.",
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
            <h3 className="font-semibold">Six traits and major-area mapping</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              PathFinder records six traits: analytical, investigative, creative, social,
              hands-on, and leadership. The scenario options also carry a RIASEC interest theme
              guided by O*NET. These are transparent, provisional mappings for exploration—not
              research-validated measurements or a claim that O*NET endorses this quiz.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold">Sixteen original STEM scenarios</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The pool covers environmental science, robotics, health data, renewable energy,
              computing, agriculture, materials science, astronomy, mapping, food science,
              assistive technology, and manufacturing. Each scenario has four first-move options;
              every quiz randomly selects eight. The option weights are provisional design
              choices informed by RIASEC themes, not research-proven measurements, and should be
              reviewed and tested.
            </p>
          </Card>
          <Card className="p-5 md:col-span-2">
            <h3 className="font-semibold">Eight STEM major profiles</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Major suggestions are currently grouped into Biology, Chemistry, Physics,
              Environmental Science, Mathematics, Statistics / Data Science, Computer Science,
              and Engineering. Their provisional trait weights are informed by official program
              descriptions at Georgia public universities, with O*NET occupations as supporting
              context. These are matching areas, not a claim that every school offers all eight as
              separate undergraduate degrees; some are represented by concentrations or related
              programs. See the mapping notes for those coverage limits.
            </p>
          </Card>
          <Card className="p-5 md:col-span-2">
            <h3 className="font-semibold">Georgia-wide college exploration</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              College recommendations use a checked-in College Scorecard dataset of Georgia
              public four-year institutions. The report ranks a short list for each student, and
              the project&apos;s fetch script can refresh the source data. Scores are a
              PathFinder-designed match, not an official College Scorecard ranking.
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="font-display text-2xl font-semibold">
          Research sources
        </h2>
        <div className="mt-5 space-y-4">
          {LINKED_SOURCES.map((source) => (
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
          <Card className="p-5">
            <h3 className="font-semibold">Georgia public university program catalogs</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Official undergraduate program descriptions from Georgia institutions informed the
              provisional STEM major profiles.
            </p>
            <ul className="mt-4 space-y-4">
              {INSTITUTION_SOURCES.map((source) => (
                <li key={source.title}>
                  <p className="font-medium">{source.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{source.body}</p>
                </li>
              ))}
            </ul>
          </Card>
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
          {bottomLabel}
        </Button>
      </div>
    </div>
  )
}
