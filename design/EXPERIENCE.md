# Experience section

A reverse-chronological career story for Luxia AI, Magnibot and Informist, using the supplied roles, periods, employment attribution, technologies and approximate performance results. No company links, current-employment claims, extra achievements or official logos are invented.

## Structure

- `src/components/experience/experience.ts` holds the typed career data. Approximate figures remain marked with `~` or an `Approx.` label. The Luxia engagement explicitly says "Through Anlage Infotech / Eigenlytics".
- `ExperienceSection.tsx` renders a semantic ordered list of chapters, inline original company glyphs, contribution summaries, metric tiles and technology lists. Data and rendering are separate so future roles can be added consistently.
- `experience.css` scopes the navy material, cyan/violet/teal chapter accents, offset glyphs, varied corner profiles, raised impact panels and glowing timeline. It introduces no global selectors, assets or dependencies.

On desktop, the chapter index sticks below the fixed navbar. On narrow screens it becomes a three-link row above the timeline; metrics and contributions stack as needed. All content stays visible in normal flow, without click-to-expand details. The section clears the fixed header and supports `/#experience`.

## Interaction and motion

Existing GSAP ScrollTrigger reveals each chapter on entry and fills the connecting line with scroll progress. Reveals run on a wrapper so they do not override the card's small CSS hover lift. There are no continuous decorative animation loops or animated metric counters.

Chapter links use normal anchors with smooth scrolling, a fixed-header offset and focus transfer to the selected chapter. A scroll-driven active indicator is independent of animation preferences, including a page-end correction for the final chapter. Reduced motion skips reveals, scrub animation and hover transitions while keeping the full line and all content visible. Media contexts, triggers and event listeners are cleaned up on preference changes or unmount.

## Integration and verification

The existing navbar now scrolls to Experience and tracks it as the active section. Contact navigation is now integrated with its own section. The only changes outside the new section are App mounting/hash navigation, the existing Navigation destination handling, and documentation. Existing hero, Skills, Projects, cursor and public assets were checked against their pre-task hashes.

Validation includes TypeScript, lint, the eight existing tests, production build and Chromium desktop/mobile checks for the supplied facts, navigation, focus, scroll reveals, timeline completion, hover, reduced motion, nine viewport sizes and absence of runtime errors. Local screenshots and browser scripts are in ignored `artifacts/`. Physical-device Safari/Firefox testing remains outstanding.

No commit, push or deployment is included.
