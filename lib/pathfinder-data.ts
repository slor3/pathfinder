export type Trait =
  | "analytical"
  | "creative"
  | "social"
  | "handsOn"
  | "leadership"
  | "investigative"

export const TRAIT_LABELS: Record<Trait, string> = {
  analytical: "Analytical",
  creative: "Creative",
  social: "People-focused",
  handsOn: "Hands-on",
  leadership: "Leadership",
  investigative: "Investigative",
}

export type PathSignal = "structured" | "applied" | "entrepreneurial"

export type Riasec = "R" | "I" | "A" | "S" | "E" | "C"
export type ScenarioOption = {
  id: string
  label: string
  traits: Partial<Record<Trait, number>>
  path: PathSignal
  riasec?: Riasec
  onetTheme?: string
}

export type Scenario = {
  id: string
  situation: string
  prompt: string
  options: ScenarioOption[]
}

export const SCENARIOS: Scenario[] = [
{
    id: "makerspace-leftover",
    situation:
      "A school makerspace left a half-finished project on the bench: parts in a bin, a rough sketch on the wall, and two hours before the room closes.",
    prompt: "What's your first move?",
    options: [
      {
        id: "assemble",
        label: "Start putting the pieces together and see what actually fits.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
        riasec: "R",
        onetTheme: "Building or repairing equipment and materials",
      },
      {
        id: "look-up",
        label: "Figure out how this kind of mechanism is supposed to work before touching it.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
        riasec: "I",
        onetTheme: "Studying how systems work and testing ideas",
      },
      {
        id: "huddle",
        label: "Ask who started it, what they wanted, and regroup the group around a goal.",
        traits: { social: 2, leadership: 1 },
        path: "entrepreneurial",
        riasec: "S",
        onetTheme: "Teaching, advising, or supporting people",
      },
      {
        id: "checklist",
        label: "Sort the parts, write a short checklist, and work the steps in order.",
        traits: { analytical: 2, investigative: 1 },
        path: "structured",
        riasec: "C",
        onetTheme: "Organizing information and following a clear process",
      },
    ],
  },
  {
    id: "elective-pick",
    situation: "You get one free elective this term. Four sections still have seats.",
    prompt: "Which class do you take?",
    options: [
      {
        id: "studio",
        label: "A studio where you design, draw, write, or compose original work.",
        traits: { creative: 2, handsOn: 1 },
        path: "entrepreneurial",
        riasec: "A",
        onetTheme: "Designing or composing original work",
      },
      {
        id: "lab",
        label: "A lab that investigates a question with experiments and write-ups.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
        riasec: "I",
        onetTheme: "Studying how systems work and testing ideas",
      },
      {
        id: "peer-coach",
        label: "A seminar where you coach younger students through a tough subject.",
        traits: { social: 2, leadership: 1 },
        path: "structured",
        riasec: "S",
        onetTheme: "Teaching, advising, or supporting people",
      },
      {
        id: "shop",
        label: "A shop course that builds and troubleshoots real equipment.",
        traits: { handsOn: 2, analytical: 1 },
        path: "applied",
        riasec: "R",
        onetTheme: "Building or repairing equipment and materials",
      },
    ],
  },
  {
    id: "group-stalled",
    situation: "Your group project is stalled and nobody has spoken in a full minute.",
    prompt: "You naturally end up...",
    options: [
      {
        id: "rally",
        label: "Taking the lead: names, tasks, and a time you will check back.",
        traits: { leadership: 2, social: 1 },
        path: "entrepreneurial",
        riasec: "E",
        onetTheme: "Leading a group or promoting an idea",
      },
      {
        id: "timeline",
        label: "Building a timeline and a shared list so the work has an order.",
        traits: { analytical: 2, leadership: 1 },
        path: "structured",
        riasec: "C",
        onetTheme: "Organizing information and following a clear process",
      },
      {
        id: "support",
        label: "Checking in with whoever looks stuck and helping them finish a piece.",
        traits: { social: 2, handsOn: 1 },
        path: "applied",
        riasec: "S",
        onetTheme: "Teaching, advising, or supporting people",
      },
      {
        id: "hard-piece",
        label: "Pulling the hardest technical question and working it yourself.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
        riasec: "I",
        onetTheme: "Studying how systems work and testing ideas",
      },
    ],
  },
  {
    id: "learn-by-friday",
    situation: "You have to get comfortable with a new tool by Friday for something that actually matters.",
    prompt: "How do you start?",
    options: [
      {
        id: "lessons",
        label: "Follow a structured set of lessons with practice and feedback.",
        traits: { analytical: 2, investigative: 1 },
        path: "structured",
        riasec: "C",
        onetTheme: "Organizing information and following a clear process",
      },
      {
        id: "tinker",
        label: "Open the tool and learn by making something messy that works.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
        riasec: "R",
        onetTheme: "Building or repairing equipment and materials",
      },
      {
        id: "mockup",
        label: 'Sketch what "done" should look like before you touch the software.',
        traits: { creative: 2, investigative: 1 },
        path: "entrepreneurial",
        riasec: "A",
        onetTheme: "Designing or composing original work",
      },
      {
        id: "read-up",
        label: "Read how it works until you can explain the idea, then try it.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
        riasec: "I",
        onetTheme: "Studying how systems work and testing ideas",
      },
    ],
  },
  {
    id: "summer-offer",
    situation: "Four summer options pay about the same. You can only pick one.",
    prompt: "Which one do you take?",
    options: [
      {
        id: "site-crew",
        label: "A crew that installs, repairs, or runs equipment on a real site.",
        traits: { handsOn: 2, investigative: 1 },
        path: "applied",
        riasec: "R",
        onetTheme: "Building or repairing equipment and materials",
      },
      {
        id: "help-desk-people",
        label: "A role where you help people through problems all day.",
        traits: { social: 2, handsOn: 1 },
        path: "structured",
        riasec: "S",
        onetTheme: "Teaching, advising, or supporting people",
      },
      {
        id: "campaign",
        label: "Helping run a campaign, club, or small operation and talking people into joining.",
        traits: { leadership: 2, creative: 1 },
        path: "entrepreneurial",
        riasec: "E",
        onetTheme: "Leading a group or promoting an idea",
      },
      {
        id: "records",
        label: "Keeping records, schedules, and details accurate for a busy office.",
        traits: { analytical: 2, investigative: 1 },
        path: "structured",
        riasec: "C",
        onetTheme: "Organizing information and following a clear process",
      },
    ],
  },
  {
    id: "campus-showcase",
    situation: "Your school is putting on a public showcase next month and asks you to help.",
    prompt: "Where do you spend your energy?",
    options: [
      {
        id: "exhibit",
        label: "Designing how the space looks, sounds, or tells a story.",
        traits: { creative: 2, investigative: 1 },
        path: "entrepreneurial",
        riasec: "A",
        onetTheme: "Designing or composing original work",
      },
      {
        id: "demo-build",
        label: "Building a working demo people can touch.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
        riasec: "R",
        onetTheme: "Building or repairing equipment and materials",
      },
      {
        id: "hosts",
        label: "Training hosts so visitors feel welcome and get clear answers.",
        traits: { social: 2, leadership: 1 },
        path: "structured",
        riasec: "S",
        onetTheme: "Teaching, advising, or supporting people",
      },
      {
        id: "run-booth",
        label: "Running a booth: pitching, deciding, and keeping the line moving.",
        traits: { leadership: 2, social: 1 },
        path: "entrepreneurial",
        riasec: "E",
        onetTheme: "Leading a group or promoting an idea",
      },
    ],
  },
  {
    id: "open-brief",
    situation:
      'A teacher (or supervisor) drops an open-ended brief on your desk: "We need a better way to do this. Come back with something."',
    prompt: "What do you do first?",
    options: [
      {
        id: "try-physical",
        label: "Build a rough physical version and iterate until it behaves.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
        riasec: "R",
        onetTheme: "Building or repairing equipment and materials",
      },
      {
        id: "prior-art",
        label: "Look up how similar problems have been studied and write down what you found.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
        riasec: "I",
        onetTheme: "Studying how systems work and testing ideas",
      },
      {
        id: "visual-first",
        label: "Draft a visual or written concept so the idea is easy to react to.",
        traits: { creative: 2, handsOn: 1 },
        path: "entrepreneurial",
        riasec: "A",
        onetTheme: "Designing or composing original work",
      },
      {
        id: "track-it",
        label: "Turn the brief into a tracked list of requirements and owners.",
        traits: { analytical: 2, leadership: 1 },
        path: "structured",
        riasec: "C",
        onetTheme: "Organizing information and following a clear process",
      },
    ],
  },
  {
    id: "ten-year-mark",
    situation: "Picture yourself ten years from now, proud of the work you do most weeks.",
    prompt: "What are you most proud of?",
    options: [
      {
        id: "helped-people",
        label: "You helped people through hard moments, in person, over and over.",
        traits: { social: 2, leadership: 1 },
        path: "structured",
        riasec: "S",
        onetTheme: "Teaching, advising, or supporting people",
      },
      {
        id: "built-thing",
        label: "You built or kept running something physical that people rely on.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
        riasec: "R",
        onetTheme: "Building or repairing equipment and materials",
      },
      {
        id: "figured-out",
        label: "You figured out something that was not obvious and could show your work.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
        riasec: "I",
        onetTheme: "Studying how systems work and testing ideas",
      },
      {
        id: "own-operation",
        label: "You started or ran an operation and made the calls.",
        traits: { leadership: 2, creative: 1 },
        path: "entrepreneurial",
        riasec: "E",
        onetTheme: "Leading a group or promoting an idea",
      },
    ],
  },
{
    id: "unknown-problem",
    situation:
      "You're handed a problem you've never seen before, with no clear first step and a deadline that isn't far off.",
    prompt: "What's your first move?",
    options: [
      {
        id: "break-down",
        label: "Break it into parts and tackle one piece at a time.",
        traits: { analytical: 2, investigative: 1 },
        path: "structured",
      },
      {
        id: "research",
        label: "Research how similar problems were solved before.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
      },
      {
        id: "ask-others",
        label: "Ask other people for input and think it through together.",
        traits: { social: 2, leadership: 1 },
        path: "entrepreneurial",
      },
      {
        id: "experiment",
        label: "Start experimenting hands-on until something works.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
      },
    ],
  },
  {
    id: "free-saturday",
    situation: "You have a completely free Saturday and a little bit of money to spend.",
    prompt: "What sounds the most fun?",
    options: [
      {
        id: "build",
        label: "Build or fix something in the real world.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
      },
      {
        id: "puzzle",
        label: "Dig into a puzzle, game, or a topic you're curious about.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
      },
      {
        id: "create",
        label: "Make art, music, writing, or design something.",
        traits: { creative: 2, investigative: 1 },
        path: "entrepreneurial",
      },
      {
        id: "hangout",
        label: "Organize a hangout and spend time with people.",
        traits: { social: 2, leadership: 1 },
        path: "entrepreneurial",
      },
    ],
  },
  {
    id: "group-project",
    situation: "Your group project is falling behind and everyone is looking around unsure what to do.",
    prompt: "You naturally end up...",
    options: [
      {
        id: "lead",
        label: "Taking charge and assigning who does what.",
        traits: { leadership: 2, social: 1 },
        path: "entrepreneurial",
      },
      {
        id: "plan",
        label: "Mapping out a clear plan and timeline for everyone.",
        traits: { analytical: 2, leadership: 1 },
        path: "structured",
      },
      {
        id: "support",
        label: "Quietly helping teammates and keeping the peace.",
        traits: { social: 2, handsOn: 1 },
        path: "applied",
      },
      {
        id: "solve",
        label: "Focusing on solving the hardest technical piece yourself.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
      },
    ],
  },
  {
    id: "praise",
    situation: "Think about the last time someone genuinely thanked you for something.",
    prompt: "It was most likely because you...",
    options: [
      {
        id: "explained",
        label: "Explained something confusing in a way that finally clicked.",
        traits: { social: 2, analytical: 1 },
        path: "structured",
      },
      {
        id: "fixed",
        label: "Fixed or made something that actually worked.",
        traits: { handsOn: 2, investigative: 1 },
        path: "applied",
      },
      {
        id: "idea",
        label: "Came up with an original idea nobody else thought of.",
        traits: { creative: 2, leadership: 1 },
        path: "entrepreneurial",
      },
      {
        id: "organized",
        label: "Organized chaos into something that ran smoothly.",
        traits: { leadership: 2, analytical: 1 },
        path: "structured",
      },
    ],
  },
  {
    id: "learning-style",
    situation: "You need to learn a brand new skill for something important.",
    prompt: "How do you learn it best?",
    options: [
      {
        id: "course",
        label: "A structured course with lessons, steps, and feedback.",
        traits: { analytical: 2, investigative: 1 },
        path: "structured",
      },
      {
        id: "doing",
        label: "Jumping in and learning by doing it for real.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
      },
      {
        id: "mentor",
        label: "Finding a mentor or people who already do it.",
        traits: { social: 2, leadership: 1 },
        path: "entrepreneurial",
      },
      {
        id: "deep-read",
        label: "Reading and researching until you deeply understand it.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
      },
    ],
  },
  {
    id: "dream-impact",
    situation: "Imagine yourself ten years from now, proud of your work.",
    prompt: "What are you most proud of?",
    options: [
      {
        id: "helped-people",
        label: "You've directly helped a lot of people's lives.",
        traits: { social: 2, leadership: 1 },
        path: "structured",
      },
      {
        id: "built-thing",
        label: "You built something real that people use every day.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
      },
      {
        id: "discovered",
        label: "You discovered or figured out something new.",
        traits: { investigative: 2, analytical: 1 },
        path: "structured",
      },
      {
        id: "own-thing",
        label: "You built your own company or run your own thing.",
        traits: { leadership: 2, creative: 1 },
        path: "entrepreneurial",
      },
    ],
  },
  {
    id: "money-vs-passion",
    situation: "You're choosing between two job offers after school.",
    prompt: "Which pull is stronger for you?",
    options: [
      {
        id: "stable",
        label: "The stable, well-paid, clearly-defined role.",
        traits: { analytical: 2, handsOn: 1 },
        path: "structured",
      },
      {
        id: "meaning",
        label: "The role where you'd help people, even for less pay.",
        traits: { social: 2, investigative: 1 },
        path: "structured",
      },
      {
        id: "growth",
        label: "The risky role with huge growth and learning potential.",
        traits: { leadership: 2, creative: 1 },
        path: "entrepreneurial",
      },
      {
        id: "flexible",
        label: "The flexible role that lets you work with your hands and skills.",
        traits: { handsOn: 2, creative: 1 },
        path: "applied",
      },
    ],
  },
  {
    id: "school-feeling",
    situation: "Be honest about how you feel about traditional classrooms.",
    prompt: "Which statement fits you best?",
    options: [
      {
        id: "love-school",
        label: "I do well in school and like structured learning.",
        traits: { analytical: 2, investigative: 1 },
        path: "structured",
      },
      {
        id: "okay-school",
        label: "School is fine, but I learn more when it's practical.",
        traits: { handsOn: 2, social: 1 },
        path: "applied",
      },
      {
        id: "restless",
        label: "I get restless and would rather be doing real work.",
        traits: { handsOn: 2, leadership: 1 },
        path: "applied",
      },
      {
        id: "self-driven",
        label: "I'd rather teach myself and build things my own way.",
        traits: { creative: 2, leadership: 1 },
        path: "entrepreneurial",
      },
    ],
  }
]

export const QUIZ_SIZE = 8

export function getRandomizedQuizQuestions(): Scenario[] {
  const shuffled = [...SCENARIOS]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }

  return shuffled.slice(0, QUIZ_SIZE)
}

export type Cluster =
  | "stem"
  | "health"
  | "business"
  | "arts"
  | "trades"
  | "social-sciences"
  | "education"

export type Major = {
  id: string
  name: string
  cluster: Cluster
  blurb: string
  careers: string[]
  profile: Partial<Record<Trait, number>>
}

export const MAJORS: Major[] = [
  {
    id: "cs",
    name: "Computer Science",
    cluster: "stem",
    blurb: "Design software and solve problems with logic and code.",
    careers: ["Software Engineer", "Data Scientist", "AI Researcher"],
    profile: { analytical: 3, investigative: 2, creative: 1 },
  },
  {
    id: "engineering",
    name: "Engineering",
    cluster: "stem",
    blurb: "Apply math and science to build systems that work in the real world.",
    careers: ["Mechanical Engineer", "Civil Engineer", "Robotics Engineer"],
    profile: { analytical: 3, handsOn: 2, investigative: 1 },
  },
  {
    id: "nursing",
    name: "Nursing & Health Sciences",
    cluster: "health",
    blurb: "Care for people directly with a mix of science and empathy.",
    careers: ["Registered Nurse", "Physician Assistant", "Physical Therapist"],
    profile: { social: 3, handsOn: 2, analytical: 1 },
  },
  {
    id: "psychology",
    name: "Psychology",
    cluster: "social-sciences",
    blurb: "Understand how people think, feel, and behave.",
    careers: ["Counselor", "Therapist", "HR Specialist"],
    profile: { social: 3, investigative: 2, analytical: 1 },
  },
  {
    id: "business",
    name: "Business & Management",
    cluster: "business",
    blurb: "Lead teams, run operations, and turn ideas into ventures.",
    careers: ["Product Manager", "Operations Lead", "Founder"],
    profile: { leadership: 3, social: 2, analytical: 1 },
  },
  {
    id: "marketing",
    name: "Marketing & Communications",
    cluster: "business",
    blurb: "Blend creativity and strategy to tell stories that move people.",
    careers: ["Brand Strategist", "Content Lead", "Social Media Manager"],
    profile: { creative: 3, social: 2, leadership: 1 },
  },
  {
    id: "design",
    name: "Design & Digital Media",
    cluster: "arts",
    blurb: "Create visual and interactive experiences people love to use.",
    careers: ["UX Designer", "Graphic Designer", "Motion Designer"],
    profile: { creative: 3, investigative: 1, handsOn: 2 },
  },
  {
    id: "fine-arts",
    name: "Fine & Performing Arts",
    cluster: "arts",
    blurb: "Express ideas through art, music, film, or performance.",
    careers: ["Artist", "Musician", "Filmmaker"],
    profile: { creative: 3, handsOn: 1, social: 1 },
  },
  {
    id: "education",
    name: "Education & Teaching",
    cluster: "education",
    blurb: "Help others learn and grow at every stage of life.",
    careers: ["Teacher", "Curriculum Designer", "School Counselor"],
    profile: { social: 3, leadership: 2, analytical: 1 },
  },
  {
    id: "skilled-trades",
    name: "Skilled Trades & Technology",
    cluster: "trades",
    blurb: "Build, repair, and run the systems the world depends on.",
    careers: ["Electrician", "HVAC Technician", "Welder"],
    profile: { handsOn: 3, analytical: 1, investigative: 1 },
  },
  {
    id: "culinary",
    name: "Culinary & Hospitality",
    cluster: "trades",
    blurb: "Create experiences and run hands-on, people-facing businesses.",
    careers: ["Chef", "Hospitality Manager", "Baker"],
    profile: { handsOn: 3, creative: 2, social: 1 },
  },
  {
    id: "biology",
    name: "Biology & Life Sciences",
    cluster: "stem",
    blurb: "Investigate living systems, from cells to ecosystems.",
    careers: ["Researcher", "Lab Scientist", "Pre-Med"],
    profile: { investigative: 3, analytical: 2, social: 1 },
  },
]

export const CLUSTER_LABELS: Record<Cluster, string> = {
  stem: "STEM",
  health: "Health",
  business: "Business",
  arts: "Arts & Media",
  trades: "Skilled Trades",
  "social-sciences": "Social Sciences",
  education: "Education",
}

import gaCollegesData from "./ga-colleges.json"

/** PathFinder is scoped to Georgia public 4-year colleges (PAT-17). */
export type Region = "Georgia"

export const GEORGIA_REGION: Region = "Georgia"

export type StemProgram = {
  code: string
  title: string
}

export type College = {
  id: string
  name: string
  city: string
  inStateTuition: number | null
  completionRate: number | null
  studentSize: number | null
  stemCipCodes: string[]
  stemPrograms: StemProgram[]
}

/** GA public 4-year institutions from College Scorecard (refreshed via scripts/fetch-ga-colleges.mjs). */
export const COLLEGES: College[] = gaCollegesData.schools