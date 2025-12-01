# RealWorld Example App

> Full-stack RealWorld implementation powered by Remix v3, TypeScript, Tailwind CSS v4, and the official RealWorld API schema.

### Demo (coming soon) | [Spec](https://github.com/gothinkster/realworld)

This project showcases a production-style CRUD application with authentication, feed management, markdown authoring, and responsive UI patterns. It follows idiomatic **Remix data APIs** (loaders/actions), keeps networking type-safe through OpenAPI-generated clients, and leans on SSR-first rendering for great SEO and performance.

For more background on the RealWorld initiative or to pair this frontend with other backends, visit the [main RealWorld repository](https://github.com/gothinkster/realworld).

## How it works

This application uses modern web technologies and leverages Remix's server + client data APIs for streaming SSR, nested routing, and optimistic UI patterns.

## Architecture Overview

### Core Technologies

* **Remix v2** – Framework mode with Vite, loader/action data APIs, SSR, and file-based routing
* **TypeScript** – End-to-end type safety (components, loaders, API wrappers)
* **Tailwind CSS v4** – Utility-first styling via the new `@tailwindcss/vite` plugin
* **OpenAPI tooling** – `openapi-typescript` + `openapi-fetch` for strongly typed API calls
* **Express** – Production server with compression and static asset serving
* **PWA Support** – Service worker and web manifest for offline capabilities

### Key Architectural Patterns

#### 1. **SSR by Default**

* All routes stream HTML from the server before hydrating on the client.
* Subsequent navigation reuses loaders/actions for granular fetching.

#### 2. **Type-Safe API Layer**

* OpenAPI schema (`app/consts/schema.d.ts`) provides type definitions.
* `openapi-fetch` + custom middleware ensure consistent headers and error handling.

#### 3. **Flexible Data Loading**

* Each route module exports loaders/actions for data mutations and fetching.
* Shared logic extracted into `app/hooks` and `app/libs` helpers.

#### 4. **Authentication Flow**

* JWT stored via secure HTTP-only cookie (`app/session.server.ts`).
* Loaders/actions gate access by checking `SESSION_SECRET`-backed sessions.
* Client API calls reuse the issued token through a fetch middleware.

#### 5. **Styling and Components**

* Tailwind v4 is configured once in `app/app.css`.
* Shared UI primitives live under `app/components` (buttons, navigation, avatars, etc.).

### Project Structure

```
app/
├── app.css                  # Tailwind v4 entry point
├── components/              # Presentational + reusable UI pieces
│   ├── Article/            # Article list item component
│   ├── ArticleDetail/      # Article detail components
│   ├── Articles/           # Article list component
│   ├── Avatar/             # User avatar component
│   ├── FavoriteButton/     # Favorite/unfavorite button
│   ├── FollowButton/       # Follow/unfollow button
│   ├── NavHeader/          # Navigation header
│   ├── Pagination/         # Pagination component
│   └── ...
├── consts/                  # Global constants + generated API schema
├── hooks/                   # Custom hooks (session, fetcher, user state)
├── libs/
│   ├── actions/             # Shared loaders/actions helpers
│   ├── api/                 # Typed OpenAPI client + middleware
│   └── schemas/             # zod schemas for forms
├── routes/                  # File-system routes (Remix file-based routing)
│   ├── _home.*              # Feed + tabbed home routes
│   ├── article.$slug.tsx    # Article detail
│   ├── editor.($slug)/      # Article create/edit page
│   ├── login.tsx            # Login page
│   ├── register.tsx         # Register page
│   ├── settings.tsx         # Change user profile
│   ├── profile.$username.* # Profile feeds
│   └── api.*                # Server-only API proxy routes
├── root.tsx                 # Root layout, error boundary, document head
└── session.server.ts        # Cookie/session helpers
```

### Features

* ✅ **Authentication** – Register, login, logout with JWT
* ✅ **Articles** – Create, read, update, delete articles
* ✅ **Comments** – Add and delete comments to articles
* ✅ **Favorites** – Favorite/unfavorite articles
* ✅ **Follow** – Follow/unfollow users
* ✅ **Profiles** – View user profile pages
* ✅ **Editor** – Create/Edit markdown articles
* ✅ **Pagination** – Paginated article feeds
* ✅ **Tags** – Filter articles by tag
* ✅ **Feeds** – Your feed / Global feed
* ✅ **PWA** – Progressive Web App with service worker support

## Getting Started

### Prerequisites

* Node.js 20+ (see `engines` in `package.json`)
* pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root with the required secrets:

```env
SESSION_SECRET=replace-with-long-random-string
REACT_PUBLIC_API_ENDPOINT=https://api.realworld.show/api
```

* `SESSION_SECRET` powers the secure HTTP-only cookie in `app/session.server.ts`. Use a long, random string.
* `REACT_PUBLIC_API_ENDPOINT` configures the OpenAPI client (`app/libs/api`); defaults to the public RealWorld API but can be pointed to any compatible backend.

Restart the dev server whenever these values change.

### Scripts

| Command           | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `pnpm run dev`    | Start the Remix dev server with hot reloading (port logged in terminal, defaults to 3000).       |
| `pnpm run build`  | Create optimized client + server bundles in `./build`.                                             |
| `pnpm run start`  | Serve the production build via Express (defaults to port 3000, respects `PORT` env var).         |
| `pnpm run typecheck` | Run TypeScript type checking.                                                                    |
| `pnpm run lint`   | Run ESLint to check code quality.                                                                |

### Development

```bash
pnpm run dev
```

Open the logged local URL (usually `http://localhost:3000`). API requests proxy directly to `REACT_PUBLIC_API_ENDPOINT`, so ensure CORS is properly configured if you switch to a self-hosted backend.

### Build & Preview

```bash
pnpm run build
pnpm run start
```

`pnpm run start` consumes the generated `build/server/index.js` output. Set `PORT` if you need something other than 3000.

## Tech Stack

* **Framework**: Remix v3 (Vite-powered)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 + custom CSS tokens
* **Networking**: `openapi-fetch` and Zod validation helpers
* **State Management**: Route loaders/actions and lightweight hooks in `app/hooks`
* **Authentication**: JWT via secure cookies + API middleware token forwarding
* **Server**: Express with compression and static asset serving
* **PWA**: Service worker and web manifest for offline support

## Troubleshooting

* Missing types after modifying routes? Run `pnpm run typecheck` to verify TypeScript compilation.
* API requests failing locally? Double-check `REACT_PUBLIC_API_ENDPOINT` and ensure CORS allows your dev origin.
* Session errors in development? Provide a long, random `SESSION_SECRET`; short strings will cause cookie signing failures.
* Build errors? Ensure you're using Node.js 20+ as specified in `package.json` engines.

## License

MIT
