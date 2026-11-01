# Developer portfolio - Milestone 1

A cinematic, responsive hero built with React, TypeScript, Vite, Tailwind CSS, and GSAP.

## Run locally

Use Node.js 22.12 or newer (Node.js 24 was used during implementation).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```

Preview the production bundle with `npm run preview` after building.

## Scope

This milestone contains only the hero and its navigation. Skills, projects, experience, and contact content are reserved for later work. The navigation and call-to-action buttons open accessible coming-soon dialogs until those destinations are implemented. No placeholder email address or external profile is used.

The newly generated scene closely follows the supplied galaxy reference: a diagonal Milky Way, large blue planet, smaller moon, lone explorer, and mountainous foreground. A portrait adaptation preserves the composition on phones. The supplied screenshot is not used as a background. Artwork is isolated in `src/components/CosmicScene.tsx` so it can later be replaced by separately licensed layers. The current composite supports gentle parallax as a whole; planets and terrain cannot yet move independently. Source files, optimized WebP assets, and generation prompts are documented in [design/ARTWORK.md](design/ARTWORK.md).

Motion is deliberately restrained. Respect the operating system's reduced-motion preference. Keyboard users should be able to navigate menus, operate call-to-action buttons, and dismiss any open dialog with Escape.

Typography uses a locally served Manrope variable font. Fonts and background images make no third-party network requests. Desktop and mobile background downloads are approximately 236 KiB and 184 KiB respectively. No canvas or 3D runtime is included.

No backend, API keys, or paid services are used. Milestone 1 is committed locally; deployment and pushing require separate authorization.

## Validation

TypeScript, lint, and the production build pass. Chromium checks covered 320, 390, 768, 1024, 1440, and 1920 pixel widths, image loading, mobile navigation, call-to-action dialogs, Escape dismissal, reduced motion, and runtime errors. No horizontal overflow or runtime errors were found. Desktop, mobile, and tablet screenshots are retained locally in `artifacts/` and excluded from Git. High-resolution artwork sources and intermediate QA screenshots are also retained locally; the optimized runtime assets and artwork documentation are versioned.

Development was run locally at http://127.0.0.1:5175/ because ports 5173 and 5174 were already occupied. `npm run dev` automatically selects an available port; use the URL printed in the terminal.

The hero fills the desktop viewport, with a 620px minimum height for readability on unusually short windows. Phones may scroll vertically to keep text and the scene balanced. Browser checks used Chromium; Safari and Firefox have not been tested.
