# Contact section

The four soft navy cards follow the requested order: LinkedIn and Email above Phone and X. At widths below 600px, they stack in that same order. Inset icon wells, raised medallions/copy controls, soft outer shadows and pressed-in states adapt the supplied neumorphic reference without a form or backend.

## Configuration

All contact values and social URLs live in `src/components/contact/contactConfig.ts`:

```ts
email: { value: "", unavailableLabel: "Email not shared yet" },
phone: { value: "", unavailableLabel: "Phone not shared yet" },
```

Replace the empty strings with real details when ready. The UI initially says "Click to reveal"; blank fields reveal the unavailable label and copying them reports that the detail is not shared. No dummy address or number is displayed or copied. The LinkedIn and X URLs match the supplied profiles and open in new tabs with `noopener noreferrer`.

## Controls and feedback

`DirectContactCard.tsx` renders a semantic full-card reveal button with a separate copy button. Actual revealed text stays outside the button and can be selected for manual copying. Reveal uses `aria-expanded`/`aria-controls`, values and feedback have polite live regions, and icon-only copy buttons have explicit labels. Copying is independent of the reveal state.

The Clipboard API is awaited before displaying "Copied!". During a pending write, the copy button is busy/disabled. Success feedback clears after two seconds; failures stay for 4.5 seconds and offer a manual-copy path. Missing details, unavailable Clipboard API and denied writes never report success. Timers and asynchronous state updates are guarded on unmount. Reveal is a visual interaction, not access control for configured frontend values.

## Motion and integration

GSAP reveals the card wrappers once on section entry, leaving the card surface free for a small CSS hover lift. Value reveals use a short CSS entrance. Touch has no hover effects, and reduced motion removes reveal/hover transitions without hiding content. There are no continuous decorative loops or new runtime dependencies.

Contact is now an actual section and navbar anchor, including active tracking, mobile-menu navigation and `/#contact`. The obsolete coming-soon dialog and its unused App state were removed. Existing Hero, Skills, Projects, Experience, cursor and public assets are preserved.

The X silhouette is the brand mark distributed by Simple Icons, pinned to revision `90646e4bf7f3b89df6c37e65baf3e7bc759a517c` ([source](https://github.com/simple-icons/simple-icons/blob/90646e4bf7f3b89df6c37e65baf3e7bc759a517c/icons/x.svg)); its CC0 notice is already shipped in `public/licenses/simple-icons-CC0.txt`. The LinkedIn glyph identifies the linked profile; the other icons are simple inline interface symbols. No icon service is requested at runtime.

## Verification

TypeScript, lint, the eight existing tests and production build are checked. Browser QA covers eight viewport sizes, requested grid corners, mobile navigation, keyboard/focus behavior, default unavailable states, and isolated configured-value fixtures for pre-reveal copying, reveal, success timeout, pending writes, denial/unavailable API feedback and long-value wrapping. Fixtures use a stubbed Clipboard API; they do not modify the system clipboard or production contact data. Local screenshots/reports stay in ignored `artifacts/`.

No commit, push or deployment is included.
