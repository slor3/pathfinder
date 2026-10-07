# Construct map

Internal contract for how quiz answers become the report. `generateReport()` in
`lib/recommend.ts` must follow this document. Scenario text and per-option
weights live in `lib/stem-scenarios.ts`; major and college data live in
`lib/pathfinder-data.ts` and `lib/ga-colleges.json`.

Student-facing explanation is on the research screen (`components/research-screen.tsx`), not this file.

## Quiz format

PathFinder uses a **situation judgment test (SJT)** shape: a short **situation**, a **prompt** (“What’s your first move?”), and **four first-moves** with no single correct answer.

We adapt the format described in Oswald et al. (2004), [*Structured interviews in employment settings*](https://doi.org/10.1037/0021-9010.89.2.187): situational stem plus behavioral response options. PathFinder writes **original** school-life situations. We do **not** copy Oswald appendix items or O\*NET Interest Profiler Like/Dislike statements.

The quiz serves **eight** shuffled scenarios from a **16-item STEM pool**
(`QUIZ_SIZE = 8` in `lib/recommend.ts`), then three **education preference**
questions (see below). Helper text tells users there is no right answer.

### Scenario pool (`lib/stem-scenarios.ts`)

Each option adds trait weights (primary = 2, supporting = 1) and one path vote
(`structured`, `applied`, or `entrepreneurial`). Each option also records a
RIASEC interest theme and an `onetTheme` rationale. The weights and path votes
are PathFinder design choices informed by those themes; they are not O\*NET
scores.

The pool uses original STEM-themed situations (environmental science, robotics,
health data, computing, agriculture, and related fields). Scenario and option
identifiers, labels, trait weights, paths, RIASEC themes, and rationales are
maintained only in the TypeScript data file—do not duplicate them here.

## Six strength traits

Each scenario option adds trait weights (primary = 2, secondary = 1). Traits are derived from O\*NET Interest Profiler / Holland RIASEC themes, not from a personality type test.

| Code (`pathfinder-data.ts`) | Report label | RIASEC source |
| --- | --- | --- |
| `handsOn` | Hands-on | Realistic (R) |
| `investigative` | Investigative | Investigative (I) |
| `creative` | Creative | Artistic (A) |
| `social` | People-focused | Social (S) |
| `leadership` | Leadership | Enterprising (E) |
| `analytical` | Analytical | Conventional (C), with some Investigative (I) overlap |

**Analytical** and **Investigative** remain separate PathFinder traits, but real
activities can involve both. Data analysis, for example, can be Investigative
when exploring evidence and Analytical when evaluating or organizing it. A
“research first” move and a “checklist/process first” move should still have
different primary signals.

### Trait scoring (`generateReport` steps 1–2)

1. Sum trait weights from every answered scenario option.
2. Normalize to 0–100: each trait = `round(raw / maxRaw * 100)` where `maxRaw` is the highest raw trait total (minimum 1).
3. **Top strengths** = the three traits with the highest raw totals (used for display ordering).

Pathway questions do **not** change trait scores (see [Education preference questions](#education-preference-questions-pathway-override)).

## Three college-fit paths plus mixed

College-fit paths are **not majors** and **not personality types**. They answer one question: given how someone tends to act in situations, **what kind of education route looks like the best fit?**

Each scenario option carries one path vote. After eight scenarios, the app counts votes for `structured`, `applied`, and `entrepreneurial`. Path is **independent of RIASEC** — the same interest type can map to any path depending on the first-move (see `lib/stem-scenarios.ts`). Labels are **suggestions**, not verdicts.

| Path (`PathSignal`) | Report headline (from `PATH_COPY`) | What it means | Real-world examples |
| --- | --- | --- | --- |
| `structured` | A 4-year college is a strong fit | The person leans toward **formal, longer credential paths** — classes, degrees, and clear progression. | Four-year university; bachelor’s programs; professional fields that typically require a degree (nursing, engineering, education). |
| `applied` | A hands-on or 2-year path may suit you best | The person leans toward **learning by doing** and building skills on a shorter or work-first timeline. | Community college; associate degree; trade school; apprenticeship; certificate programs; training then work, with transfer later as an option. |
| `entrepreneurial` | Keep college flexible and goal-driven | The person leans toward **choosing education on purpose**, not “college by default.” | Start a business or side project; build a portfolio; pick college only for a specific skill, network, or goal; gap year with a plan. |
| `mixed` | Your college-fit signals are mixed | Scenario answers **do not agree** — no path wins clearly enough to call. | Explore programs that blend structure, hands-on work, and flexibility before committing; compare 2-year vs 4-year options. |

A user with Realistic (hands-on) interests can still land on `structured` when their first-moves point at degree-heavy fields (for example engineering or nursing prep).

### O\*NET Job Zone justification

O\*NET [Job Zones](https://www.onetonline.org/help/online/zones) describe preparation level for occupations:

| Zone | Preparation | PathFinder path |
| --- | --- | --- |
| 4–5 | Considerable / extensive (bachelor’s or graduate typical) | **`structured`** — 4-year and professional-degree routes |
| 2–3 | Some / medium (HS diploma, apprenticeship, associate, vocational) | **`applied`** — community college, trade, and work-first training |
| 1–5 (varies) | Depends on the person’s goal, not one credential | **`entrepreneurial`** — education kept flexible or chosen for a specific outcome |

### O\*NET Work Importance justification

O\*NET [Work Importance](https://www.onetonline.org/find/descriptor/browse/1.B.2/) values help explain why each path exists:

| Path | Work Importance values that motivate it |
| --- | --- |
| `structured` | **Achievement**, **Support** — progress through structured learning and credentials |
| `applied` | **Working Conditions**, **Achievement** — practical settings and visible skill mastery |
| `entrepreneurial` | **Independence**, **Recognition**, **Achievement** — self-directed goals and outcomes over a default credential |

These justify the construct; the engine counts path votes from scenario options, not from Work Importance scores directly.

### Mixed college-fit

After eight scenario answers, count votes for `structured`, `applied`, and `entrepreneurial`.

Let the leading path be `L` and the runner-up count be `R`.

- If `L − R ≥ 2`, the scenario-based path is `L`.
- Otherwise the scenario-based path is **`mixed`**.

Example: 4 structured / 3 applied / 1 entrepreneurial → lead is only 1 → **mixed**.  
Example: 5 structured / 2 applied / 1 entrepreneurial → lead is 3 → **structured**.

Mixed copy: *“Your answers point in more than one direction…”* (`PATH_COPY.mixed` in `lib/recommend.ts`).

### Education preference questions (pathway override)

After the eight scenarios, the quiz asks **three direct questions about education plans**. These are separate from the college-fit paths above. They do **not** change trait scores — only the college-fit headline.

| Question key | What it asks | Example answers |
| --- | --- | --- |
| `educationGoal` | What the next step should help them do | Earn a required degree; build practical skills; explore; unsure |
| `learningPreference` | Which learning setup feels sustainable | Several years of structured classes; shorter applied courses; a mix; unsure |
| `commitment` | Comfort with a multi-year program | Comfortable with several years; prefer shorter first; work/train before committing; unsure |

Override rules — applied **after** scenario path votes:

- Force **`structured`** if any answer is: `degree-required`, `structured` learning preference, or `several-years` commitment.
- Else force **`applied`** if any answer is: `practical-skills`, `shorter-first`, or `work-first`.
- Else use the scenario-based path (including **`mixed`**).

Education preference answers **cannot** force `entrepreneurial`. That path comes only from scenario votes when entrepreneurial wins by the 2+ rule.

**Real-world effect:** a student whose scenarios say `mixed` but who picks “build practical skills” and “shorter program first” will still see the **`applied`** headline. A student who picks “earn a degree” and “several years of structured classes” will see **`structured`**, even if scenarios were split.

## Answer → report pipeline

```
8 scenario answers (+ option weights from stem-scenarios.ts)
  → trait totals → normalized traitScores + topTraits
  → path vote counts → scenario path (or mixed)
  → education preference answers → final path key + PATH_COPY text

trait totals + MAJORS profiles
  → dot-product major scores → ranked major-area profiles

top major matches
  → CIP-family overlap + completion-rate percentile + inverse tuition percentile
  → ranked Georgia public colleges
```

| Report section | Source in code | Driven by |
| --- | --- | --- |
| Strength bars | `traitScores`, `topTraits` | Scenario option trait weights |
| College-fit headline | `path` | Path votes + education preference override + mixed rule |
| Suggested majors | `majors` | Trait vector × major profiles |
| Recommended colleges | `colleges` | STEM CIP-family overlap, completion-rate percentile, and in-state tuition percentile |

## College and major data

**Colleges.** Georgia public four-year institutions come from the U.S.
Department of Education [College Scorecard](https://collegescorecard.ed.gov/),
fetched by [`scripts/fetch-ga-colleges.mjs`](../scripts/fetch-ga-colleges.mjs)
and stored in [`lib/ga-colleges.json`](../lib/ga-colleges.json). The app ranks
schools with its own STEM-program overlap, completion-rate, and in-state tuition
scoring; those rankings are not official College Scorecard outputs.

**Major-area profiles.** Eight broad STEM areas used for major recommendations
are documented in [scorecard-stem-mapping.md](./scorecard-stem-mapping.md).
Provisional trait weights there are informed by official Georgia university
program descriptions. College Scorecard CIP titles indicate program
availability; they do not establish that every school offers each area as a
separate undergraduate degree.

## Code and research references

| Location | Owns |
| --- | --- |
| `lib/stem-scenarios.ts` | 16 STEM scenarios; per-option traits, paths, RIASEC, `onetTheme` |
| `lib/pathfinder-data.ts` | Trait labels, major-area profiles, types |
| `lib/ga-colleges.json` | Cached Georgia public college dataset |
| `lib/recommend.ts` | Scoring implementation — must stay aligned with this page |
| [scorecard-stem-mapping.md](./scorecard-stem-mapping.md) | Evidence and rationale for the eight STEM major-area profiles |

## O\*NET attribution

Trait and theme mapping uses the [O\*NET Interest Profiler](https://www.onetcenter.org/IP.html)
and its [Interest Profiler Short Form PDF](https://www.onetcenter.org/dl_tools/ipsf/Interest_Profiler.pdf).
Job Zone and Work Importance references use [O\*NET OnLine](https://www.onetonline.org/).
PathFinder's questions and scoring are original adaptations for exploration;
they have not been validated by O\*NET or USDOL/ETA. PathFinder has modified
this information into original scenarios. USDOL/ETA has not approved, endorsed,
or tested these modifications. O\*NET® is a trademark of USDOL/ETA. Used under
the [O\*NET Tools Developer License](https://www.onetcenter.org/license_tools.html).
