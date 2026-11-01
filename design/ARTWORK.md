# Hero artwork

Created with the built-in image-generation tool from the user's supplied visual reference. This is a newly rendered approximation, not the supplied screenshot or an exact pixel reproduction.

## Assets

- `design/galaxy-source.png`: desktop source, 1586 × 992.
- `design/galaxy-mobile-source.png`: portrait mobile source, 1024 × 1536.
- `public/images/galaxy.webp`: optimized desktop background.
- `public/images/galaxy-mobile.webp`: optimized, art-directed mobile background.

The original screenshot is not served by the app. UI, star twinkling, shading and parallax are separate from the raster artwork. Replace or expand `src/components/CosmicScene.tsx` to introduce licensed separate sky, planet and terrain layers. The composite currently moves as a single image; the baked-in planets and explorer cannot move independently.

## Desktop prompt

Refine the generated landscape (the most recent wide image) to match the user's original reference screenshot as closely as possible. The screenshot is the other reference: blue star field, tiny explorer on descending ridge, cyan planet at right. Produce a new CLEAN background with NO UI, NO text or logos. Preserve this exact composition from that original: gigantic cyan planet with top at about 22% of image height and illuminated curved left limb at 72% image width; planet cropped by right edge, MUCH LESS dominating than in the generated landscape. Milky Way diagonal from bottom-left towards top-right, brightest cloud at x45% y52%. Softer atmospheric powder-blue haze, navy sky, small cyan moon at x56% y80%, faint soft smooth elliptical rings around planet rather than thin sharp wires. Explorer in the original is a standing backpacked human looking toward planet, at x38% with head y78% and feet y99%, about 21% image height. Single sloping rocky foreground ridge descending from y84% at left towards bottom center, dark mountain silhouette rising from bottom center to y73% at right. Do NOT have busy misty multiple layers of mountains, the simpler foreground shape should resemble the original. Landscape 16:10. High-quality realistic cinematic digital matte painting. Match original deep turquoise blue tones and astronomical textures. Make a faithful recreation, not a redesigned scene.

## Mobile prompt

Create a portrait 2:3 mobile adaptation of this exact generated galaxy landscape background. Preserve its photographic cinematic matte-painting style, deep navy/cyan palette, planet textures, hazy rings, explorer silhouette, ridge textures, diagonal Milky Way. Keep the TOP 45% dark navy starfield and very subtle galaxy, generous dark negative space for website headline. Put the luminous diagonal Milky Way through the middle/lower section. In the BOTTOM 55%, show the huge blue planet on the right, with its curved left limb at x68%, top y53%, cropped by right edge. Small cyan moon at x57%, y79%. The lone backpacked explorer FULL BODY must be at x25% near the bottom, head y84%, feet y96%, and keep entire body visible away from left edge. Dark sloping rocky ridge from lower left descending toward bottom center, right mountain at lower right. This should look like the same original scene adapted for a narrow phone screen, not different scenery. No text, no UI, no logos. Final image aspect portrait 2:3.
