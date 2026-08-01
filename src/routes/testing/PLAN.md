# `/testing` redesign prototype

## Goal

Build an isolated, removable prototype of Xavier's personal site at `/testing`. The prototype should remain a restrained editorial site: introduce Xavier, keep writing central, and provide a compact account of work and open-source contributions without becoming a résumé or portfolio grid.

## Design

- Thesis: **a writer who builds**.
- One responsive, single-column page with a warm-paper background, strong typography, hairline rules, and one teal accent.
- No cards, gradients, shadows, animations, sticky navigation, dark-mode toggle, search, newsletter, analytics, or new dependencies.
- Sections: introduction, latest writing, work, open source, education/contact colophon.
- Use only user-confirmed public facts. Do not include confidential customers, metrics, architecture, product internals, or roadmap.

## Content

- Xavier is Co-Founder & CTO at Woosah Technologies, building operations-assurance infrastructure for distributed systems.
- Independent software consultant since 2017 across technology startups, public-sector records, mining services, healthcare, media and entertainment, and recreation.
- Senior Engineer at Atsign from 2021–2025 and a current advisor. Representative public work: NoPorts, `at_c`, and `at_client_sdk`.
- Computer Science at Ontario Tech University; Data Science specialization with distinction and Mathematics minor.
- Personal open-source selections may include pi-tai (coding-agent tooling), Swapper (macOS window utility), and dotfiles.

## Isolation

All prototype pages, components, data, and styles belong under `src/routes/testing/`. The only permitted production-file change is a small path gate in `src/routes/+layout.svelte` that suppresses the existing production chrome and outer `<main>` on `/testing`. Removing this directory and reverting that gate must completely remove the prototype.

## Acceptance criteria

- `/testing` is statically prerendered and marked `noindex,nofollow`.
- Existing production routes and shared components retain their behavior.
- Responsive at 320px and without horizontal overflow.
- Semantic landmarks, skip link, heading hierarchy, visible focus, underlined links, adequate contrast, reduced-motion handling, and useful image dimensions/alt text.
- Five latest published posts come from the existing post loader and link to production post routes.
- External URLs and descriptions are accurate and sourced from the linked public projects.
- `bun run check`, `bun run lint`, and `bun run build` are run when dependencies are available; unrelated pre-existing failures are reported rather than papered over.
