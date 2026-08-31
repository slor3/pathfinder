# PathFinder

Decision-support app for students who are unsure about college or a major.

PathFinder uses short real-life scenarios instead of a traditional survey. After eight questions, it shows a college-fit prompt, a strengths snapshot, suggested majors, and nearby colleges. **It is a small push in a direction you might already want to go — not a verdict on your life or a substitute for advisors.**

**Live demo:** [https://pathfinder-iota-mauve.vercel.app/](https://pathfinder-iota-mauve.vercel.app/)

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS
- UI started in [v0](https://v0.app); scoring lives in `lib/recommend.ts` and `lib/pathfinder-data.ts`
- Prototype persistence: browser `localStorage` (no backend yet)
- Work tracking: Jira project **PathFinder (`PAT`)** on [alensuvalic.atlassian.net](https://alensuvalic.atlassian.net/jira/software/projects/PAT/board)

## Run locally

Requires [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build
pnpm start
```

No `.env` is required for the current prototype.

## How we work

- **`main`** is always runnable and is what Vercel should deploy.
- Branch from `main` using the Jira key: `feat/PAT-3-scenario-quiz`, `fix/PAT-8-retake`.
- Open a pull request. Do not push straight to `main`.
- Commit messages include the ticket: `PAT-3 Add scenario quiz progress bar`.
- Track stories in Jira, not GitHub Issues.

## Project layout

| Path | Role |
| --- | --- |
| `app/` | Next.js app shell |
| `components/` | Landing, profile, quiz, and report screens |
| `lib/pathfinder-data.ts` | Scenarios, majors, colleges, trait labels |
| `lib/recommend.ts` | Scoring and ranking |
| `lib/storage.ts` | Saved reports in `localStorage` |

## Disclaimer

PathFinder is not the de facto guide to anyone’s success. Reports are suggestions to talk over with people you trust, then retake or ignore as your goals change.
