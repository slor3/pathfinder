# Quiz scoring

The quiz draws eight scenarios at random from the 16-item pool in
[`lib/stem-scenarios.ts`](../lib/stem-scenarios.ts). Each option adds its listed
trait weights (primary = 2, supporting = 1) and one path vote
(`structured`, `applied`, or `entrepreneurial`). `generateReport()` scores the
eight options presented to that user.

Each option also records a RIASEC interest theme and an `onetTheme` rationale.
The trait weights and path votes are PathFinder design choices informed by the
themes; they are not O*NET scores. PathFinder's traits are:

| PathFinder trait | RIASEC association |
| --- | --- |
| Hands-on | Realistic (R) |
| Investigative | Investigative (I) |
| Creative | Artistic (A) |
| People-focused (`social`) | Social (S) |
| Leadership | Enterprising (E) |
| Analytical | Conventional (C), with overlap in Investigative (I) |

The pool uses original STEM-themed situations spanning environmental science,
robotics, health data, renewable energy, computing, agriculture, materials
science, astronomy, mapping, food science, assistive technology, and
manufacturing. Each scenario has four options. Scenario and option identifiers,
labels, trait weights, paths, RIASEC themes, and rationales are maintained in
the TypeScript data file.

The RIASEC framework is informed by the [O*NET Interest Profiler](https://www.onetcenter.org/IP.html)
and its [Interest Profiler Short Form PDF](https://www.onetcenter.org/dl_tools/ipsf/Interest_Profiler.pdf).
PathFinder's questions and scoring are original adaptations for exploration;
they have not been validated by O*NET or USDOL/ETA. O*NET® is a trademark of
USDOL/ETA. O*NET information is used under the
[O*NET Tools Developer License](https://www.onetcenter.org/license_tools.html).

## College recommendations

The college dataset is fetched from the U.S. Department of Education's
[College Scorecard](https://collegescorecard.ed.gov/) by
[`scripts/fetch-ga-colleges.mjs`](../scripts/fetch-ga-colleges.mjs) and stored in
[`lib/ga-colleges.json`](../lib/ga-colleges.json). The app ranks colleges using
its own STEM-program overlap, completion-rate, and in-state tuition scoring;
those recommendations are not official College Scorecard rankings.

The eight broad STEM major-area profiles used to recommend programs are
documented in [`scorecard-stem-mapping.md`](./scorecard-stem-mapping.md). Their
provisional trait weights are informed by official Georgia university program
descriptions. College Scorecard CIP titles help indicate program availability
but do not provide curriculum descriptions or establish that every school
offers each area as a separate undergraduate degree.
