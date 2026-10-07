# STEM major-area trait profiles

Quiz scoring rules and the answer → report pipeline are in
[construct-map.md](./construct-map.md). This page documents only the eight
STEM major-area profiles and the evidence behind their trait weights.

## Scope and evidence

PathFinder compares eight broad STEM areas. They are interest-matching profiles,
not a claim that every college offers eight identically named undergraduate
degrees. College Scorecard CIP titles in [`lib/ga-colleges.json`](../lib/ga-colleges.json)
show which Georgia public schools list related programs; official university
catalogs describe what students actually study in those fields.

Trait weights below are informed by themes that recur across representative
Georgia public university program descriptions (see
[Program-description sources](#program-description-sources)). Not every USG
institution offers every area as a standalone bachelor's major, and program
names vary (for example, environmental studies may appear as geosciences,
ecology, or a concentration rather than a single "Environmental Science"
degree). The eight labels are **major areas to explore**, not verified
offerings at every recommended school.

## How to read the weights

The numbers below are PathFinder's provisional relative weights for matching,
not scores published by universities, College Scorecard, O*NET, or a validated
assessment. A `3` indicates a stronger design association, `2` a supporting
association, and `1` a lighter association. They reflect activities commonly
emphasized in undergraduate STEM program descriptions:

- `analytical`: quantitative reasoning, data analysis, evaluation, and modeling.
- `investigative`: experiments, research, observation, and inference.
- `creative`: design, developing approaches, and constructing solutions.
- `handsOn`: laboratory, field, building, or implementation work.
- `social`: communication, collaboration, and explaining findings.
- `leadership`: responsibility for coordinating or guiding work.

## Major-area to O*NET comparison

This crosswalk links typical undergraduate curriculum themes to tasks for
representative O*NET occupations. O*NET activities describe related work—they
are not a substitute for any single college's curriculum. The final column is
the reasoned link to PathFinder traits, not an O*NET score or a claim that
every graduate will do those tasks.

| Major area | Typical curriculum themes | Representative O*NET occupation(s) and activity evidence | PathFinder trait profile |
| --- | --- | --- | --- |
| Biology | Core biological principles, laboratory methods, research design, and applied study of living systems (ecology, cell/molecular biology, organismal biology). | [Biological Technicians (19-4021.00)](https://www.onetonline.org/link/summary/19-4021.00) collect specimens and data, monitor experiments, operate lab equipment, analyze results, and keep records. | `investigative: 3`, `analytical: 3`, `handsOn: 2`, `creative: 1` |
| Chemistry | Quantitative chemistry grounded in mathematics and physical science, laboratory experimentation, instrumentation, and preparation for professional or graduate work. | [Chemists (19-2031.00)](https://www.onetonline.org/link/summary/19-2031.00) conduct qualitative and quantitative analyses and experiments, characterize compounds, test quality, troubleshoot instruments, and develop products or methods. | `analytical: 3`, `investigative: 3`, `handsOn: 2`, `creative: 2` |
| Physics | Theoretical and experimental physics, mathematical modeling, quantitative problem-solving, and research preparation. | [Physicists (19-2012.00)](https://www.onetonline.org/link/summary/19-2012.00) analyze experimental data, perform complex calculations, describe observations mathematically, design simulations, and develop or apply theories. | `analytical: 3`, `investigative: 3`, `creative: 2`, `handsOn: 1` |
| Environmental Science | Field and lab study of environmental systems, data collection on air, soil, and water, pollution assessment, and communicating findings to stakeholders. Often overlaps with geosciences, geology, or ecology programs depending on the institution. | [Environmental Scientists (19-2041.00)](https://www.onetonline.org/link/summary/19-2041.00) collect and analyze environmental data, investigate pollution, and monitor effects. [Geoscientists (19-2042.00)](https://www.onetonline.org/link/summary/19-2042.00) conduct field studies, collect samples, analyze geological data, and prepare reports. | `investigative: 3`, `handsOn: 3`, `analytical: 2`, `social: 2`, `creative: 1` |
| Mathematics | Abstract reasoning, proof and problem-solving, mathematical modeling, and applying quantitative methods to real problems. | [Mathematicians (15-2021.00)](https://www.onetonline.org/link/summary/15-2021.00) conduct research, develop mathematical principles, create models, apply methods to practical problems, and communicate research. | `analytical: 3`, `creative: 3`, `investigative: 2`, `social: 1` |
| Statistics / Data Science | Statistical theory, data analysis, computing, inference, machine learning, modeling, and presenting results to decision-makers. | [Statisticians (15-2041.00)](https://www.onetonline.org/link/summary/15-2041.00) select methods, evaluate data quality, identify patterns, interpret results, and communicate findings. [Data Scientists (15-2051.00)](https://www.onetonline.org/link/summary/15-2051.00) process large datasets, test models, create visualizations, and present findings. | `analytical: 3`, `investigative: 3`, `creative: 2`, `social: 2`, `handsOn: 1` |
| Computer Science | Computing foundations, algorithms, software design and implementation, systems (hardware, databases, networks), and applied problem-solving. | [Software Developers (15-1252.00)](https://www.onetonline.org/link/summary/15-1252.00) analyze user needs, design and develop software, test or validate systems, troubleshoot, and coordinate on requirements. | `analytical: 3`, `creative: 3`, `investigative: 2`, `handsOn: 1`, `social: 1` |
| Engineering | Engineering science, design, laboratory and project work, technical systems, and professional practice. Disciplines (mechanical, civil, electrical, etc.) vary by program. | [Civil Engineers (17-2051.00)](https://www.onetonline.org/link/summary/17-2051.00) calculate design requirements, inspect sites and materials, plan systems, and oversee construction. [Mechanical Engineers (17-2141.00)](https://www.onetonline.org/link/summary/17-2141.00) design and test machines or systems, investigate failures, and recommend design changes. | `handsOn: 3`, `creative: 3`, `analytical: 2`, `investigative: 2`, `social: 1`, `leadership: 1` |

The profile weights above remain PathFinder design judgments. This comparison
makes their rationale explicit; it does not calculate weights from O*NET and
does not establish assessment validity.

## Interpretation and limitations

- Multiple fields legitimately share traits. Chemistry and physics both require
  analysis and investigation; mathematics, statistics/data science, and computer
  science all involve quantitative or computational problem-solving. Different
  weights reflect different emphases in typical program descriptions, not
  mutually exclusive kinds of students.
- Environmental Science and Engineering are the broadest labels. Availability
  and naming differ across USG institutions; Scorecard CIP data should be used
  to check what each recommended school actually lists.
- O*NET provides supporting occupational context, not college curricula or
  numerical profile weights. These profiles are for exploration and are not
  validated predictions of major fit.

## Program-description sources

Curriculum themes were informed by representative Georgia public university
catalog pages, not by a school-by-school inventory of all 26 USG institutions:

- [University of Georgia Bulletin](https://bulletin.uga.edu/Program/Index) — Biology, Chemistry, Physics, Mathematics, Statistics, Data Science, Computer Science, and engineering programs.
- [Georgia Southern University degree listings](https://www.georgiasouthern.edu/degrees) — Biology, Chemistry, Physics, Computer Science, Mathematical Sciences, Geosciences, and engineering programs.
- [Georgia State University Geosciences](https://geosciences.gsu.edu/) — Geosciences, environmental concentrations, and related programs.
- O*NET occupation pages linked in the comparison table above.
- NCES, [Classification of Instructional Programs](https://nces.ed.gov/ipeds/cipcode/Default.aspx?y=56).
- U.S. Department of Education, [College Scorecard](https://collegescorecard.ed.gov/) and [`lib/ga-colleges.json`](../lib/ga-colleges.json) for program availability.
- U.S. Department of Labor, [O*NET Interest Profiler](https://www.onetcenter.org/IP.html) and [O*NET OnLine](https://www.onetonline.org/). O*NET information is used under the [O*NET Tools Developer License](https://www.onetcenter.org/license_tools.html).
