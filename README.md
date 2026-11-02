# Developer portfolio

A cinematic portfolio built with React, TypeScript, Vite, Tailwind CSS, and GSAP. Milestone 1 is the hero; Milestone 2 adds a section-local interactive 3D skills keyboard using Three.js and React Three Fiber.

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
npm run test
npm run build
```

Preview the production bundle with `npm run preview` after building.

## Scope

The portfolio contains Hero, Skills, Projects, Experience and Contact. All navigation links scroll to real sections; `/#skills`, `/#projects`, `/#experience` and `/#contact` open them directly. Contact uses the supplied LinkedIn and X profiles. Email and phone are configured centrally and displayed on request through reveal controls.

The transparent navbar is fixed across sections. Home, Skills, Projects, Experience and Contact use smooth scrolling, update the active section indicator, and respect reduced motion with instant navigation. Section spacing clears the header; the hero retains its original navigation space. The mobile menu stays available throughout the page and closes after selection.

Projects features ResearchLab, RivalIQ, Runningo and ExplainBot using dimensional navy cards, local illustrative preview placeholders and the supplied GitHub links. Screenshots and optional demo/video links can be configured in `src/components/projects/projects.ts`. See [the Projects implementation notes](design/PROJECTS.md).

Experience connects Luxia AI, Magnibot and Informist through a glowing scroll-driven timeline, a responsive chapter index and clearly qualified achievement metrics. Career data lives in `src/components/experience/experience.ts`. See [the Experience implementation notes](design/EXPERIENCE.md).

Contact uses a responsive neumorphic grid with profile links and independent reveal/copy actions. Set your email and phone in `src/components/contact/contactConfig.ts`; both can copy before reveal once configured. See [the Contact implementation notes](design/CONTACT.md) for feedback, accessibility and validation details.

The newly generated scene closely follows the supplied galaxy reference: a diagonal Milky Way, large blue planet, smaller moon, lone explorer, and mountainous foreground. A portrait adaptation preserves the composition on phones. The supplied screenshot is not used as a background. Artwork is isolated in `src/components/CosmicScene.tsx` so it can later be replaced by separately licensed layers. The current composite supports gentle parallax as a whole; planets and terrain cannot yet move independently. Source files, optimized WebP assets, and generation prompts are documented in [design/ARTWORK.md](design/ARTWORK.md).

Motion is deliberately restrained. Respect the operating system's reduced-motion preference. Keyboard users should be able to navigate menus, operate call-to-action buttons, and dismiss any open dialog with Escape.

Typography uses a locally served Manrope variable font. Fonts, background images, and technology icons make no third-party network requests. Desktop and mobile background downloads are approximately 236 KiB and 184 KiB respectively. The hero contains no canvas. The keyboard canvas is bounded inside Skills, loads only when approaching the section, renders on demand, and pauses offscreen or in a hidden tab.

The Skills keyboard ports the original implementation from Naresh Khatri's `3d-portfolio`, pinned to commit `19a1f148edc0fc07efd6c728adc91a649bf5d0d7`. It retains the original Chibi runtime version, GLB keycap model, 24-key layout, customized skill ordering and colors, local technology logos, camera, key depression/glow, press and release MP3 recordings, staggered bounce reveal, and adaptive graphics. Hover previews a skill in an HTML detail panel; click, tap, or a mapped physical key pins that skill after release. Leaving another preview restores the pinned skill.

Skills fills at least one viewport, with its compact content centered so its anchor opens without the hero showing above it. The canvas stays inside Skills, with details to its right on desktop and below on mobile. Floating 3D headings and hover hints are disabled, including their font download. The keyboard uses its Skills pose only; alternate movement modes and the controls row have been removed. Mobile keeps the original distinct rotation and aspect-ratio fit, a 1.5 DPR ceiling, and touch pointer handling. Vertical swipes remain native page scrolling; the renderer pauses when its viewport leaves the screen.

MIT and font notices are shipped in `public/licenses/` and `public/fonts/`, with attribution in [the port documentation](design/SKILLS.md). The private realtime backend is not copied: the original embedded counter and wear visuals use a local session count. If WebGL is unavailable or fails, an accessible six-column HTML keyboard appears automatically. Reduced motion keeps the 3D keyboard with its reveal and press transitions disabled. No view or sound toggle is shown; original press sounds remain enabled after a user gesture.

No backend, API keys, or paid services are used. Milestone 1 is committed locally; deployment and pushing require separate authorization.

## Validation

TypeScript, lint, eight reference-asset/input/geometry/quality/detail-data tests, and the production build pass. Chromium checks cover desktop and mobile layouts, actual mesh hover/press selection, pinned details, touch selection and swipe cancellation, recorded sound, physical-key shortcuts, automatic fallback selection, reduced motion, all 24 key positions staying inside the canvas, and desktop section heights fitting the tested viewports. Earlier port validation also covered lazy loading, idle/offscreen/hidden-tab rendering, mute, context loss, unavailable WebGL, and adaptive graphics. Hero styles, artwork, and components remain unchanged from Milestone 1.

Desktop and mobile screenshots and the local browser validation report are in `artifacts/`, excluded from Git. The original runtime is loaded separately from the hero; the production 3D chunk is approximately 445 kB gzip. Vite reports a size advisory for that lazy chunk; the build succeeds. The optional ZIP loader is emitted separately and is not requested for this object-based scene. Physical-device Safari/Firefox testing remains outstanding.

Development was run locally at http://127.0.0.1:5175/ because ports 5173 and 5174 were already occupied. `npm run dev` automatically selects an available port; use the URL printed in the terminal.

The hero fills the desktop viewport, with a 620px minimum height for readability on unusually short windows. Phones may scroll vertically to keep text and the scene balanced. Browser checks used Chromium; Safari and Firefox have not been tested.

The Skills keyboard now follows the requested frontend, backend, AI/retrieval and infrastructure selection: JavaScript, TypeScript, React, Next.js, Tailwind CSS, Redux Toolkit; Python, FastAPI, Node.js, PostgreSQL, MongoDB, Express.js; LangGraph, LangChain, RAG, Ollama, pgvector, Hugging Face; Docker, Git, Linux, AWS, SQLAlchemy, Vector Databases. New icons are stored locally, with sources and notices in `public/licenses/skills-icons-attribution.md`.
