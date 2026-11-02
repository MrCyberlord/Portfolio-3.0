# Upstream keyboard source

These files are reused/adapted from Naresh Khatri's MIT-licensed 3D portfolio:
https://github.com/Naresh-Khatri/3d-portfolio/tree/19a1f148edc0fc07efd6c728adc91a649bf5d0d7/src/components/keyboard

Copyright (c) 2026 Naresh Khatri.
License: /licenses/naresh-khatri-3d-portfolio-MIT.txt (also in public/licenses).

Scene generation, key well, counter model/motion, heading metrics, input, wear,
and adaptive graphics retain upstream behavior. motion.ts scopes the original
poses to the Skills stage; use-keyboard-sounds.ts adds lazy activation and mute.
skills.ts preserves upstream data with an equivalent const/type in place of enum.
See design/SKILLS.md for the integration changes and backend limitation.
