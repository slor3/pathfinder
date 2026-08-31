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

export type ScenarioOption = {
  id: string
  label: string
  traits: Partial<Record<Trait, number>>
  path: PathSignal
}

export type Scenario = {
  id: string
  situation: string
  prompt: string
  options: ScenarioOption[]
}

export const SCENARIOS: Scenario[] = [
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
