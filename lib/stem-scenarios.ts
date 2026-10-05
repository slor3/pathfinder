import type { Scenario } from "./pathfinder-data"

export const SCENARIOS: Scenario[] = [
  {
    id: "stream-health",
    situation: "Your class is investigating why a local stream's water looks different after heavy rain.",
    prompt: "Which part of the investigation would you most want to take on?",
    options: [
      { id: "collect-samples", label: "Collect samples and set up field equipment.", traits: { handsOn: 2, investigative: 1 }, path: "applied", riasec: "R", onetTheme: "Working with equipment and collecting field samples" },
      { id: "test-samples", label: "Test the samples and look for possible causes.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Studying evidence and testing explanations" },
      { id: "explain-results", label: "Explain the results to community members.", traits: { social: 2, leadership: 1 }, path: "structured", riasec: "S", onetTheme: "Explaining information and helping others understand" },
      { id: "organize-readings", label: "Organize readings in a table and check them for consistency.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Organizing information and checking records" },
    ],
  },
  {
    id: "robot-challenge",
    situation: "A student-built robot can move, but it misses its target during a competition.",
    prompt: "What would you most like to do next?",
    options: [
      { id: "adjust-mechanism", label: "Inspect its parts and adjust the mechanism.", traits: { handsOn: 2, analytical: 1 }, path: "applied", riasec: "R", onetTheme: "Inspecting, building, and adjusting equipment" },
      { id: "run-diagnostics", label: "Run tests to find out what is causing the error.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Testing systems and diagnosing problems" },
      { id: "redesign-controls", label: "Redesign its appearance and controls so it's easier to use.", traits: { creative: 2, handsOn: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Designing an original, usable product" },
      { id: "record-tests", label: "Record each test and organize the results.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Recording and organizing test information" },
    ],
  },
  {
    id: "clinic-wait-times",
    situation: "A clinic wants to understand why some patients wait longer than others.",
    prompt: "Which task sounds most interesting?",
    options: [
      { id: "find-patterns", label: "Look for patterns in appointment data.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Analyzing data to identify patterns" },
      { id: "check-records", label: "Check records for missing or inconsistent information.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Checking records for accuracy and completeness" },
      { id: "talk-with-staff", label: "Talk with staff to understand what happens during a busy day.", traits: { social: 2, investigative: 1 }, path: "applied", riasec: "S", onetTheme: "Interviewing and supporting people" },
      { id: "trial-change", label: "Propose a change and coordinate a small trial.", traits: { leadership: 2, social: 1 }, path: "entrepreneurial", riasec: "E", onetTheme: "Leading a project and coordinating a team" },
    ],
  },
  {
    id: "solar-shelter",
    situation: "Your team is designing a small solar-powered shelter for a community garden.",
    prompt: "Which role would you choose?",
    options: [
      { id: "install-panels", label: "Install the panels and test the wiring.", traits: { handsOn: 2, analytical: 1 }, path: "applied", riasec: "R", onetTheme: "Installing and testing equipment" },
      { id: "compare-output", label: "Compare energy output under different conditions.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Comparing measurements and testing conditions" },
      { id: "design-shelter", label: "Create a design that fits the garden and its visitors.", traits: { creative: 2, handsOn: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Creating a functional design" },
      { id: "coordinate-proposal", label: "Coordinate the team's tasks and present the proposal.", traits: { leadership: 2, social: 1 }, path: "entrepreneurial", riasec: "E", onetTheme: "Leading a team and presenting a proposal" },
    ],
  },
  {
    id: "accessible-campus-app",
    situation: "A team is improving a campus app so students can find accessible routes between buildings.",
    prompt: "Which contribution appeals to you most?",
    options: [
      { id: "sketch-map", label: "Sketch a clearer map and screen layout.", traits: { creative: 2, analytical: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Designing clear visual information" },
      { id: "test-route-data", label: "Test the app and investigate where the route data fails.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Testing software and investigating errors" },
      { id: "ask-students", label: "Ask students about the barriers they encounter.", traits: { social: 2, investigative: 1 }, path: "applied", riasec: "S", onetTheme: "Listening to people and understanding their needs" },
      { id: "organize-routes", label: "Organize building and route information so it stays accurate.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Organizing and maintaining accurate information" },
    ],
  },
  {
    id: "crop-growth-study",
    situation: "A school garden is testing which conditions help seedlings grow.",
    prompt: "Which activity would you be most interested in?",
    options: [
      { id: "prepare-soil", label: "Prepare soil and set up the growing conditions.", traits: { handsOn: 2, investigative: 1 }, path: "applied", riasec: "R", onetTheme: "Preparing materials and working with plants" },
      { id: "compare-growth", label: "Compare growth measurements to see what affected the results.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Analyzing measurements and studying results" },
      { id: "teach-volunteers", label: "Work with garden volunteers and show them how to collect observations.", traits: { social: 2, leadership: 1 }, path: "applied", riasec: "S", onetTheme: "Teaching and helping people collect information" },
      { id: "plan-study", label: "Plan the study schedule and organize everyone's work.", traits: { leadership: 2, analytical: 1 }, path: "entrepreneurial", riasec: "E", onetTheme: "Organizing a project and coordinating people" },
    ],
  },
  {
    id: "new-material",
    situation: "A design team needs a lightweight material for a reusable water bottle.",
    prompt: "Which part of the project would you pick?",
    options: [
      { id: "make-samples", label: "Make and handle sample materials to see how they behave.", traits: { handsOn: 2, investigative: 1 }, path: "applied", riasec: "R", onetTheme: "Making and handling material samples" },
      { id: "test-strength", label: "Test strength and compare results across samples.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Testing materials and comparing evidence" },
      { id: "design-bottle", label: "Develop a shape and appearance that people would want to use.", traits: { creative: 2, handsOn: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Designing an appealing product" },
      { id: "document-testing", label: "Document the testing steps so another team can repeat them.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Documenting procedures and organizing information" },
    ],
  },
  {
    id: "cybersecurity-incident",
    situation: "A school notices unusual activity on its computer network and asks a student team to help investigate.",
    prompt: "What would you be most interested in doing?",
    options: [
      { id: "analyze-logs", label: "Examine system logs to look for suspicious patterns.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Analyzing information to identify unusual patterns" },
      { id: "document-incident", label: "Follow a checklist to document what happened and when.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Following procedures and maintaining records" },
      { id: "explain-safety", label: "Explain safe account practices to students and staff.", traits: { social: 2, leadership: 1 }, path: "applied", riasec: "S", onetTheme: "Teaching and advising people" },
      { id: "organize-response", label: "Organize a response plan and assign follow-up tasks.", traits: { leadership: 2, analytical: 1 }, path: "entrepreneurial", riasec: "E", onetTheme: "Leading a response and coordinating tasks" },
    ],
  },
  {
    id: "medical-device",
    situation: "A team is testing a handheld device that helps nurses measure a patient's vital signs.",
    prompt: "Which task would you most like to do?",
    options: [
      { id: "assemble-device", label: "Assemble the device and check that its parts work together.", traits: { handsOn: 2, analytical: 1 }, path: "applied", riasec: "R", onetTheme: "Assembling equipment and checking components" },
      { id: "test-readings", label: "Run tests to find out why some readings seem inaccurate.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Testing a device and diagnosing inaccurate results" },
      { id: "clarify-instructions", label: "Make the instructions clearer and easier for patients to follow.", traits: { creative: 2, social: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Creating clear instructional materials" },
      { id: "train-nurses", label: "Show nurses how to use the device and gather their feedback.", traits: { social: 2, leadership: 1 }, path: "applied", riasec: "S", onetTheme: "Training people and gathering feedback" },
    ],
  },
  {
    id: "night-sky-study",
    situation: "Your class is using a telescope and public astronomy data to study a recently discovered object in the night sky.",
    prompt: "What would you choose to work on?",
    options: [
      { id: "adjust-telescope", label: "Set up and adjust the telescope for viewing.", traits: { handsOn: 2, analytical: 1 }, path: "applied", riasec: "R", onetTheme: "Setting up and adjusting scientific equipment" },
      { id: "analyze-observations", label: "Analyze observations to estimate the object's movement.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Analyzing observations and studying movement" },
      { id: "visual-explanation", label: "Create a visual explanation of what the team observed.", traits: { creative: 2, investigative: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Creating a visual presentation of scientific findings" },
      { id: "organize-observations", label: "Organize the observation records so the team can compare results.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Organizing records for consistent comparison" },
    ],
  },
  {
    id: "emergency-mapping",
    situation: "A community team is making a map to help people find safe routes during severe weather.",
    prompt: "Which part would you most want to take on?",
    options: [
      { id: "collect-locations", label: "Collect location information using field equipment.", traits: { handsOn: 2, investigative: 1 }, path: "applied", riasec: "R", onetTheme: "Collecting field information with equipment" },
      { id: "study-weather-data", label: "Study map and weather data to identify safer routes.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Studying data to evaluate route options" },
      { id: "design-map", label: "Design a map that is easy to understand quickly.", traits: { creative: 2, analytical: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Designing clear visual information" },
      { id: "share-map", label: "Coordinate with local groups to share and explain the map.", traits: { leadership: 2, social: 1 }, path: "entrepreneurial", riasec: "E", onetTheme: "Coordinating a project and presenting information" },
    ],
  },
  {
    id: "food-safety",
    situation: "A school cafeteria wants to make sure food is stored and prepared safely.",
    prompt: "Which task sounds most interesting?",
    options: [
      { id: "check-equipment", label: "Check storage equipment and temperatures during the day.", traits: { handsOn: 2, analytical: 1 }, path: "applied", riasec: "R", onetTheme: "Checking equipment and measuring conditions" },
      { id: "test-food", label: "Test samples and investigate a possible food-quality issue.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Testing samples and investigating a quality issue" },
      { id: "make-guide", label: "Create a clear visual guide for safe food handling.", traits: { creative: 2, social: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Designing clear instructional materials" },
      { id: "organize-inspections", label: "Keep inspection results organized and check required steps.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Maintaining records and following procedures" },
    ],
  },
  {
    id: "assistive-technology",
    situation: "A team is designing a simple device to help people with limited hand movement use a tablet.",
    prompt: "What contribution would you prefer?",
    options: [
      { id: "build-prototype", label: "Build a prototype and see how it feels to use.", traits: { handsOn: 2, creative: 1 }, path: "applied", riasec: "R", onetTheme: "Building and testing a physical prototype" },
      { id: "compare-designs", label: "Test different designs and compare how well they work.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Testing designs and comparing results" },
      { id: "interview-users", label: "Talk with potential users about what would help them.", traits: { social: 2, investigative: 1 }, path: "applied", riasec: "S", onetTheme: "Listening to people and identifying their needs" },
      { id: "shape-controls", label: "Create the shape and controls so the device is intuitive.", traits: { creative: 2, handsOn: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Designing a usable product" },
    ],
  },
  {
    id: "factory-quality",
    situation: "A local manufacturer wants to reduce defects in a product it makes.",
    prompt: "Which activity would you choose?",
    options: [
      { id: "adjust-machine", label: "Inspect the production equipment and adjust a machine.", traits: { handsOn: 2, analytical: 1 }, path: "applied", riasec: "R", onetTheme: "Inspecting and adjusting production equipment" },
      { id: "analyze-defects", label: "Analyze test results to find what might be causing defects.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Analyzing test results to diagnose a problem" },
      { id: "track-inspections", label: "Track inspection steps and make sure records are complete.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Tracking procedures and maintaining complete records" },
      { id: "present-improvement", label: "Present a proposed improvement and get the team on board.", traits: { leadership: 2, social: 1 }, path: "entrepreneurial", riasec: "E", onetTheme: "Presenting and promoting an improvement" },
    ],
  },
  {
    id: "habitat-restoration",
    situation: "A group is restoring a habitat for native plants and animals near your school.",
    prompt: "Which role appeals to you most?",
    options: [
      { id: "prepare-site", label: "Prepare the site and install equipment for monitoring wildlife.", traits: { handsOn: 2, investigative: 1 }, path: "applied", riasec: "R", onetTheme: "Preparing a site and installing field equipment" },
      { id: "study-observations", label: "Study observations to see whether the habitat is recovering.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Studying observations to evaluate change" },
      { id: "teach-volunteers", label: "Help volunteers learn how to identify and record local species.", traits: { social: 2, leadership: 1 }, path: "applied", riasec: "S", onetTheme: "Teaching people to identify and record information" },
      { id: "coordinate-volunteers", label: "Organize the project schedule and coordinate volunteers.", traits: { leadership: 2, analytical: 1 }, path: "entrepreneurial", riasec: "E", onetTheme: "Coordinating people and leading a project" },
    ],
  },
  {
    id: "bridge-materials",
    situation: "A team is comparing materials for a small footbridge in a public park.",
    prompt: "Which task would you most enjoy?",
    options: [
      { id: "build-samples", label: "Build and handle sample sections to see how they hold up.", traits: { handsOn: 2, analytical: 1 }, path: "applied", riasec: "R", onetTheme: "Building and handling material samples" },
      { id: "test-load", label: "Test samples and compare how much weight each can support.", traits: { investigative: 2, analytical: 1 }, path: "structured", riasec: "I", onetTheme: "Testing materials and comparing measurements" },
      { id: "design-bridge", label: "Create a design that fits the park and looks welcoming.", traits: { creative: 2, handsOn: 1 }, path: "entrepreneurial", riasec: "A", onetTheme: "Creating an original design for a public space" },
      { id: "document-procedure", label: "Document the test procedure so another team can repeat it.", traits: { analytical: 2, investigative: 1 }, path: "structured", riasec: "C", onetTheme: "Documenting procedures so work can be repeated" },
    ],
  },
]
