# STEM major profiles

PathFinder suggests **eight broad STEM areas** on the report. This document
explains what each area means, how we linked it to O\*NET occupations, and what
trait weights we use for matching.

Quiz scoring rules are in [How scoring works](./construct-map.md).

---

## What these profiles are (and are not)

**They are:**

- Interest-matching labels (“areas to explore”) based on typical undergraduate
  STEM program themes and related O\*NET occupations.
- Inputs to the major ranking in `lib/pathfinder-data.ts`.

**They are not:**

- A guarantee that every Georgia college offers that exact degree name.
- Official university, Scorecard, or O\*NET scores.
- A validated test result.

College Scorecard data in `lib/ga-colleges.json` shows which schools **list**
related programs (by federal CIP codes). University catalogs describe what
students **study**. We used both when designing profiles.

Program names vary by school—for example, environmental study might appear as
geosciences, ecology, or a concentration rather than “Environmental Science.”

---

## The eight areas

1. Biology
2. Chemistry
3. Physics
4. Environmental Science
5. Mathematics
6. Statistics / Data Science
7. Computer Science
8. Engineering

---

## How trait weights work

Each major area has a profile like `analytical: 3, investigative: 3, handsOn: 2`.
The number is a **relative emphasis**, not a percentage:

| Weight | Meaning |
| --- | --- |
| **3** | Strong fit—this area usually emphasizes this trait |
| **2** | Supporting fit |
| **1** | Present but lighter |

Traits match the six on the report:

| Trait | Typical activities in program descriptions |
| --- | --- |
| Analytical | Math, data analysis, modeling, evaluation |
| Investigative | Research, experiments, observation, inference |
| Creative | Design, new approaches, building solutions |
| Hands-on | Labs, field work, building, implementation |
| People-focused | Communication, collaboration, explaining results |
| Leadership | Coordinating work, guiding a team or project |

The app compares the student’s trait scores (from the quiz) to these profiles
and ranks the eight areas.

---

## Profiles at a glance

| Major area | What students typically study | Related O\*NET work (examples) | Profile weights |
| --- | --- | --- | --- |
| Biology | Living systems, lab methods, research design | [Biological Technicians](https://www.onetonline.org/link/summary/19-4021.00) — samples, experiments, lab equipment | `investigative: 3`, `analytical: 3`, `handsOn: 2`, `creative: 1` |
| Chemistry | Quantitative chemistry, lab work, instrumentation | [Chemists](https://www.onetonline.org/link/summary/19-2031.00) — analysis, experiments, quality testing | `analytical: 3`, `investigative: 3`, `handsOn: 2`, `creative: 2` |
| Physics | Theory, experiments, math modeling, problem-solving | [Physicists](https://www.onetonline.org/link/summary/19-2012.00) — data analysis, calculations, simulations | `analytical: 3`, `investigative: 3`, `creative: 2`, `handsOn: 1` |
| Environmental Science | Field and lab environmental study, pollution assessment | [Environmental Scientists](https://www.onetonline.org/link/summary/19-2041.00), [Geoscientists](https://www.onetonline.org/link/summary/19-2042.00) | `investigative: 3`, `handsOn: 3`, `analytical: 2`, `social: 2`, `creative: 1` |
| Mathematics | Proofs, modeling, abstract and applied math | [Mathematicians](https://www.onetonline.org/link/summary/15-2021.00) — models, principles, applied methods | `analytical: 3`, `creative: 3`, `investigative: 2`, `social: 1` |
| Statistics / Data Science | Stats theory, computing, ML, presenting results | [Statisticians](https://www.onetonline.org/link/summary/15-2041.00), [Data Scientists](https://www.onetonline.org/link/summary/15-2051.00) | `analytical: 3`, `investigative: 3`, `creative: 2`, `social: 2`, `handsOn: 1` |
| Computer Science | Algorithms, software, systems, applied computing | [Software Developers](https://www.onetonline.org/link/summary/15-1252.00) — design, build, test software | `analytical: 3`, `creative: 3`, `investigative: 2`, `handsOn: 1`, `social: 1` |
| Engineering | Design, labs, technical systems, professional practice | [Civil Engineers](https://www.onetonline.org/link/summary/17-2051.00), [Mechanical Engineers](https://www.onetonline.org/link/summary/17-2141.00) | `handsOn: 3`, `creative: 3`, `analytical: 2`, `investigative: 2`, `social: 1`, `leadership: 1` |

O\*NET occupations are **examples of related work**, not a full description of
every college curriculum.

---

## Things to keep in mind

- **Overlap is normal.** Chemistry and physics both score high on analytical and
  investigative. The weights show different emphasis, not different “types of
  people.”
- **Environmental Science and Engineering are broad.** Check Scorecard CIP data
  for what each recommended school actually lists.
- **Profiles are for exploration.** They are design judgments documented here for
  transparency—not predictions validated by research.

---

## Sources

Curriculum themes were informed by representative Georgia public university
catalogs (not a full review of all 26 USG schools):

- [University of Georgia Bulletin](https://bulletin.uga.edu/Program/Index)
- [Georgia Southern University degrees](https://www.georgiasouthern.edu/degrees)
- [Georgia State University Geosciences](https://geosciences.gsu.edu/)
- O\*NET occupation pages linked in the table above
- [NCES CIP taxonomy](https://nces.ed.gov/ipeds/cipcode/Default.aspx?y=56)
- [College Scorecard](https://collegescorecard.ed.gov/) and `lib/ga-colleges.json`
- [O\*NET Interest Profiler](https://www.onetcenter.org/IP.html) — used under the
  [O\*NET Tools Developer License](https://www.onetcenter.org/license_tools.html)
