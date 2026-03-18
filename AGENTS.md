# AGENTS.md

## Repo Snapshot

- Personal site built with SvelteKit 2 on Vite.
- Uses Svelte 5 patterns in components and routes.
- Managed with Bun (`packageManager: bun@1.3.5`).
- Static output via `@sveltejs/adapter-static`.
- Blog content uses mdsvex Markdown files in `src/posts`.
- Styling uses Tailwind CSS plus Prism's `prism-okaidia` theme for code blocks.

## Common Commands

- `bun install`
- `bun run dev`
- `bun run check`
- `bun run lint`
- `bun run build`
- `bun run deploy`

Validation note: `bun run check`, `bun run lint`, and `bun run build` were attempted in this environment, but local binaries were unavailable because dependencies are not currently installed.

## Repo Map

- `src/routes`: pages, route loaders, layout, error page, and RSS endpoint
- `src/lib`: shared components, metadata, and post-loading helpers
- `src/posts`: Markdown blog posts
- `static`: site assets, favicon, and `CNAME`

## Editing Conventions

- Prefer JavaScript with JSDoc over introducing TypeScript by default. `jsconfig.json` enables `allowJs`, `checkJs`, and `strict`.
- Preserve existing Svelte 5 patterns such as `$props()` and `$derived()`.
- Follow Prettier settings from `.prettierrc`: tabs, single quotes, no trailing commas, 100 column width.
- Keep site-wide metadata centralized in `src/lib/metadata.js`.
- Match the existing commit style if asked to commit: Conventional Commits.

## Blog Content Rules

- Posts live in `src/posts/*.md`.
- Post slugs come from the Markdown filename via the loader in `src/lib/utils.js`.
- Required frontmatter fields are:
  - `title`
  - `description`
  - `author`
  - `date`
  - `published`
- Only posts with `published: true` should appear in the posts index and RSS feed.
