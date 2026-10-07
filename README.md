# PathFinder

Decision-support app for students who are unsure about college or a major.

PathFinder uses short real-life scenarios instead of a traditional survey. After eight questions, it shows a college-fit prompt, a strengths snapshot, suggested majors, and nearby colleges.

**Live demo:** [https://pathfinder-iota-mauve.vercel.app/](https://pathfinder-iota-mauve.vercel.app/)

## Team

- Sean Lor
- Alen Suvalic

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS
- ESLint (`eslint-config-next`) plus GitHub Actions CI on every pull request
- UI started in [v0](https://v0.app); scoring lives in `lib/recommend.ts` and `lib/pathfinder-data.ts`
- Prototype persistence: browser `localStorage` (no backend yet)
- Work tracking: Jira project **PathFinder (`PAT`)** on [alensuvalic.atlassian.net](https://alensuvalic.atlassian.net/jira/software/projects/PAT/board)

## Run locally

Requires [Node.js](https://nodejs.org/) 22+ and [pnpm](https://pnpm.io/) 10. If `pnpm` is missing from your PATH, run `corepack enable` (on Windows that may need an elevated terminal) or use `corepack pnpm` in place of `pnpm`.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm verify   # lint, typecheck, production build
pnpm build
pnpm start
```

No `.env` is required for the current prototype. Copy `.env.example` to `.env.local` only when you add secrets.

## How we work

- **`main`** is always runnable and is what Vercel should deploy.
- Branch from `main` using the Jira key: `feat/PAT-3-scenario-quiz`, `fix/PAT-8-retake`.
- Open a pull request. Do not push straight to `main`. CI (lint, typecheck, build) must pass before merge.
- Commit messages include the ticket: `PAT-3 Add scenario quiz progress bar`.
- Track stories in Jira, not GitHub Issues.

## Project layout

| Path | Role |
| --- | --- |
| `app/` | Next.js app shell |
| `components/` | Landing, profile, quiz, and report screens |
| `docs/construct-map.md` | Scoring rules, traits, paths, and `generateReport()` contract |
| `docs/scorecard-stem-mapping.md` | STEM major-area profiles and catalog/O*NET evidence |
| `lib/stem-scenarios.ts` | 16 STEM quiz scenarios and per-option weights |
| `lib/pathfinder-data.ts` | Major profiles, trait labels, types |
| `lib/ga-colleges.json` | Cached Georgia public college dataset |
| `lib/recommend.ts` | Scoring and ranking |
| `lib/storage.ts` | Saved reports in `localStorage` |
