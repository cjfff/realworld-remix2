# RealWorld Example App

> Full-stack RealWorld implementation powered by Remix, TypeScript, Tailwind CSS v4, and the official RealWorld API schema.

### Demo (coming soon) | [Spec](https://github.com/gothinkster/realworld)

This project showcases a production-style CRUD application with authentication, feed management, markdown authoring, and responsive UI patterns. It follows idiomatic **Remix data APIs** (loaders/actions), keeps networking type-safe through OpenAPI-generated clients, and includes PWA support for offline functionality.

For more background on the RealWorld initiative or to pair this frontend with other backends, visit the main [RealWorld repository](https://github.com/gothinkster/realworld).

## How it works

This application uses modern web technologies and leverages Remix's client-side data APIs for nested routing, optimistic UI patterns, and progressive web app capabilities.

## Architecture Overview

### Core Technologies

* **Remix** – Framework with loader/action data APIs, file-based routing, and SPA mode
* **TypeScript** – End-to-end type safety (components, loaders, API wrappers)
* **Tailwind CSS v4** – Utility-first styling via the new `@tailwindcss/vite` plugin
* **OpenAPI tooling** – `openapi-typescript` + `openapi-fetch` for strongly typed API calls
* **PWA** – Service worker with Workbox for offline support and caching strategies

### Key Architectural Patterns

#### 1. **SPA Mode with Client-Side Routing**

* Application runs in SPA mode (`ssr: false`) for fast client-side navigation.
* Route loaders/actions handle data fetching and mutations on the client.
* Progressive enhancement with service worker for offline capabilities.

#### 2. **Type-Safe API Layer**

* OpenAPI schema generates `app/consts/schema.d.ts` for type definitions.
* `openapi-fetch` with custom middleware ensures consistent headers and error handling.
* Token-based authentication managed through client-side session storage.

#### 3. **Flexible Data Loading**

* Each route module exports loaders/actions for data mutations and fetching.
* Shared logic extracted into `app/hooks` and `app/libs` helpers.
* Optimistic UI updates for better user experience.

#### 4. **Authentication Flow**

* JWT stored via client-side session (`app/session.client.ts`).
* Loaders/actions gate access by checking token presence.
* API calls automatically include token through fetch middleware.

#### 5. **Styling and Components**

* Tailwind v4 is configured once in `app/app.css`.
* Shared UI primitives live under `app/components` (buttons, navigation, avatars, etc.).
* Responsive design patterns throughout.

#### 6. **Progressive Web App**

* Service worker with Workbox for asset caching and runtime caching.
* Automatic cache invalidation on new deployments.
* Offline support with fallback strategies.

### Project Structure

```
app/
├── app.css                  # Tailwind v4 entry point
├── components/              # Presentational + reusable UI pieces
│   ├── Article/            # Article list components
│   ├── ArticleDetail/      # Article detail components
│   ├── Articles/           # Article feed components
│   ├── Avatar/             # User avatar component
│   ├── FavoriteButton/     # Favorite/unfavorite button
│   ├── FollowButton/       # Follow/unfollow button
│   ├── NavHeader/          # Navigation header
│   ├── Pagination/         # Pagination controls
│   └── ...
├── consts/                  # Global constants + generated API schema
├── hooks/                   # Custom hooks (fetcher, user state)
├── libs/
│   ├── actions/             # Shared loaders/actions helpers
│   ├── api/                 # Typed OpenAPI client + middleware
│   └── schemas/             # zod schemas for forms
├── routes/                  # File-system routes (Remix routes)
│   ├── _home.*              # Feed + tabbed home routes
│   ├── article.$slug.tsx   # Article detail
│   ├── editor.($slug)/      # Article create/edit page
│   ├── login.tsx           # Login page
│   ├── register.tsx         # Register page
│   ├── settings.tsx        # User settings
│   ├── profile.$username.* # Profile feeds
│   └── api.*                # API proxy routes
├── root.tsx                 # Root layout, error boundary, document head
├── session.client.ts        # Client-side session helpers
└── session.server.ts        # Server-side session helpers (if needed)
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
* ✅ **PWA** – Progressive Web App with offline support

## Getting Started

### Prerequisites

* Node.js 20+ (see `engines` in `package.json`)
* pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the project root with the required configuration:

```env
VITE_API_ENDPOINT=https://api.realworld.show/api
VITE_APP_BASE_PATH=/
PORT=3002
```

* `VITE_API_ENDPOINT` – Configures the OpenAPI client (`app/libs/api`); defaults to the public RealWorld API but can be pointed to any compatible backend.
* `VITE_APP_BASE_PATH` – Base path for the application (useful for deployment to subdirectories).
* `PORT` – Server port (defaults to 3002 in dev mode, 3000 in production).

Restart the dev server whenever these values change.

### Scripts

| Command           | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| `pnpm run dev`    | Start the Remix dev server with hot reloading (port 3002 by default).                            |
| `pnpm run build`  | Create optimized client + server bundles in `./build`.                                            |
| `pnpm run start`  | Serve the production build via Express (defaults to port 3000, respects PORT).                   |
| `pnpm run start:spa` | Serve the production build in SPA mode.                                                          |
| `pnpm run typecheck` | Run TypeScript type checking.                                                                    |
| `pnpm run lint`   | Run ESLint to check code quality.                                                                 |

### Development

```bash
pnpm run dev
```

Open the logged local URL (usually `http://localhost:3002`). API requests are made directly to `VITE_API_ENDPOINT`, so ensure CORS is properly configured if you switch to a self-hosted backend.

### Build & Preview

```bash
pnpm run build
pnpm run start
```

`pnpm run start` consumes the generated `build/server/index.js` output. Set `PORT` if you need something other than 3000.

## Tech Stack

* **Framework**: Remix (SPA mode)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 + custom CSS tokens
* **Networking**: `openapi-fetch` and Zod validation helpers
* **State Management**: Route loaders/actions and custom hooks
* **Authentication**: JWT via client-side storage + API middleware token forwarding
* **PWA**: Workbox service worker with runtime caching
* **Server**: Express.js
* **Build Tool**: Vite

## PWA Configuration

This project includes Progressive Web App support with:

* **Service Worker**: Automatically registered on app load
* **Cache Strategy**: Workbox with runtime caching for API calls and external resources
* **Cache Invalidation**: Unique cache ID per build to ensure fresh content on deployment
* **Offline Support**: Cached assets available offline with fallback strategies

The PWA configuration is handled by `vite-plugin-pwa` in `vite.config.ts`. The service worker is automatically generated during the build process.

## Troubleshooting

* **Missing types after modifying routes?** Run `pnpm run typecheck` to verify TypeScript compilation.
* **API requests failing locally?** Double-check `VITE_API_ENDPOINT` and ensure CORS allows your dev origin.
* **PWA not working?** Ensure you're running a production build (`pnpm run build && pnpm run start`) as service workers require HTTPS or localhost.
* **Build errors?** Clear the `build` directory and `node_modules/.vite` cache, then reinstall dependencies.

## License

MIT

