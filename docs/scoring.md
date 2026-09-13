# Quiz scoring matrix (PAT-13)

Every option users can pick, with the research mapping `generateReport()` reads. User-facing copy is original PathFinder wording. Primary RIASEC is an O\*NET Interest Profiler **theme**, not a copied Like/Dislike item. Example themes describe the interest area; they are not Interest Profiler questionnaire text.

Trait mapping from PAT-13:

| PathFinder trait | RIASEC |
| --- | --- |
| Hands-on | Realistic (R) |
| Investigative | Investigative (I) |
| Creative | Artistic (A) |
| People-focused (`social`) | Social (S) |
| Leadership | Enterprising (E) |
| Analytical | Conventional (C) + Investigative (I) |

Sources: [O\*NET Interest Profiler](https://www.onetcenter.org/IP.html), [60-item PDF](https://www.onetcenter.org/dl_tools/ipsf/Interest_Profiler.pdf), [license](https://www.onetcenter.org/license_tools.html).

This page includes information from the O\*NET Career Exploration Tools by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the [O\*NET Tools Developer License](https://www.onetcenter.org/license_tools.html). PathFinder has modified this information into original scenarios. USDOL/ETA has not approved, endorsed, or tested these modifications. O\*NET® is a trademark of USDOL/ETA.

Trait weights: primary = 2, secondary = 1. Path is `structured` | `applied` | `entrepreneurial`.

## Scenario 1 — makerspace leftover

Situation: A school makerspace left a half-finished project on the bench: parts in a bin, a rough sketch on the wall, and two hours before the room closes. Prompt: What's your first move?

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `assemble` | Start putting the pieces together and see what actually fits. | R Realistic | Building or repairing equipment and materials | handsOn 2, creative 1 | applied |
| `look-up` | Figure out how this kind of mechanism is supposed to work before touching it. | I Investigative | Studying how systems work and testing ideas | investigative 2, analytical 1 | structured |
| `huddle` | Ask who started it, what they wanted, and regroup the group around a goal. | S Social | Teaching, advising, or supporting people | social 2, leadership 1 | entrepreneurial |
| `checklist` | Sort the parts, write a short checklist, and work the steps in order. | C Conventional | Organizing information and following a clear process | analytical 2, investigative 1 | structured |

## Scenario 2 — elective pick

Situation: You get one free elective this term. Four sections still have seats. Prompt: Which class do you take?

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `studio` | A studio where you design, draw, write, or compose original work. | A Artistic | Designing or composing original work | creative 2, handsOn 1 | entrepreneurial |
| `lab` | A lab that investigates a question with experiments and write-ups. | I Investigative | Studying how systems work and testing ideas | investigative 2, analytical 1 | structured |
| `peer-coach` | A seminar where you coach younger students through a tough subject. | S Social | Teaching, advising, or supporting people | social 2, leadership 1 | structured |
| `shop` | A shop course that builds and troubleshoots real equipment. | R Realistic | Building or repairing equipment and materials | handsOn 2, analytical 1 | applied |

## Scenario 3 — group stalled

Situation: Your group project is stalled and nobody has spoken in a full minute. Prompt: You naturally end up...

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `rally` | Taking the lead: names, tasks, and a time you will check back. | E Enterprising | Leading a group or promoting an idea | leadership 2, social 1 | entrepreneurial |
| `timeline` | Building a timeline and a shared list so the work has an order. | C Conventional | Organizing information and following a clear process | analytical 2, leadership 1 | structured |
| `support` | Checking in with whoever looks stuck and helping them finish a piece. | S Social | Teaching, advising, or supporting people | social 2, handsOn 1 | applied |
| `hard-piece` | Pulling the hardest technical question and working it yourself. | I Investigative | Studying how systems work and testing ideas | investigative 2, analytical 1 | structured |

## Scenario 4 — learn by Friday

Situation: You have to get comfortable with a new tool by Friday for something that actually matters. Prompt: How do you start?

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `lessons` | Follow a structured set of lessons with practice and feedback. | C Conventional | Organizing information and following a clear process | analytical 2, investigative 1 | structured |
| `tinker` | Open the tool and learn by making something messy that works. | R Realistic | Building or repairing equipment and materials | handsOn 2, creative 1 | applied |
| `mockup` | Sketch what “done” should look like before you touch the software. | A Artistic | Designing or composing original work | creative 2, investigative 1 | entrepreneurial |
| `read-up` | Read how it works until you can explain the idea, then try it. | I Investigative | Studying how systems work and testing ideas | investigative 2, analytical 1 | structured |

## Scenario 5 — summer offer

Situation: Four summer options pay about the same. You can only pick one. Prompt: Which one do you take?

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `site-crew` | A crew that installs, repairs, or runs equipment on a real site. | R Realistic | Building or repairing equipment and materials | handsOn 2, investigative 1 | applied |
| `help-desk-people` | A role where you help people through problems all day. | S Social | Teaching, advising, or supporting people | social 2, handsOn 1 | structured |
| `campaign` | Helping run a campaign, club, or small operation and talking people into joining. | E Enterprising | Leading a group or promoting an idea | leadership 2, creative 1 | entrepreneurial |
| `records` | Keeping records, schedules, and details accurate for a busy office. | C Conventional | Organizing information and following a clear process | analytical 2, investigative 1 | structured |

## Scenario 6 — campus showcase

Situation: Your school is putting on a public showcase next month and asks you to help. Prompt: Where do you spend your energy?

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `exhibit` | Designing how the space looks, sounds, or tells a story. | A Artistic | Designing or composing original work | creative 2, investigative 1 | entrepreneurial |
| `demo-build` | Building a working demo people can touch. | R Realistic | Building or repairing equipment and materials | handsOn 2, creative 1 | applied |
| `hosts` | Training hosts so visitors feel welcome and get clear answers. | S Social | Teaching, advising, or supporting people | social 2, leadership 1 | structured |
| `run-booth` | Running a booth: pitching, deciding, and keeping the line moving. | E Enterprising | Leading a group or promoting an idea | leadership 2, social 1 | entrepreneurial |

## Scenario 7 — open brief

Situation: A teacher (or supervisor) drops an open-ended brief on your desk: “We need a better way to do this. Come back with something.” Prompt: What do you do first?

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `try-physical` | Build a rough physical version and iterate until it behaves. | R Realistic | Building or repairing equipment and materials | handsOn 2, creative 1 | applied |
| `prior-art` | Look up how similar problems have been studied and write down what you found. | I Investigative | Studying how systems work and testing ideas | investigative 2, analytical 1 | structured |
| `visual-first` | Draft a visual or written concept so the idea is easy to react to. | A Artistic | Designing or composing original work | creative 2, handsOn 1 | entrepreneurial |
| `track-it` | Turn the brief into a tracked list of requirements and owners. | C Conventional | Organizing information and following a clear process | analytical 2, leadership 1 | structured |

## Scenario 8 — ten-year mark

Situation: Picture yourself ten years from now, proud of the work you do most weeks. Prompt: What are you most proud of?

| Option id | User-facing text | Primary RIASEC | Example O\*NET activity theme | Traits | Path |
| --- | --- | --- | --- | --- | --- |
| `helped-people` | You helped people through hard moments, in person, over and over. | S Social | Teaching, advising, or supporting people | social 2, leadership 1 | structured |
| `built-thing` | You built or kept running something physical that people rely on. | R Realistic | Building or repairing equipment and materials | handsOn 2, creative 1 | applied |
| `figured-out` | You figured out something that was not obvious and could show your work. | I Investigative | Studying how systems work and testing ideas | investigative 2, analytical 1 | structured |
| `own-operation` | You started or ran an operation and made the calls. | E Enterprising | Leading a group or promoting an idea | leadership 2, creative 1 | entrepreneurial |

## Coverage

| RIASEC | Option count |
| --- | ---: |
| R Realistic | 7 |
| I Investigative | 6 |
| A Artistic | 4 |
| S Social | 6 |
| E Enterprising | 4 |
| C Conventional | 5 |
| **Total** | **32** |
