# How answers build the college-fit headline

This page is for teammates and reviewers. It explains **exactly** how quiz
choices become the headline on the report card (“Does college fit your goals?”).

Implementation: `lib/college-path.ts` and `generateReport()` in `lib/recommend.ts`.

---

## Idea in one sentence

Each answer adds **one vote** to one of three college-bound paths. The headline
is the path with the most votes, unless the top two are **within 1 vote**—then
the headline is **mixed**.

No extra matching formula: it is a **transparent tally**.

---

## The three paths

| Path | What we mean (Georgia, college-bound) |
| --- | --- |
| **structured** | Explore a 4-year STEM degree at a public university |
| **applied** | Hands-on or 2-year start, then transfer toward a 4-year STEM degree |
| **flexible** | Interdisciplinary / project-style STEM within a university degree |

---

## Step 1 — Eight scenario answers

For each STEM scenario the student completes, their chosen option includes:

| Field | Role |
| --- | --- |
| `path` | Which path gets **+1 vote** |
| `riasec` | Holland interest code (R, I, A, S, E, C) for research traceability |
| `onetTheme` | Short note tying the option to O\*NET-style work themes |

Scenario options are labeled using the **RIASEC path guide** in
`lib/college-path.ts` (`RIASEC_PATH_GUIDE`). Authors set `path` per option
following that rubric (some Social options differ if the first move is teaching
vs fieldwork).

**Example:** Choosing “Run tests to find out what is causing the error” adds
**+1 structured** (Investigative / formal study theme).

---

## Step 2 — Three pathway answers

After scenarios, three questions about education plans may each add **+1 vote**
when the answer matches a rule in `PATHWAY_VOTE_RULES` (`lib/college-path.ts`).

| Question topic | Example answer that votes | Path |
| --- | --- | --- |
| Education goal | Degree required for career | structured |
| Education goal | Build practical skills soon | applied |
| Learning preference | Several years of structured classes | structured |
| Learning preference | Shorter courses, practical training | applied |
| Commitment | Comfortable with several years | structured |
| Commitment | Shorter program first / work before committing | applied |
| Unsure / explore | *(no vote)* | — |

A student can earn votes on **both** structured and applied from pathway
questions (for example, “degree required” plus “shorter program first”). That
is intentional and can push the result toward **mixed**.

---

## Step 3 — Pick the headline

1. Add scenario votes + pathway votes → totals for structured, applied, flexible.
2. Sort totals. If **first − second ≥ 2**, use that path’s copy from `PATH_COPY`.
3. Otherwise use **mixed** copy.

`flexible` only receives votes from scenarios (design / leadership / project
first-moves), not from pathway questions.

---

## See it on the report

The report shows vote totals on the college-fit card and an expandable list:
**“See how your answers counted.”** Each line is one **+1** vote and which
answer caused it.

---

## Research backing (no new algorithm)

- **Scenarios:** Situational-judgment format; RIASEC labels align with Holland
  and O\*NET Interest themes (see research screen sources).
- **Pathway questions:** Paraphrased education-planning prompts; rules are
  documented in code, not learned from data.
- **Headline:** Mode of labeled votes with a mixed band—an **operational
  definition** suitable for class documentation, not a clinical assessment.

For major matching and colleges, see [How scoring works](./construct-map.md).
