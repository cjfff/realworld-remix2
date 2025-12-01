# RealWorld Example App

> Full-stack RealWorld implementation powered by Remix v2 (SPA mode), TypeScript, Tailwind CSS v4, and the official RealWorld API schema.

### Demo (coming soon) | [Spec](https://github.com/gothinkster/realworld)

This project showcases a production-style CRUD application with authentication, feed management, markdown authoring, and responsive UI patterns. It follows idiomatic **Remix data APIs** (client loaders/actions), keeps networking type-safe through OpenAPI-generated clients, and runs as a Single Page Application (SPA) for fast client-side navigation.

For more background on the RealWorld initiative or to pair this frontend with other backends, visit the [main RealWorld repository](https://github.com/gothinkster/realworld).

## How it works

This application uses modern web technologies and leverages Remix's SPA mode with client-side data APIs for fast navigation, nested routing, and optimistic UI patterns.

## Architecture Overview

### Core Technologies

* **Remix v2 (SPA Mode)** – Framework mode with Vite, client loader/action data APIs, and file-based routing
* **TypeScript** – End-to-end type safety (components, loaders, API wrappers)
* **Tailwind CSS v4** – Utility-first styling via the new `@tailwindcss/vite` plugin
* **OpenAPI tooling** – `openapi-typescript` + `openapi-fetch` for strongly typed API calls
* **Express** – Production server for static asset serving (SPA mode)

### Key Architectural Patterns

#### 1. **SPA Mode (Client-Side Rendering)**

* All routes render on the client side for fast navigation and smooth user experience.
* Client loaders/actions handle data fetching and mutations directly from the browser.
* Static HTML shell is served, then React hydrates and takes over routing.

#### 2. **Type-Safe API Layer**

* OpenAPI schema (`app/consts/schema.d.ts`) provides type definitions.
* `openapi-fetch` + custom middleware ensure consistent headers and error handling.

#### 3. **Flexible Data Loading**

* Each route module exports loaders/actions for data mutations and fetching.
* Shared logic extracted into `app/hooks` and `app/libs` helpers.

#### 4. **Authentication Flow**

* JWT stored in client-side storage (`app/session.client.ts`).
* Client loaders/actions check authentication state before making API calls.
* Client API calls include the token through a fetch middleware.

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
└── session.client.ts        # Client-side session helpers
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

* `SESSION_SECRET` is used for session management (if needed for API proxy routes). Use a long, random string.
* `REACT_PUBLIC_API_ENDPOINT` configures the OpenAPI client (`app/libs/api`); defaults to the public RealWorld API but can be pointed to any compatible backend.

Restart the dev server whenever these values change.

### Scripts

| Command           | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `pnpm run dev`    | Start the Remix dev server with hot reloading (port logged in terminal, defaults to 3000).       |
| `pnpm run build`  | Create optimized client bundles in `./build/client` for SPA deployment.                          |
| `pnpm run start`  | Serve the production build via Express SSR server (defaults to port 3000, respects `PORT` env var). |
| `pnpm run start:spa` | Serve the production SPA build via Express static server (defaults to port 3000).                |
| `pnpm run typecheck` | Run TypeScript type checking.                                                                    |
| `pnpm run lint`   | Run ESLint to check code quality.                                                                |

### Development

```bash
pnpm run dev
```

Open the logged local URL (usually `http://localhost:3000`). API requests proxy directly to `REACT_PUBLIC_API_ENDPOINT`, so ensure CORS is properly configured if you switch to a self-hosted backend.

### Build & Preview

For SPA mode (recommended):

```bash
pnpm run build
pnpm run start:spa
```

`pnpm run start:spa` serves the static SPA build from `build/client`. Set `PORT` if you need something other than 3000.

Alternatively, you can use any static file server to serve the `build/client` directory.

## Tech Stack

* **Framework**: Remix v2 (SPA mode, Vite-powered)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 + custom CSS tokens
* **Networking**: `openapi-fetch` and Zod validation helpers
* **State Management**: Client route loaders/actions and lightweight hooks in `app/hooks`
* **Authentication**: JWT via client-side storage + API middleware token forwarding
* **Server**: Express for static asset serving (SPA mode)

## Troubleshooting

* Missing types after modifying routes? Run `pnpm run typecheck` to verify TypeScript compilation.
* API requests failing locally? Double-check `REACT_PUBLIC_API_ENDPOINT` and ensure CORS allows your dev origin.
* Session errors in development? Check that your authentication token is properly stored in client-side storage.
* Build errors? Ensure you're using Node.js 20+ as specified in `package.json` engines.
* Routes not loading? Remember this is SPA mode - all routing happens client-side after the initial HTML load.

## License

MIT
