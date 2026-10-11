# How answers become the college-fit headline

The report card **“Does college fit your goals?”** shows a headline and short
summary. Those words come from counting votes—not from a hidden formula.

---

## The three possible headlines

| Path name | What the headline is about |
| --- | --- |
| **Structured** | Exploring a **4-year STEM degree** at a Georgia public university |
| **Applied** | A **hands-on or 2-year start**, then transferring toward a 4-year STEM degree |
| **Flexible** | A **flexible, interdisciplinary STEM track** in college |
| **Mixed** | Your answers pointed in **more than one direction**—explore before deciding |

---

## How counting works

1. Each answer you give can add **+1 vote** to structured, applied, or flexible.
2. Add up all votes from **8 scenarios** plus up to **3 pathway questions**.
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

You can earn votes for **both** structured and applied from these three
questions. That can make the final count closer and lead to a **mixed** headline.

---

## Table: scenario first moves → vote

Each of your **8 scenario** answers adds **one vote**. The app stores the vote
on each option in `lib/stem-scenarios.ts`. Most options also carry a **RIASEC**
interest code (from Holland / O\*NET research themes). The usual pattern:

| If your first move is mostly… (RIASEC) | Usual vote |
| --- | --- |
| **R** — hands-on, tools, equipment, field work | **Applied** |
| **I** — tests, data, experiments, analysis | **Structured** |
| **C** — organizing records, checklists, documentation | **Structured** |
| **A** — design, visuals, new product ideas | **Flexible** |
| **E** — lead a project, coordinate people | **Flexible** |
| **S** — help, teach, or talk with people | **Structured** or **Applied** (depends on the scenario) |

The exact vote is set per answer choice in the scenario pool (for example,
“Run tests to find the cause” → **Structured**).

**Flexible** votes come **only** from scenarios, not from the three pathway
questions.

---

## On the report

The college-fit card shows the vote totals (structured / applied / flexible).
Open **“How your answers map to this headline”** to see each **+1** vote and
which choice caused it.

Technical reference: `lib/college-path.ts`, `lib/recommend.ts`. For traits,
majors, and schools, see [How scoring works](./construct-map.md).
