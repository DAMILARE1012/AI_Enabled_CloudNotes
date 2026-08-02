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
cp .env.example .env.local   # defaults already work out of the box
npm run dev                  # http://localhost:5173
```

Log in with any email and a password of 4+ characters — auth is mocked.

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
  api/             # RTK Query base config + MSW mocks/seed data
  features/        # auth, dashboard, meetings, integrations — each self-contained
  components/      # shared ui/ primitives and layout/ shell
  hooks/, lib/      # shared hooks and utilities
```

Each feature folder owns its API slice, components, pages, and types, so a feature can be
read or changed in isolation. See `.env.example` for the two environment variables that control
the API base URL and whether requests are mocked.
