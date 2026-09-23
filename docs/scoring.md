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

## Original PathFinder scenarios

These eight scenarios are also included in `lib/pathfinder-data.ts`.

## Scenario 9 — unknown problem

Situation: You're handed a problem you've never seen before, with no clear first step and a deadline that isn't far off.  
Prompt: What's your first move?

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `break-down` | Break it into parts and tackle one piece at a time. | analytical 2, investigative 1 | structured |
| `research` | Research how similar problems were solved before. | investigative 2, analytical 1 | structured |
| `ask-others` | Ask other people for input and think it through together. | social 2, leadership 1 | entrepreneurial |
| `experiment` | Start experimenting hands-on until something works. | handsOn 2, creative 1 | applied |

## Scenario 10 — free saturday

Situation: You have a completely free Saturday and a little bit of money to spend.  
Prompt: What sounds the most fun?

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `build` | Build or fix something in the real world. | handsOn 2, creative 1 | applied |
| `puzzle` | Dig into a puzzle, game, or a topic you're curious about. | investigative 2, analytical 1 | structured |
| `create` | Make art, music, writing, or design something. | creative 2, investigative 1 | entrepreneurial |
| `hangout` | Organize a hangout and spend time with people. | social 2, leadership 1 | entrepreneurial |

## Scenario 11 — group project

Situation: Your group project is falling behind and everyone is looking around unsure what to do.  
Prompt: You naturally end up...

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `lead` | Taking charge and assigning who does what. | leadership 2, social 1 | entrepreneurial |
| `plan` | Mapping out a clear plan and timeline for everyone. | analytical 2, leadership 1 | structured |
| `support` | Quietly helping teammates and keeping the peace. | social 2, handsOn 1 | applied |
| `solve` | Focusing on solving the hardest technical piece yourself. | investigative 2, analytical 1 | structured |

## Scenario 12 — praise

Situation: Think about the last time someone genuinely thanked you for something.  
Prompt: It was most likely because you...

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `explained` | Explained something confusing in a way that finally clicked. | social 2, analytical 1 | structured |
| `fixed` | Fixed or made something that actually worked. | handsOn 2, investigative 1 | applied |
| `idea` | Came up with an original idea nobody else thought of. | creative 2, leadership 1 | entrepreneurial |
| `organized` | Organized chaos into something that ran smoothly. | leadership 2, analytical 1 | structured |

## Scenario 13 — learning style

Situation: You need to learn a brand new skill for something important.  
Prompt: How do you learn it best?

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `course` | A structured course with lessons, steps, and feedback. | analytical 2, investigative 1 | structured |
| `doing` | Jumping in and learning by doing it for real. | handsOn 2, creative 1 | applied |
| `mentor` | Finding a mentor or people who already do it. | social 2, leadership 1 | entrepreneurial |
| `deep-read` | Reading and researching until you deeply understand it. | investigative 2, analytical 1 | structured |

## Scenario 14 — dream impact

Situation: Imagine yourself ten years from now, proud of your work.  
Prompt: What are you most proud of?

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `helped-people` | You've directly helped a lot of people's lives. | social 2, leadership 1 | structured |
| `built-thing` | You built something real that people use every day. | handsOn 2, creative 1 | applied |
| `discovered` | You discovered or figured out something new. | investigative 2, analytical 1 | structured |
| `own-thing` | You built your own company or run your own thing. | leadership 2, creative 1 | entrepreneurial |

## Scenario 15 — money vs. passion

Situation: You're choosing between two job offers after school.  
Prompt: Which pull is stronger for you?

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `stable` | The stable, well-paid, clearly-defined role. | analytical 2, handsOn 1 | structured |
| `meaning` | The role where you'd help people, even for less pay. | social 2, investigative 1 | structured |
| `growth` | The risky role with huge growth and learning potential. | leadership 2, creative 1 | entrepreneurial |
| `flexible` | The flexible role that lets you work with your hands and skills. | handsOn 2, creative 1 | applied |

## Scenario 16 — school feeling

Situation: Be honest about how you feel about traditional classrooms.  
Prompt: Which statement fits you best?

| Option id | User-facing text | Traits | Path |
| --- | --- | --- | --- |
| `love-school` | I do well in school and like structured learning. | analytical 2, investigative 1 | structured |
| `okay-school` | School is fine, but I learn more when it's practical. | handsOn 2, social 1 | applied |
| `restless` | I get restless and would rather be doing real work. | handsOn 2, leadership 1 | applied |
| `self-driven` | I'd rather teach myself and build things my own way. | creative 2, leadership 1 | entrepreneurial |

The quiz shuffles all 16 scenarios and presents eight per run. `generateReport()` scores answers from whichever eight were shown.
