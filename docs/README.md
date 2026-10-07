# PathFinder documentation

PathFinder is a quiz that helps Georgia students explore STEM majors and
in-state public colleges. It is **not** a validated career test—the results are
starting points for conversation, not final answers.

## Start here

| If you want to… | Read |
| --- | --- |
| Understand what the app does and how scoring works | [How scoring works](./construct-map.md) |
| See how we chose the eight STEM major profiles | [STEM major profiles](./scorecard-stem-mapping.md) |
| Run or change the code | [Project README](../README.md) |

## How the app works (30-second version)

1. The student answers **8 STEM scenarios** (randomly picked from a pool of 16).
   Each answer has no right or wrong option.
2. The app adds up **six trait scores** (for example, analytical, hands-on,
   creative) from those answers.
3. The app also counts **college-fit path** votes: structured (degree-focused),
   applied (hands-on / shorter programs), or entrepreneurial (flexible /
   goal-driven). If answers are too close, the result is **mixed**.
4. Three short **education preference** questions can adjust the college-fit
   headline—they do not change trait scores.
5. The report shows strength bars, a college-fit suggestion, **top STEM major
   areas**, and **ranked Georgia public colleges**.

## Glossary

| Term | Meaning |
| --- | --- |
| **Trait** | One of six interest-style strengths shown as bars on the report (analytical, investigative, creative, people-focused, hands-on, leadership). |
| **College-fit path** | A broad education style suggestion—not a specific major or school. |
| **Major area** | One of eight STEM fields PathFinder can suggest (Biology, Chemistry, etc.). Not every college uses the same degree name. |
| **RIASEC** | Holland’s six interest types (Realistic, Investigative, Artistic, Social, Enterprising, Conventional). PathFinder maps these to traits. |
| **CIP** | Federal program codes used by College Scorecard to list what majors a school reports. |
| **O\*NET** | U.S. Department of Labor occupation database. We use it for research themes, not as a scored test. |

## Where the data lives

| What | File |
| --- | --- |
| Quiz scenarios and per-answer weights | `lib/stem-scenarios.ts` |
| Major profiles and trait labels | `lib/pathfinder-data.ts` |
| Georgia college dataset | `lib/ga-colleges.json` |
| Scoring logic | `lib/recommend.ts` |

## Research sources

PathFinder combines original quiz scenarios with public data:

- [O\*NET Interest Profiler](https://www.onetcenter.org/IP.html) — RIASEC interest themes
- [College Scorecard](https://collegescorecard.ed.gov/) — Georgia public college facts and program lists
- Georgia public university catalogs — what undergraduate STEM programs emphasize (see [STEM major profiles](./scorecard-stem-mapping.md))
