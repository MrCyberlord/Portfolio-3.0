// Adapted from Naresh Khatri (MIT), revision 19a1f148edc0fc07efd6c728adc91a649bf5d0d7.
// Original: src/components/ui/ElasticCursor.tsx. See public/licenses/.
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./ElasticCursor.css";

const QUERY =
  "(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const CURSOR_DIAMETER = 50;
const WRAP_PADDING = 8;
const WRAP_RADIUS = 12;
const WRAP_EASE = 0.2;
const TARGET_PULL = 0.35;
const TARGET_EASE = 0.25;
const TARGET_MAX_PULL = 12;
const CURSOR_PARALLAX = 0.12;
const CURSOR_MAX_LEAD = 10;
const wrapsTarget = true;
const movesTarget = true;
const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const getAngle = (x: number, y: number) => (Math.atan2(y, x) * 180) / Math.PI;
const getScale = (x: number, y: number) =>
  Math.min(Math.hypot(x, y) / 735, 0.35);
type Base = {
  left: number;
  top: number;
  width: number;
  height: number;
  cx: number;
  cy: number;
};
function measure(el: HTMLElement): Base {
  const r = el.getBoundingClientRect();
  return {
    left: r.left,
    top: r.top,
    width: r.width,
    height: r.height,
    cx: r.left + r.width / 2,
    cy: r.top + r.height / 2,
  };
}

export default function ElasticCursor() {
  const jellyRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia(QUERY);
    let dispose: (() => void) | undefined;
    const start = () => {
      dispose?.();
      dispose = undefined;
      const blob = jellyRef.current,
        dot = dotRef.current;
      if (!query.matches || !blob || !dot) return;
      // Imperative animation values live inside the effect, outside React render.
      const pos = { x: 0, y: 0 },
        vel = { x: 0, y: 0 },
        pointer = { x: 0, y: 0 };
      const jelly = { x: 0, y: 0, w: 50, h: 50, r: 25, sx: 1, sy: 1 };
      const active: {
        el: HTMLElement | null;
        base: Base | null;
        offX: number;
        offY: number;
      } = { el: null, base: null, offX: 0, offY: 0 };
      let hidden = true,
        ticking = false;
      const springs = new Set<HTMLElement>();
      gsap.set([blob, dot], { xPercent: -50, yPercent: -50, opacity: 0 });
      const set: Record<string, ReturnType<typeof gsap.quickSetter>> = {};
      for (const [name, property, unit] of [
        ["x", "x", "px"],
        ["y", "y", "px"],
        ["r", "rotate", "deg"],
        ["sx", "scaleX", undefined],
        ["sy", "scaleY", undefined],
        ["width", "width", "px"],
        ["height", "height", "px"],
        ["radius", "borderRadius", "px"],
        ["opacity", "opacity", undefined],
      ] as const)
        set[name] = gsap.quickSetter(blob, property, unit);
      set.dotX = gsap.quickSetter(dot, "x", "px");
      set.dotY = gsap.quickSetter(dot, "y", "px");
      set.dotOpacity = gsap.quickSetter(dot, "opacity");
      const render = () => {
        // Precise dot always tracks the raw pointer.
        set.dotX(pointer.x);
        set.dotY(pointer.y);

        const el = active.el;
        const wrapping = !!el && wrapsTarget;
        const moveTarget = !!el && movesTarget;

        // Pull the hovered element toward the pointer (magnetic button), capped to an
        // absolute distance. Driven via gsap so its transform cache stays in sync with
        // the release spring-back — a raw style.transform write makes the spring instant.
        if (moveTarget && el && active.base) {
          const b = active.base;
          const pullX = clamp(
            (pointer.x - b.cx) * TARGET_PULL,
            -TARGET_MAX_PULL,
            TARGET_MAX_PULL,
          );
          const pullY = clamp(
            (pointer.y - b.cy) * TARGET_PULL,
            -TARGET_MAX_PULL,
            TARGET_MAX_PULL,
          );
          active.offX = lerp(active.offX, pullX, TARGET_EASE);
          active.offY = lerp(active.offY, pullY, TARGET_EASE);
          gsap.set(el, { x: active.offX, y: active.offY });
        }

        if (wrapping && active.base) {
          // Cursor snaps to hug the target (and follows it if it's also moving).
          const b = active.base;
          const leadX = clamp(
            (pointer.x - b.cx) * CURSOR_PARALLAX,
            -CURSOR_MAX_LEAD,
            CURSOR_MAX_LEAD,
          );
          const leadY = clamp(
            (pointer.y - b.cy) * CURSOR_PARALLAX,
            -CURSOR_MAX_LEAD,
            CURSOR_MAX_LEAD,
          );
          const tx = b.cx + active.offX + leadX;
          const ty = b.cy + active.offY + leadY;
          jelly.x = lerp(jelly.x, tx, WRAP_EASE);
          jelly.y = lerp(jelly.y, ty, WRAP_EASE);
          jelly.w = lerp(jelly.w, b.width + WRAP_PADDING * 2, WRAP_EASE);
          jelly.h = lerp(jelly.h, b.height + WRAP_PADDING * 2, WRAP_EASE);
          jelly.r = lerp(jelly.r, WRAP_RADIUS, WRAP_EASE);
          jelly.sx = lerp(jelly.sx, 1, 0.3);
          jelly.sy = lerp(jelly.sy, 1, 0.3);
          set.x(jelly.x);
          set.y(jelly.y);
          set.width(jelly.w);
          set.height(jelly.h);
          set.radius(jelly.r);
          set.sx(jelly.sx);
          set.sy(jelly.sy);
          set.r(0);
          set.opacity(hidden ? 0 : 1);
          set.dotOpacity(0); // fold the dot away — one unified cursor
        } else {
          // Free roam: elastic spring position + velocity-driven squish.
          const rotation = getAngle(vel.x, vel.y);
          const scale = getScale(vel.x, vel.y);
          jelly.x = pos.x;
          jelly.y = pos.y;
          jelly.w = lerp(jelly.w, CURSOR_DIAMETER + scale * 300, 0.4);
          jelly.h = lerp(jelly.h, CURSOR_DIAMETER, 0.4);
          jelly.r = lerp(jelly.r, CURSOR_DIAMETER / 2, 0.4);
          jelly.sx = 1 + scale;
          jelly.sy = 1 - scale * 2;
          set.x(pos.x);
          set.y(pos.y);
          set.width(jelly.w);
          set.height(jelly.h);
          set.radius(jelly.r);
          set.r(rotation);
          set.sx(jelly.sx);
          set.sy(jelly.sy);
          set.opacity(hidden ? 0 : 1);
          set.dotOpacity(hidden ? 0 : 1);
        }
      };
      const release = () => {
        const el = active.el;
        if (el) {
          springs.add(el);
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.35)",
            clearProps: "transform",
            onComplete: () => {
              el.style.willChange = "";
              springs.delete(el);
            },
          });
        }
        active.el = null;
        active.base = null;
        active.offX = 0;
        active.offY = 0;
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") {
          hide();
          return;
        }
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        if (!ticking) {
          gsap.ticker.add(render);
          ticking = true;
        }
        gsap.to(pos, {
          x: pointer.x,
          y: pointer.y,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          onUpdate: () => {
            vel.x = (event.clientX - pos.x) * 1.2;
            vel.y = (event.clientY - pos.y) * 1.2;
          },
        });
        hidden = !!(event.target as Element | null)?.closest?.(
          '[data-no-custom-cursor="true"], dialog[open]',
        );
      };
      const over = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const target = event.target as Element | null;
        const excluded = target?.closest?.(
          '[data-no-custom-cursor="true"], dialog[open]',
        );
        const el = excluded
          ? null
          : (target?.closest<HTMLElement>(
              ".cursor-can-hover, a, button:not(:disabled)",
            ) ?? null);
        if (el === active.el) return;
        release();
        if (el) {
          gsap.killTweensOf(el);
          springs.delete(el);
          active.el = el;
          active.base = measure(el);
          jelly.x = pos.x;
          jelly.y = pos.y;
          el.style.willChange = "transform";
        }
      };
      const hide = () => {
        hidden = true;
        release();
        set.opacity(0);
        set.dotOpacity(0);
        gsap.ticker.remove(render);
        ticking = false;
        gsap.killTweensOf(pos);
      };
      const scroll = () => {
        if (!active.el || !active.base) return;
        const r = active.el.getBoundingClientRect();
        Object.assign(active.base, {
          left: r.left - active.offX,
          top: r.top - active.offY,
          width: r.width,
          height: r.height,
          cx: r.left - active.offX + r.width / 2,
          cy: r.top - active.offY + r.height / 2,
        });
      };
      const visibility = () => {
        if (document.hidden) hide();
      };
      window.addEventListener("pointermove", move);
      document.addEventListener("pointerover", over);
      document.addEventListener("mouseleave", hide);
      document.addEventListener("visibilitychange", visibility);
      window.addEventListener("blur", hide);
      window.addEventListener("scroll", scroll, { passive: true });
      dispose = () => {
        window.removeEventListener("pointermove", move);
        document.removeEventListener("pointerover", over);
        document.removeEventListener("mouseleave", hide);
        document.removeEventListener("visibilitychange", visibility);
        window.removeEventListener("blur", hide);
        window.removeEventListener("scroll", scroll);
        gsap.ticker.remove(render);
        gsap.killTweensOf(pos);
        if (active.el) springs.add(active.el);
        for (const el of springs) {
          gsap.killTweensOf(el);
          gsap.set(el, { clearProps: "transform,willChange" });
        }
        gsap.set([blob, dot], { opacity: 0 });
      };
    };
    start();
    query.addEventListener("change", start);
    return () => {
      query.removeEventListener("change", start);
      dispose?.();
    };
  }, []);
  return (
    <>
      <div
        ref={jellyRef}
        className="portfolio-cursor-blob"
        aria-hidden="true"
      />
      <div ref={dotRef} className="portfolio-cursor-dot" aria-hidden="true" />
    </>
  );
}
