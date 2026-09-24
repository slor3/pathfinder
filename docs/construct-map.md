# Construct map (PAT-14)

Internal contract for how quiz answers become the report. `generateReport()` in `lib/recommend.ts` must follow this document. Per-option weights live in [scoring.md](./scoring.md) (PAT-13) and `lib/pathfinder-data.ts`; this page explains the constructs and rules those weights feed.

Student-facing explanation is PAT-30, not this file.

## Quiz format (absorbs PAT-15)

PathFinder uses a **situation judgment test (SJT)** shape: a short **situation**, a **prompt** (“What’s your first move?”), and **four first-moves** with no single correct answer.

We adapt the format described in Oswald et al. (2004), [*Structured interviews in employment settings*](https://doi.org/10.1037/0021-9010.89.2.187): situational stem plus behavioral response options. PathFinder writes **original** school-life situations. We do **not** copy Oswald appendix items or O\*NET Interest Profiler Like/Dislike statements.

The quiz serves **eight** shuffled scenarios from the pool (`QUIZ_SIZE = 8`), then three **education preference** questions (see below). Helper text tells users there is no right answer.

## Six strength traits

Each scenario option adds trait weights (primary = 2, secondary = 1). Traits are derived from O\*NET Interest Profiler / Holland RIASEC themes, not from a personality type test.

| Code (`pathfinder-data.ts`) | Report label | RIASEC source |
| --- | --- | --- |
| `handsOn` | Hands-on | Realistic (R) |
| `investigative` | Investigative | Investigative (I) |
| `creative` | Creative | Artistic (A) |
| `social` | People-focused | Social (S) |
| `leadership` | Leadership | Enterprising (E) |
| `analytical` | Analytical | Conventional (C) |

**Analytical** maps only to Conventional. **Investigative** maps only to Investigative. They are separate constructs so a “research first” move and a “checklist/process first” move score differently.

### Trait scoring (`generateReport` steps 1–2)

1. Sum trait weights from every answered scenario option.
2. Normalize to 0–100: each trait = `round(raw / maxRaw * 100)` where `maxRaw` is the highest raw trait total (minimum 1).
3. **Top strengths** = the three traits with the highest raw totals (used for display ordering).

Pathway questions do **not** change trait scores (see [Education preference questions](#education-preference-questions-pathway-override)).

## Three college-fit paths plus mixed

College-fit paths are **not majors** and **not personality types**. They answer one question: given how someone tends to act in situations, **what kind of education route looks like the best fit?**

Each scenario option carries one path vote. After eight scenarios, the app counts votes for `structured`, `applied`, and `entrepreneurial`. Path is **independent of RIASEC** — the same interest type can map to any path depending on the first-move (see [scoring.md](./scoring.md)). Labels are **suggestions**, not verdicts.

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
8 scenario answers (+ option weights from pathfinder-data.ts)
  → trait totals → normalized traitScores + topTraits
  → path vote counts → scenario path (or mixed)
  → education preference answers → final path key + PATH_COPY text

trait totals + MAJORS profiles
  → dot-product major scores → top 4 majors

top major clusters + region + path leading vote
  → college scores → ranked in-state schools
```

| Report section | Source in code | Driven by |
| --- | --- | --- |
| Strength bars | `traitScores`, `topTraits` | Scenario option trait weights |
| College-fit headline | `path` | Path votes + education preference override + mixed rule |
| Suggested majors | `majors` | Trait vector × major profiles |
| Nearby schools | `colleges` | Region, major clusters, college type vs leading path |

## Related docs

| File | Owns |
| --- | --- |
| [scoring.md](./scoring.md) | PAT-13: every option’s text, RIASEC theme, traits, path |
| [ggc-onet-research.md](./ggc-onet-research.md) | GGC program ↔ O\*NET occupation crosswalk (major profiles) |
| `lib/recommend.ts` | Implementation — must stay aligned with this page |
| `lib/pathfinder-data.ts` | Scenario pool, trait labels, majors, colleges |

## O\*NET attribution

Trait and theme mapping uses the [O\*NET Interest Profiler](https://www.onetcenter.org/IP.html). Job Zone and Work Importance references use [O\*NET OnLine](https://www.onetonline.org/). PathFinder has modified this information into original scenarios. USDOL/ETA has not approved, endorsed, or tested these modifications. Used under the [O\*NET Tools Developer License](https://www.onetcenter.org/license_tools.html).
