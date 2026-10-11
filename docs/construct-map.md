# How scoring works

This document explains how PathFinder turns quiz answers into the report.
Developers: `generateReport()` in `lib/recommend.ts` must match these rules.

For a shorter overview, see [docs/README.md](./README.md). Student-facing copy
lives on the research screen (`components/research-screen.tsx`).

---

## At a glance

```
8 scenario answers
  → six trait scores (strength bars)
  → college-fit path (or “mixed”)
  → 3 education-preference answers add path votes (combined tally)

trait scores + major-area profiles → top STEM major suggestions
top majors + college data → ranked Georgia public colleges
```

| Report section | What drives it |
| --- | --- |
| Strength bars | Trait weights on the 8 scenario answers you chose |
| College-fit headline | Path votes from scenarios + pathway questions ([detail](./college-fit-headline.md)) |
| Suggested majors | How your traits match eight STEM area profiles |
| Recommended colleges | STEM program overlap, completion rate, in-state tuition |

---

## The quiz

Each question is a **short STEM situation** with **four possible first moves**.
There is no correct answer—the student picks what feels most like them.

- **16 scenarios** exist in `lib/stem-scenarios.ts`.
- The app shows **8** at random (`QUIZ_SIZE = 8`).
- After scenarios, the student answers **3 education preference** questions.

We use a situational-judgment format inspired by published interview research
(Oswald et al., 2004). All scenario text is **original**—we do not copy O\*NET
Interest Profiler items or other published tests.

### What each answer contributes

Every option a student can pick includes:

| Field | What it does |
| --- | --- |
| **Trait weights** | Adds points to up to two traits (main choice = 2, secondary = 1) |
| **Path vote** | Votes for `structured`, `applied`, or `flexible` |
| **RIASEC theme** | Research label (R, I, A, S, E, or C) tied to O\*NET interest areas |
| **onetTheme** | Short note on why that option maps to a theme (for documentation) |

Trait weights and path votes are **PathFinder design choices** informed by
research—they are not official O\*NET scores.

---

## Six traits

Traits appear as **strength bars** on the report. They come from the Holland
RIASEC interest framework (via O\*NET), not from a personality type test.

| Report label | Code in data | Based on RIASEC |
| --- | --- | --- |
| Hands-on | `handsOn` | Realistic (R) |
| Investigative | `investigative` | Investigative (I) |
| Creative | `creative` | Artistic (A) |
| People-focused | `social` | Social (S) |
| Leadership | `leadership` | Enterprising (E) |
| Analytical | `analytical` | Conventional (C) |

**Investigative** and **Analytical** are separate on purpose. “Research the
problem first” and “make a checklist first” should score differently even though
both can involve thinking.

### How trait scores are calculated

1. Add up trait points from all 8 answered scenarios.
2. Scale each trait to 0–100 relative to the student’s highest trait (so the top
   bar is always 100).
3. Highlight the **top 3** traits on the report.

The three education-preference questions **do not** change trait scores.

---

## College-fit paths

A college-fit path is a **broad education style**, not a major and not a
specific school. It answers: *given how you tend to act in situations, what kind
of education route might fit?*

| Path | Report says (roughly) | Plain meaning |
| --- | --- | --- |
| `structured` | Explore a 4-year STEM degree at a Georgia public university | Default college-bound STEM bachelor's exploration |
| `applied` | Consider a hands-on start with a 2-year transfer path | Community/technical college first, then transfer toward a 4-year STEM degree |
| `flexible` | Explore a flexible, interdisciplinary STEM track in college | Interdisciplinary or project-based STEM within a university degree |
| `mixed` | Your signals are mixed | Answers pointed in more than one direction |

Each scenario option casts one path vote. After 8 scenarios, the app counts
votes. Three education-preference answers can each add **one more vote** to
`structured` or `applied` (never `flexible`). The headline uses the **combined**
tally.

### When the result is “mixed”

Compare the top two path counts (scenarios + pathway votes). If the leader wins
by **fewer than 2 votes**, the result is **mixed**.

| Votes (structured / applied / flexible) | Result |
| --- | ---: |
| 4 / 3 / 1 | **mixed** (lead is only 1) |
| 5 / 2 / 1 | **structured** (lead is 3) |

### Education preference votes (combined with scenarios)

Three follow-up questions ask about the student’s **stated plans**. They add
votes to the same tally—they do **not** replace scenario votes. They also do
**not** change trait bars.

| If any answer matches… | Adds one vote to… |
| --- | --- |
| Required degree, structured classes, or several years of school | `structured` |
| Practical skills, applied/hands-on learning, shorter program first, or work before more school | `applied` |
| Unsure / explore / mixed | *(no extra vote)* |

A student can earn **both** a structured and an applied pathway vote in the same
quiz (for example, “degree required” plus “shorter program first”). That is
intentional—it can push the result toward **mixed**.

`flexible` can only come from scenario votes, not from these three questions.

**Example:** Scenarios are 4 structured / 3 applied / 1 flexible (mixed by 1).
The student also picks practical skills and shorter program first → +2 applied →
5 applied / 4 structured → **applied** wins by 1 → headline stays **mixed**.
Another run with 5 structured scenario votes plus a degree-required answer →
6 structured → **structured** headline.

### Research background (optional)

We tie each path to O\*NET [Job Zones](https://www.onetonline.org/help/online/zones)
(preparation level) and [Work Importance](https://www.onetonline.org/find/descriptor/browse/1.B.2/)
values. The app itself only counts scenario votes—it does not read Job Zone
scores directly.

---

## Majors and colleges

### STEM major areas

PathFinder suggests **eight broad STEM areas** (Biology, Chemistry, Physics,
Environmental Science, Mathematics, Statistics/Data Science, Computer Science,
Engineering). Each area has a trait profile documented in
[scorecard-stem-mapping.md](./scorecard-stem-mapping.md).

The app ranks areas by how well the student’s trait scores match each profile.

### Georgia colleges

College data comes from the federal [College Scorecard](https://collegescorecard.ed.gov/),
cached in `lib/ga-colleges.json` (refreshed via `scripts/fetch-ga-colleges.mjs`).

Schools are ranked by:

1. STEM program overlap with the student’s top major areas
2. Completion rate (higher is better)
3. In-state tuition (lower is better)

These rankings are **PathFinder’s own formula**, not an official Scorecard list.

---

## Developer reference

| File | Contents |
| --- | --- |
| `lib/stem-scenarios.ts` | All 16 scenarios and per-option weights |
| `lib/pathfinder-data.ts` | Trait labels, major-area profiles, types |
| `lib/ga-colleges.json` | Georgia public 4-year college dataset |
| `lib/recommend.ts` | `generateReport()` and ranking logic |

Do not duplicate scenario text in markdown—the TypeScript file is the source of
truth.

---

## O\*NET attribution

Trait mapping uses the [O\*NET Interest Profiler](https://www.onetcenter.org/IP.html)
and [Short Form PDF](https://www.onetcenter.org/dl_tools/ipsf/Interest_Profiler.pdf).
PathFinder’s questions and scoring are original adaptations for exploration and
have not been validated by O\*NET or USDOL/ETA. Used under the
[O\*NET Tools Developer License](https://www.onetcenter.org/license_tools.html).
O\*NET® is a trademark of USDOL/ETA.
