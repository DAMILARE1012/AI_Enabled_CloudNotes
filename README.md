# AI_Enabled_CloudNotes

AI_Enabled_CloudNotes is an intelligent cloud-based note-taking application powered by AI. It helps users capture ideas, organize information, and collaborate seamlessly across devices. With built-in AI features, your notes become smarter, more accessible, and more actionable.

## ✨ Features

- **AI Summarization**: Automatically generate concise summaries of long notes.
- **Smart Organization**: Categorize and tag notes intelligently for quick retrieval.
- **Collaboration**: Share and edit notes with teammates in real time.
- **Cross-Device Access**: Securely sync notes across all your devices.
- **Insights & Suggestions**: Get context-aware recommendations to enhance productivity.

## 🚀 Goals

- Simplify knowledge management with AI-driven tools.
- Enable teams and individuals to collaborate more effectively.
- Provide a secure, scalable cloud platform for note-taking.
- Enhance productivity by turning raw notes into actionable insights.

## 📌 Use Cases

- Students organizing lecture notes and study materials.
- Teams brainstorming and tracking project ideas.
- Professionals managing meeting notes and action items.
- Writers capturing and refining creative ideas.

---

## Summary

AI_Enabled_CloudNotes is designed to make note-taking smarter, faster, and more collaborative.

## Frontend

The `src/` directory contains the web dashboard: your AI agent joins your Zoom/Google Meet
calls, and this app is where the resulting summaries, transcripts, and action items show up —
one standalone page per meeting.

**Stack:** Vite + React + TypeScript, Redux Toolkit + RTK Query, Tailwind CSS, React Router.
There's no backend yet, so all API calls are intercepted by [MSW](https://mswjs.io/) and served
from realistic seed data — the RTK Query layer is written exactly as it would be against a real
API, so pointing it at one later is just a `.env` change.

### Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the Cognito values below
npm run dev                  # http://localhost:5173
```

### Authentication

Sign-in/sign-up is handled by **AWS Cognito's Hosted UI** via `oidc-client-ts` +
`react-oidc-context` (`src/auth/cognitoConfig.ts`, wired up in `src/main.tsx`). There's
no mock login anymore — you need a real Cognito User Pool. To set one up:

1. In the AWS Console, create a **Cognito User Pool** (or use an existing one).
2. Under the pool's **App integration** tab, create an **App client**:
   - Enable the **Hosted UI** / "Use the Cognito Hosted UI" option.
   - Under **Hosted UI settings**, add allowed **callback URLs** (e.g.
     `http://localhost:5173/auth/callback`) and **sign-out URLs** (e.g.
     `http://localhost:5173/login`). The callback URL must be the dedicated
     `/auth/callback` route, not the app root — see the note below.
   - Under **OAuth 2.0 grant types**, enable **Authorization code grant**.
   - Under **OpenID Connect scopes**, enable at least `openid`, `email`, `profile`.
   - Set up a **Cognito domain** (either a Cognito-hosted domain or your own) under
     **App integration → Domain**.
3. Copy these into `.env.local`:
   - `VITE_COGNITO_AUTHORITY` → `https://cognito-idp.<region>.amazonaws.com/<user-pool-id>`
   - `VITE_COGNITO_CLIENT_ID` → the App client ID
   - `VITE_COGNITO_DOMAIN` → the Hosted UI domain, e.g.
     `https://your-domain.auth.<region>.amazoncognito.com`
   - `VITE_COGNITO_REDIRECT_URI` / `VITE_COGNITO_LOGOUT_URI` → must exactly match a
     callback/sign-out URL registered on the App client in step 2

Until those are filled in with real values, `/login` will render but `Sign in` will
redirect to a non-existent Cognito domain — the rest of the app (meetings, notes,
settings) is unaffected since it's still served from the local MSW mocks.

**Why `/auth/callback` and not the app root:** the redirect URI must point at its own
route (`src/features/auth/pages/AuthCallbackPage.tsx`) rather than `/`, because `/`
unconditionally redirects to `/dashboard` — if Cognito's `redirect_uri` pointed there,
that redirect would fire and strip the `?code=&state=` query params before
`react-oidc-context` finishes exchanging the code for tokens, silently breaking sign-in.

**Also note:** Vite only reads `.env*` files when the dev server starts. If you edit
`.env.local` while `npm run dev` is already running, restart it — otherwise the app
keeps using the stale values.

### Scripts

| Command                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the dev server                        |
| `npm run build`        | Type-check and build for production         |
| `npm run preview`      | Preview the production build locally        |
| `npm run lint`         | Lint with oxlint (includes jsx-a11y checks) |
| `npm run format`       | Format with Prettier                        |
| `npm run format:check` | Check formatting without writing            |
| `npm run test`         | Run the Vitest suite                        |
| `npm run test:watch`   | Run tests in watch mode                     |

### Structure

```
src/
  app/            # Redux store, router, cross-cutting UI state
  auth/            # Cognito/OIDC config (react-oidc-context)
  api/             # RTK Query base config + MSW mocks/seed data
  features/        # auth, dashboard, meetings, integrations — each self-contained
  components/      # shared ui/ primitives and layout/ shell
  hooks/, lib/      # shared hooks and utilities
```

Each feature folder owns its API slice, components, pages, and types, so a feature can be
read or changed in isolation. See `.env.example` for the two environment variables that control
the API base URL and whether requests are mocked.
