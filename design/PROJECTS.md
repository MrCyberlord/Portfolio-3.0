# Projects section

Local-only addition with ResearchLab featured above a compact three-card row for RivalIQ, Runningo and ExplainBot at wide desktop sizes. Tablet uses two columns and mobile stacks the cards. The supplied image informs organic blue base plates, raised category tabs, overlapping preview frames, inset dark content panels and soft shadows. Typography and preview dimensions are deliberately compact. Artwork uses original HTML/CSS/SVG diagrams; no astronaut decoration, external imagery, additional 3D library or new dependency is included.

ResearchLab uses a continuous custom SVG backplate with a raised upper-right shoulder and an integrated upper-left category lip, plus a stepped SVG material behind its information panel. The top category strip joins the main silhouette without a separate pill or shadow. The title and illustrative preview sit beside that panel on desktop and stack above it on mobile. The SVGs are decorative, with separate desktop/mobile outlines; content stays accessible HTML and is never clipped to the silhouette. This shape treatment is scoped to the featured card.

## Content and preview replacement

`src/components/projects/projects.ts` contains the supplied copy, stacks and repository links. Add a real screenshot to `public/images/projects/`, then set that project's `preview` to `{ src: "/images/projects/name.webp", alt: "Description of the actual project screenshot" }`. The image uses lazy loading and async decoding. Unset previews render clearly labeled illustrative UI concepts, with no fabricated performance figures.

Optional `demo: { url: "https://…", label: "Live demo" }` or `label: "Watch demo"` adds an external demo/video link. No demo button is shown without a URL. No published demo links were identified in the repositories' homepage/README metadata during implementation; the supplied GitHub links remain the primary action. External actions name their project, announce the new tab and use `noopener noreferrer`.

## Integration and motion

`ProjectsSection.tsx` renders reusable project cards and their previews. Navigation and the hero's existing Explore My Work action now scroll to Projects; `/#projects` opens it directly. Hero, Skills, cursor and existing styles are preserved. The only App changes mount the section and extend the existing section-navigation handling.

GSAP ScrollTrigger reveals each header/card once on entry. Fine mouse pointers move the preview by at most 4px horizontally/3px vertically; the card surface lifts 4px on hover. The existing cursor supplies link magnetism. Touch/coarse pointers have no hover parallax. Reduced motion disables reveals, parallax and transitions; all content remains visible. Listeners, triggers and tweens are cleaned up on preference changes/unmount.

## Local validation

TypeScript, lint, existing keyboard tests and the production build are checked. Browser QA covers desktop/mobile layout, Projects navigation and hero CTA, all four GitHub actions, preview labels, featured sizing, responsive widths, reduced motion, reveal visibility and pointer parallax. Artifacts and local browser scripts stay in ignored `artifacts/`.

No commit, push or deployment is included in this task.
