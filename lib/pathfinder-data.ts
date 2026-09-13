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

/** Holland / O*NET Interest Profiler theme. Options are rewritten situations, not copied IP items. */
export type Riasec = "R" | "I" | "A" | "S" | "E" | "C"

export const RIASEC_LABELS: Record<Riasec, string> = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
}

export type ScenarioOption = {
  id: string
  label: string
  traits: Partial<Record<Trait, number>>
  path: PathSignal
  riasec: Riasec
  /** Interest-area theme (not a copied Interest Profiler item). */
  onetTheme: string
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
]

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

export type Region = "Northeast" | "Southeast" | "Midwest" | "Southwest" | "West"

export const REGIONS: Region[] = ["Northeast", "Southeast", "Midwest", "Southwest", "West"]

export type CollegeType = "University" | "Community College" | "Trade School"

export type College = {
  id: string
  name: string
  city: string
  region: Region
  type: CollegeType
  clusters: Cluster[]
  costTier: "$" | "$$" | "$$$"
  rating: number
}

export const COLLEGES: College[] = [
  {
    id: "c1",
    name: "Riverside State University",
    city: "Boston, MA",
    region: "Northeast",
    type: "University",
    clusters: ["stem", "business", "social-sciences", "health"],
    costTier: "$$$",
    rating: 4.4,
  },
  {
    id: "c2",
    name: "Harbor Community College",
    city: "Providence, RI",
    region: "Northeast",
    type: "Community College",
    clusters: ["health", "trades", "business", "education"],
    costTier: "$",
    rating: 4.1,
  },
  {
    id: "c3",
    name: "Metro Institute of Design",
    city: "New York, NY",
    region: "Northeast",
    type: "University",
    clusters: ["arts", "business"],
    costTier: "$$$",
    rating: 4.3,
  },
  {
    id: "c4",
    name: "Sunbelt University",
    city: "Atlanta, GA",
    region: "Southeast",
    type: "University",
    clusters: ["business", "stem", "education", "social-sciences"],
    costTier: "$$",
    rating: 4.2,
  },
  {
    id: "c5",
    name: "Gulf Coast Technical College",
    city: "Tampa, FL",
    region: "Southeast",
    type: "Trade School",
    clusters: ["trades", "health"],
    costTier: "$",
    rating: 4.0,
  },
  {
    id: "c6",
    name: "Great Lakes University",
    city: "Chicago, IL",
    region: "Midwest",
    type: "University",
    clusters: ["stem", "health", "arts", "social-sciences"],
    costTier: "$$",
    rating: 4.5,
  },
  {
    id: "c7",
    name: "Prairie Community College",
    city: "Columbus, OH",
    region: "Midwest",
    type: "Community College",
    clusters: ["trades", "business", "education", "health"],
    costTier: "$",
    rating: 3.9,
  },
  {
    id: "c8",
    name: "Desert Valley University",
    city: "Phoenix, AZ",
    region: "Southwest",
    type: "University",
    clusters: ["stem", "business", "education"],
    costTier: "$$",
    rating: 4.1,
  },
  {
    id: "c9",
    name: "Rio Grande Trade Academy",
    city: "Austin, TX",
    region: "Southwest",
    type: "Trade School",
    clusters: ["trades"],
    costTier: "$",
    rating: 4.2,
  },
  {
    id: "c10",
    name: "Pacific Coast University",
    city: "San Francisco, CA",
    region: "West",
    type: "University",
    clusters: ["stem", "arts", "business", "social-sciences"],
    costTier: "$$$",
    rating: 4.6,
  },
  {
    id: "c11",
    name: "Cascade Community College",
    city: "Portland, OR",
    region: "West",
    type: "Community College",
    clusters: ["arts", "trades", "health", "education"],
    costTier: "$",
    rating: 4.0,
  },
  {
    id: "c12",
    name: "Bayview Culinary & Hospitality Institute",
    city: "Seattle, WA",
    region: "West",
    type: "Trade School",
    clusters: ["trades", "business"],
    costTier: "$$",
    rating: 4.3,
  },
]
