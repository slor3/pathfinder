# STEM major-area trait profiles

## Scope and evidence

PathFinder compares eight broad STEM areas. They are interest-matching profiles,
not a claim that every college offers eight identically named undergraduate
degrees. This distinction matters: the College Scorecard provides CIP program
titles, while university catalogs describe what students study.

Catalog pages reviewed:

- University of Georgia (UGA), [2026–2027 Bulletin program index](https://bulletin.uga.edu/Program/Index), including program descriptions for Biology, Chemistry, Physics, Mathematics, Statistics, Data Science, Computer Science, and individual engineering degrees.
- Georgia Southern University, [degree program listings](https://www.georgiasouthern.edu/degrees), including undergraduate Biology, Chemistry, Physics, Computer Science, Mathematical Sciences, Geosciences, and multiple engineering degrees.
- Georgia State University, [Geosciences programs](https://geosciences.gsu.edu/), describing its B.S. in Geosciences and Environmental Geosciences concentration, plus Environmental Science and Data Science concentrations in the B.I.S.
- U.S. Department of Education, [College Scorecard](https://collegescorecard.ed.gov/) and the checked-in Georgia dataset at [`lib/ga-colleges.json`](../lib/ga-colleges.json), used for school/program availability, not curriculum interpretation.

The three schools do **not** each offer all eight areas as standalone bachelor's
majors. In the reviewed listings, Georgia Southern identifies Environmental
Science as graduate programs, and its undergraduate quantitative degree is
Mathematical Sciences; Georgia State describes Environmental Science and Data
Science as B.I.S. concentrations; UGA has related Earth/environmental and
engineering programs but no separate Environmental Science bachelor's major
in the program results reviewed. Engineering is represented by discipline-specific
degrees, and the checked-in Scorecard snapshot has no CIP 14 engineering
programs listed for Georgia State. The eight labels should therefore be shown
as **major areas to explore**, not verified offerings at every recommended school.

## How to read the weights

The numbers below are PathFinder's provisional relative weights for matching,
not scores published by the universities, College Scorecard, O*NET, or a
validated assessment. A `3` indicates a stronger design association, `2` a
supporting association, and `1` a lighter association. They are based on
activities emphasized in the official program descriptions:

- `analytical`: quantitative reasoning, data analysis, evaluation, and modeling.
- `investigative`: experiments, research, observation, and inference.
- `creative`: design, developing approaches, and constructing solutions.
- `handsOn`: laboratory, field, building, or implementation work.
- `social`: communication, collaboration, and explaining findings.
- `leadership`: responsibility for coordinating or guiding work.

## College-to-O*NET comparison

This crosswalk compares themes in the college descriptions with tasks for
representative occupations listed by O*NET. The O*NET activities are evidence
about related work—not a substitute for major curricula. The final column is
the reasoned link to PathFinder traits, not an O*NET score or a claim that every
graduate will do those tasks.

| Major area | College-description themes | Representative O*NET occupation(s) and activity evidence | What the comparison may support in PathFinder |
| --- | --- | --- | --- |
| Biology | UGA describes studying biological principles and their real-world effects. Georgia Southern highlights biological-science research, lab techniques, critical thinking, and areas including ecology/evolution and cell/molecular biology. | [Biological Technicians (19-4021.00)](https://www.onetonline.org/link/summary/19-4021.00) collect specimens and data, monitor experiments, operate lab equipment, analyze results, and keep records. | The research, observation, and interpretation support **investigative** and **analytical**; specimen and laboratory procedures support **hands-on**. Profile: `investigative: 3`, `analytical: 3`, `handsOn: 2`, `creative: 1`. |
| Chemistry | UGA describes rigorous chemistry study supported by physical science and mathematics. Georgia Southern says its ACS-certified Chemistry B.S. prepares students for chemistry work or advanced study. | [Chemists (19-2031.00)](https://www.onetonline.org/link/summary/19-2031.00) conduct qualitative and quantitative analyses and experiments, characterize compounds, test quality, troubleshoot instruments, and develop products or methods. | Chemical testing supports **analytical** and **investigative**; experiments and instruments support **hands-on**; developing methods/products supports **creative**. Profile: `analytical: 3`, `investigative: 3`, `handsOn: 2`, `creative: 2`. |
| Physics | UGA emphasizes classical and quantum theory, conceptual reasoning, problem-solving, and quantitative modeling. Georgia Southern describes experimental or theoretical research and preparation for advanced study. | [Physicists (19-2012.00)](https://www.onetonline.org/link/summary/19-2012.00) analyze experimental data, perform complex calculations, describe observations mathematically, design simulations, and develop or apply theories. | Calculations and modeling support **analytical**; experiments and theory-building support **investigative**; simulations and new methods support **creative**. Direct hands-on intensity depends on the student's specialization. Profile: `analytical: 3`, `investigative: 3`, `creative: 2`, `handsOn: 1`. |
| Environmental Science | Georgia State describes Environmental Geosciences and Environmental Science concentrations. Georgia Southern and UGA offer related Earth, environmental-engineering, geology, and ecology programs, but the undergraduate program names differ across the schools. | [Environmental Scientists (19-2041.00)](https://www.onetonline.org/link/summary/19-2041.00) collect and analyze air, soil, and water data, investigate pollution, monitor environmental effects, and communicate findings. [Geoscientists (19-2042.00)](https://www.onetonline.org/link/summary/19-2042.00) conduct field studies, collect samples, analyze geological data, and prepare maps or reports. | Field sampling and monitoring support **hands-on** and **investigative**; evaluating data supports **analytical**; communicating findings and environmental recommendations support **social**. Profile: `investigative: 3`, `handsOn: 3`, `analytical: 2`, `social: 2`, `creative: 1`. |
| Mathematics | UGA emphasizes problem-solving, analysis, mathematical modeling, and abstract conceptual thinking. Georgia Southern's Mathematical Sciences B.S. provides a foundation across mathematics. | [Mathematicians (15-2021.00)](https://www.onetonline.org/link/summary/15-2021.00) conduct research, develop mathematical principles, create models, apply methods to practical problems, and communicate research. | Abstract reasoning and solving problems support **analytical**; developing new principles and models supports **creative**; research supports **investigative**. Profile: `analytical: 3`, `creative: 3`, `investigative: 2`, `social: 1`. |
| Statistics / Data Science | UGA describes Statistics through data analysis, statistical theory, computing, and communication; its Data Science B.S. includes databases, algorithms, machine learning, modeling, inference, and visualization. Georgia State lists Data Science as a B.I.S. concentration. | [Statisticians (15-2041.00)](https://www.onetonline.org/link/summary/15-2041.00) select methods, evaluate data quality, identify patterns, interpret results, and communicate findings. [Data Scientists (15-2051.00)](https://www.onetonline.org/link/summary/15-2051.00) process large datasets, test models, create visualizations, and present findings to decision-makers. | Data interpretation supports **analytical** and **investigative**; building/testing models supports **creative**; explaining results supports **social**; computing and processing data provide a light **hands-on** signal. Profile: `analytical: 3`, `investigative: 3`, `creative: 2`, `social: 2`, `handsOn: 1`. |
| Computer Science | UGA describes computing foundations and implementing solutions in programs, including hardware, operating systems, databases, networks, graphics, and AI. Georgia Southern frames the B.S. around applying computing to solve problems and develop new technologies. | [Software Developers (15-1252.00)](https://www.onetonline.org/link/summary/15-1252.00) analyze user needs, design and develop software, test or validate systems, troubleshoot, and coordinate with others on requirements and capabilities. | Requirements analysis supports **analytical**; designing software solutions supports **creative**; testing and troubleshooting support **investigative**; implementation is a light **hands-on** signal and team/user communication supports **social**. Profile: `analytical: 3`, `creative: 3`, `investigative: 2`, `handsOn: 1`, `social: 1`. |
| Engineering | UGA's Mechanical Engineering description emphasizes engineering sciences, design, basic sciences, and professional practice. Georgia Southern descriptions highlight labs, real-world problems, sustainable design, and technical systems; exact disciplines vary. | [Civil Engineers (17-2051.00)](https://www.onetonline.org/link/summary/17-2051.00) calculate design requirements, inspect sites and materials, plan systems, and oversee construction. [Mechanical Engineers (17-2141.00)](https://www.onetonline.org/link/summary/17-2141.00) design and test machines or systems, investigate failures, and recommend design changes. | Designing and improving systems supports **creative**; site, lab, and prototype work supports **hands-on**; calculations and failure analysis support **analytical** and **investigative**; coordination supports lighter **social** and **leadership**. Profile: `handsOn: 3`, `creative: 3`, `analytical: 2`, `investigative: 2`, `social: 1`, `leadership: 1`. |

The current profile weights above remain PathFinder design judgments. The
comparison makes their rationale explicit; it does not calculate the weights
from O*NET, and it does not establish assessment validity.

## Interpretation and limitations

- Multiple fields legitimately share traits. Chemistry and physics both require
  analysis and investigation; mathematics, statistics/data science, and computer
  science all involve quantitative or computational problem-solving. Their
  differentiating weights reflect different emphases in the catalog descriptions,
  not mutually exclusive kinds of students.
- Environmental Science is the clearest availability gap in this three-school
  sample. Its profile draws on related undergraduate Earth/environmental
  programs and listed concentrations, and should not be represented as an
  identical standalone bachelor's major at all three schools.
- Engineering is intentionally a broad area in the app; a mechanical, civil,
  computer, or electrical engineering curriculum can differ substantially.
- O*NET is supporting occupational context, not the source of college curricula
  or numerical profile weights. These profiles are for exploration and are not
  validated predictions of major fit.

## Program-description sources

- UGA Bulletin program pages: [Biology](https://bulletin.uga.edu/Program/Details/45780?IDc=ARTS), [Chemistry](https://bulletin.uga.edu/Program/Details/97290?IDc=ARTS), [Physics](https://bulletin.uga.edu/Program/Details/17511?IDc=ARTS), [Mathematics](https://bulletin.uga.edu/Program/Details/69357?IDc=ARTS), [Statistics](https://bulletin.uga.edu/Program/Details/85325?IDc=ARTS), [Data Science](https://bulletin.uga.edu/Program/Details/35773?IDc=ARTS), [Computer Science](https://bulletin.uga.edu/Program/Details/73962?IDc=ARTS), and [Mechanical Engineering](https://bulletin.uga.edu/Program/Details/20122?IDc=FENGR).
- Georgia Southern University, [degree listings](https://www.georgiasouthern.edu/degrees).
- Georgia State University, [Geosciences programs](https://geosciences.gsu.edu/).
- O*NET occupation task and work-activity pages linked in the comparison table above.
- NCES, [Classification of Instructional Programs](https://nces.ed.gov/ipeds/cipcode/Default.aspx?y=56).
- U.S. Department of Labor, [O*NET Interest Profiler](https://www.onetcenter.org/IP.html) and [O*NET OnLine](https://www.onetonline.org/). O*NET information is used under the [O*NET Tools Developer License](https://www.onetcenter.org/license_tools.html).
