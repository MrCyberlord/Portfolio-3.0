# Reference Skills keyboard

This milestone ports the keyboard from [Naresh Khatri's 3D portfolio](https://github.com/Naresh-Khatri/3d-portfolio), revision `19a1f148edc0fc07efd6c728adc91a649bf5d0d7`, under the MIT license. The previous custom seven-key model, synthesized sound, sidebar, and custom keyboard geometry have been removed.

## Original implementation retained

- `reference/scene.ts`: original scene graph, six-column layout, cap/case materials, camera, logo planes, key states, and optional bongo model placement (disabled in this host to avoid its download). The host disables 3D labels using the optional `labels: false` flag, avoiding their meshes and font download.
- `reference/key-well.ts`, `counter-model.ts`, `counter-motion.ts`, `input.ts`, `wear.ts`, `adaptive-graphics.ts`, `use-adaptive-graphics.ts`, and `heading-metrics.json`: original source implementations.
- `reference/skills.ts`: customized 24-skill selection in the user-requested order. The original six-column model and positional QWERTY mapping remain. All icon URLs are local, and descriptions use the professional panel copy.
- `public/assets/keyboard/`: original `keycaps.glb`, `bongo-frames.glb`, and all 24 SVG logos.
- `public/assets/keycap-sounds/`: original press/release MP3 files, played at the reference gain of 0.4.
- `public/fonts/helvetiker_regular.typeface.json`: original 3D font file. Despite the historical filename, its metadata identifies Archivo Black; its OFL notice is included.

The models, logos, recordings, 3D font, and license files are checked against upstream Git blob hashes in `design/reference-keyboard.json`. `npm run test` validates these bytes rather than relying on visual resemblance.

## Containment adaptations

`ReferenceKeyboard.tsx` adapts the upstream keyboard React host. It uses `@chibi3d/runtime@0.5.0`, Three.js 0.185.1, and the same orthographic renderer and environment setup. The canvas fills a section-local viewport, never a fixed page-wide layer. The section has a `100svh` minimum and centers its compact content vertically; short screens can grow naturally. At 1024px and above, the keyboard and HTML detail panel form two columns. Below that breakpoint, details follow a compact keyboard canvas. The hero's source components, styles, background assets, markup, and motion remain unchanged.

Only the Skills pose remains. The Skills/Spin/Bongo/Float, sound and list controls and their state have been removed. `reference/motion.ts` retains the 1.5-second elastic reveal and 70ms key stagger, scoped to the keyboard stage. The board fits that stage without space for removed labels. Rendering and tweens pause outside the visible stage or in a hidden tab. Reduced motion skips the reveal, uses immediate cap states, and keeps the keyboard visible.

The original shared counter requires a private server that is not part of the public repository. The embedded counter model, rolling digits, and wear function are retained, using local session presses instead. There is no socket connection, visitor tracking, analytics, copied contact form, game, or unrelated portfolio component.

## Mobile behavior

The six-column/four-row board stays intact, with the same resting orientation. Canvas height follows its width on mobile instead of occupying a full viewport. Desktop uses a height-bounded canvas beside a compact detail panel. The DPR ceiling is 1.5 on mobile and 2 on desktop, with the upstream adaptive graphics controller.

Touch pointer IDs hold a key until release/cancel. A tap pins details below. `touch-action: pan-y` preserves scrolling and cancelled swipes release the key. Short or landscape screens scroll naturally; content is never clipped to force a one-screen layout.

## Skill details

`SkillDetailsPanel.tsx` replaces the floating 3D headings, descriptions, and default exploration label. The redundant header hover hint is removed. Hovering a key previews its details; clicking, tapping, or pressing a mapped physical key pins the selection. Leaving another preview restores the pin. The automatic HTML fallback supports the same selection and focus previews.

`skillDetails.ts` contains the category, professional description, and three use cases for each of the 24 original skills. It is independent of the upstream model/material data and includes a generic fallback for future skills. Panel transitions respect reduced motion. The keyboard stays centered within its canvas.

The reference's Space Grotesk body and Unbounded headings are self-hosted and scoped to Skills. The hero keeps Manrope. The section heading, canvas and card use normal document flow with compact spacing.

## Accessibility and fallback

The complete skill list stays available as text to assistive technology. Pinned details are announced in a live region. Unavailable WebGL or a runtime failure automatically shows a compact six-column HTML keyboard with accessible buttons and the shared panel. There is no manual list-view functionality. Reduced motion keeps the 3D keyboard static and disables panel entry animation.

The original QWERTY input mapping is retained: digits 1-6, Q-Y, A-H, and Z-N for the four displayed rows. Browser/system shortcuts and typing targets are ignored. Input is gated to the visible Skills section. Hover and physical/touch input share ownership of a cap, so releasing one source cannot release a cap still held by another. Hover also uses the original press/release recordings once browser audio has been unlocked by a gesture. Recorded sounds stay enabled after audio is unlocked; the sound toggle and saved mute preference have been removed.

Mouse hover uses a resting-cap raycast instead of runtime mesh enter/exit events. Depressed cap movement or crossing its child meshes cannot release and re-press the same key. The stable grid slot identifies the key, and shared input ownership deduplicates repeated moves. Leaving releases once; re-entry presses once. Raycasting restores all displayed transforms before rendering. Native pointer-up/cancel guards preserve ownership through renderer updates. The R3F version is pinned for that integration bridge.

## Validation

- TypeScript, lint, production build, and eight Node test groups, including detail metadata coverage.
- Byte identity for every reused model, icon, recording, 3D font, and upstream license.
- Browser tests for all 24 loaded caps, exact key travel, shared input ownership, recorded audio, physical key mapping, and Skills-only containment.
- Mobile checks for first/last rows, edge keys, hold/release, swipe cancellation, portrait/landscape resizing, native scrolling, and no horizontal overflow.
- Reduced-motion 3D keyboard, unavailable WebGL automatic fallback, compact responsive dimensions, and no controls.

Local reference captures and comparison screenshots/reports are in `artifacts/` (ignored by Git). All adaptations are documented here and licensed upstream source remains attributed. No commit or push is part of this revision.

## Reference cursor

`src/components/ElasticCursor.tsx` adapts the MIT-licensed [ElasticCursor implementation](https://github.com/Naresh-Khatri/3d-portfolio/blob/19a1f148edc0fc07efd6c728adc91a649bf5d0d7/src/components/ui/ElasticCursor.tsx) from the same reference revision. It preserves the 50px outlined inverted blob, 12px precise dot, velocity deformation, 1.5-second elastic follow, 8px target padding, and magnetic pull/spring parameters. Existing links and buttons acquire the reference's magnetic treatment automatically. The keyboard canvas remains a free-roam surface and keeps its independent resting-cap hover tracker.

Next.js routing and preloader integration are omitted. Animation state lives in a React effect with full cleanup. The decorative cursor pauses on pointer exit, blur and hidden tabs, and is disabled for touch/coarse pointers, widths at or below 768px, and reduced motion. The native cursor remains available, as in the reference. No realtime visitor cursors, networking, new runtime dependencies or hero layout/style changes were added.

## Customized skill selection

The four rows now contain:

1. JavaScript, TypeScript, React, Next.js, Tailwind CSS, Redux Toolkit.
2. Python, FastAPI, Node.js, PostgreSQL, MongoDB, Express.js.
3. LangGraph, LangChain, RAG, Ollama, pgvector, Hugging Face.
4. Docker, Git, Linux, AWS, SQLAlchemy, Vector Databases.

Eight new brand silhouettes come from Simple Icons at revision `90646e4bf7f3b89df6c37e65baf3e7bc759a517c` under CC0, recolored white for keycap legibility. RAG, pgvector and Vector Databases use original generic line symbols rather than an asserted official logo. See `public/licenses/skills-icons-attribution.md` and `simple-icons-CC0.txt`. The original reference asset set is retained for its byte-identity provenance tests; unused icons are not requested by the application. Card copy and categories have been updated for all new entries. Original model geometry, key presses, sounds, rendering, cursor, hero and section styling are preserved.
