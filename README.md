# PathFinder

Decision-support app for students who are unsure about college or a major.

PathFinder uses short STEM scenarios instead of a traditional survey. After eight
questions, it shows a college-fit suggestion, strength bars, STEM major ideas,
and ranked Georgia public colleges.

**Live demo:** [https://pathfinder-iota-mauve.vercel.app/](https://pathfinder-iota-mauve.vercel.app/)

**Documentation:** start at [`docs/README.md`](docs/README.md) for how scoring
works and how the STEM major profiles were built.

## Team

- Sean Lor
- Alen Suvalic

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS
- ESLint (`eslint-config-next`) plus GitHub Actions CI on every pull request
- UI started in [v0](https://v0.app); scoring lives in `lib/recommend.ts` and `lib/pathfinder-data.ts`
- Quiz and on-this-device reports: browser `localStorage`
- Optional accounts: Firebase Authentication (email and password) after web config is in `.env.local`
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

The quiz runs with no `.env` file. Email sign-up needs Firebase web config: copy `.env.example` to `.env.local`, paste the keys, and restart the dev server. Do not commit `.env.local` or a service account JSON file.

### Email sign-up

1. In the [Firebase console](https://console.firebase.google.com/), create or open a project, add a web app, and turn on the Email/Password sign-in provider.
2. Copy `.env.example` to `.env.local`.
3. Paste `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, and `appId` into the matching `NEXT_PUBLIC_FIREBASE_*` variables.
4. Restart `pnpm dev`.

`localhost` is an authorized domain by default. For the deployed site, add `pathfinder-iota-mauve.vercel.app` under Authentication → Settings → Authorized domains. Do not include `https://` or a port. The same six variables belong in the Vercel project if sign-up should work there. `measurementId` is not used.

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
| `components/` | Landing, profile, quiz, report, and sign-up screens |
| `docs/README.md` | Documentation index and glossary (start here) |
| `docs/construct-map.md` | How quiz answers become the report |
| `docs/scorecard-stem-mapping.md` | Eight STEM major profiles and research sources |
| `lib/stem-scenarios.ts` | 16 STEM quiz scenarios and per-option weights |
| `lib/pathfinder-data.ts` | Major profiles, trait labels, types |
| `lib/ga-colleges.json` | Cached Georgia public college dataset |
| `lib/recommend.ts` | Scoring and ranking |
| `lib/storage.ts` | Saved reports in `localStorage` |
| `lib/firebase.ts` | Firebase web app init and email sign-up |
| `firebase.json` | Email/password provider config for `firebase deploy --only auth` |
