# How answers become the college-fit headline

The report card **“Does college fit your goals?”** shows a headline and short
summary. Those words come from **counting votes** on your quiz answers—not from
a hidden formula.

---

## The three possible headlines (PathFinder labels)

These names are **our wording** for Georgia, college-bound students. They are
**not** an official O\*NET or university test result.

| Path name | What the headline is about |
| --- | --- |
| **Structured** | Exploring a **4-year STEM degree** at a Georgia public university |
| **Applied** | A **hands-on or 2-year start**, then transferring toward a 4-year STEM degree |
| **Flexible** | A **flexible, interdisciplinary STEM track** in college |
| **Mixed** | Top vote counts are **too close**—explore before deciding |

---

## What published career tools actually use

PathFinder is inspired by public frameworks. They work differently from our
headline:

| Source | What the user gets | How it relates to “college” |
| --- | --- | --- |
| [O\*NET Interest Profiler](https://www.onetcenter.org/IP.html) | **RIASEC interest areas** (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) | Interests point toward **types of work**, not a single headline |
| [O\*NET IP Score Report (Job Zones)](https://www.onetcenter.org/dl_tools/ipsf/IP_Score_Report.pdf) | **Job Zones 1–5** = how much education/training occupations typically need | Zone **3** often = vocational training or associate degree; Zone **4** often = bachelor’s degree; users pick current or **future** zone |
| [Holland’s RIASEC theory](https://www.careerkey.org/fit/personality/holland-code-assessment-riasec) | Match **personality/interests** to majors and environments | Used by many colleges to **suggest majors**—still not a mandatory path |

**Important:** No standard online tool outputs exactly our three headlines.
PathFinder **translates** quiz data into simple college-fit messages using rules
we document below.

---

## How PathFinder translates quiz answers (honest summary)

```text
Scenario answers  →  each choice has a RIASEC code (research theme)
                    →  each choice also has a PathFinder path vote (our design)

Pathway answers     →  +1 vote to structured or applied when they match rules

All votes counted   →  headline = leader by ≥ 2, else mixed
```

| Layer | Evidence-based? | What it is |
| --- | --- | --- |
| **RIASEC on each option** | **Grounded in research themes** (Holland / O\*NET Interest areas) | Labels *why* an option feels like realistic vs investigative work |
| **Structured / applied / flexible votes** | **PathFinder design choice** | Maps those themes + scenario text to **three Georgia college messages** |
| **Pathway question votes** | **Paraphrased planning prompts** (similar spirit to O\*NET “future Job Zone” questions) | Your stated plans add votes; they do not replace scenario votes |
| **≥ 2 margin → mixed** | **PathFinder rule** | Keeps the headline cautious when signals conflict |

---

## How counting works

1. Each answer can add **+1 vote** to structured, applied, or flexible.
2. Add votes from **8 scenarios** + up to **3 pathway questions**.
3. The path with the **most votes** wins—**unless** the top two are only **1 vote
   apart**. Then the headline is **mixed**.

| Total votes (example) | Headline |
| --- | --- |
| Structured 6, Applied 2, Flexible 1 | **Structured** (lead by 4) |
| Applied 5, Structured 4, Flexible 0 | **Mixed** (lead by only 1) |
| Flexible 5, Structured 3, Applied 1 | **Flexible** (lead by 2) |
| Structured 4, Applied 4, Flexible 2 | **Mixed** (tied at top) |

---

## Table: pathway questions → vote

These three questions come **after** the scenarios. Each matching answer adds
**one vote**. “Unsure” or “explore” answers add **no vote**.

| Question | If you choose… | Adds 1 vote to |
| --- | --- | --- |
| What do you hope your next step will help you do? | Earn a degree for a career that requires it | **Structured** |
| What do you hope your next step will help you do? | Build practical skills for work as soon as possible | **Applied** |
| What do you hope your next step will help you do? | Explore subjects / not sure yet | *(none)* |
| Which learning setup sounds most sustainable? | Several years of structured classes and assignments | **Structured** |
| Which learning setup sounds most sustainable? | Shorter courses with projects and practical training | **Applied** |
| Which learning setup sounds most sustainable? | A mix / still figuring it out | *(none)* |
| How do you feel about a program that may take several years? | Comfortable with several years if it supports my goal | **Structured** |
| How do you feel about a program that may take several years? | Prefer a shorter program first | **Applied** |
| How do you feel about a program that may take several years? | Work, train, or explore before committing | **Applied** |
| How do you feel about a program that may take several years? | Unsure | *(none)* |

---

## Table: scenario answers — RIASEC (research) vs path vote (headline)

Each of your **8 scenario** picks adds **one path vote**. The same pick also has
a **RIASEC** letter tied to O\*NET/Holland **interest types** (see
[Career Interest Types](https://www.onetcenter.org/dictionary/current/excel/career_interest_types.html)).

The **path vote** is how we turn that interest style into a **college-fit
headline bucket**. We aligned votes with the **Job Zone** idea from the
[O\*NET Score Report](https://www.onetcenter.org/dl_tools/ipsf/IP_Score_Report.pdf)
(shorter preparation vs bachelor’s-style preparation), plus Georgia transfer
path messaging—not a copy of O\*NET scoring.

| RIASEC (on your chosen option) | Typical interest (Holland / O\*NET) | PathFinder path vote | Rough Job Zone link (O\*NET planning idea) |
| --- | --- | --- | --- |
| **R** Realistic | Hands-on, tools, machines, outdoors | **Applied** | Often Zone **2–3** (training, associate, skilled work) before or instead of a 4-year route |
| **I** Investigative | Analyze, experiment, research | **Structured** | Often Zone **4** (bachelor’s-level STEM fields) |
| **C** Conventional | Organize data, records, procedures | **Structured** | Often Zone **3–4** (technical programs through bachelor’s) |
| **A** Artistic | Design, create, unstructured problem-solving | **Flexible** | Zone **4** varies; we emphasize **interdisciplinary** college tracks |
| **E** Enterprising | Lead, persuade, coordinate | **Flexible** | Zone **4** varies; we emphasize **project / leadership** in college |
| **S** Social | Help, teach, communicate | **Structured** or **Applied** | Depends on the scenario (lab/field vs helping people) |

**Per-answer detail:** Every option in `lib/stem-scenarios.ts` lists its exact
`riasec`, `path`, and `onetTheme`. The report table **“How your answers map to
this headline”** shows the **path vote** for each choice you actually made.

**Flexible** path votes come **only** from scenarios, not from the three
pathway questions.

---

## Could we use O\*NET “directly” for the headline?

A fully O\*NET-faithful flow (for a future version) would look like:

1. Tally **RIASEC** from items (like the Interest Profiler).
2. Suggest occupations from [O\*NET career listings by interest](https://www.onetcenter.org/dl_tools/ipsf/IP_Career_Listings.pdf).
3. Ask which **Job Zone** matches your **current or future** preparation ([Score Report](https://www.onetcenter.org/dl_tools/ipsf/IP_Score_Report.pdf)).
4. Turn that into user-facing text (“explore Zone 4 bachelor’s programs…”).

PathFinder **skips steps 2–3 in the UI** and uses **original STEM scenarios**
plus the **three pathway questions** instead. That keeps the quiz short but
means the headline is a **documented translation**, not an O\*NET score.

---

## On the report

The college-fit card shows vote totals (structured / applied / flexible).
Open **“How your answers map to this headline”** for a row per **+1** vote.

Code: `lib/college-path.ts`, `lib/recommend.ts`. Traits, majors, and schools:
[How scoring works](./construct-map.md).

### Sources (external)

- O\*NET Interest Profiler: https://www.onetcenter.org/IP.html  
- O\*NET IP Score Report & Job Zones: https://www.onetcenter.org/dl_tools/ipsf/IP_Score_Report.pdf  
- O\*NET career listings by interest: https://www.onetcenter.org/dl_tools/ipsf/IP_Career_Listings.pdf  
- Holland / RIASEC overview: https://www.careerkey.org/fit/personality/holland-code-assessment-riasec  
- Example majors by Holland type (university career center): https://www.fau.edu/career/students/majors-by-holland-type/
