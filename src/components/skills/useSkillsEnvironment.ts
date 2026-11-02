import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useSkillsEnvironment(
  section: RefObject<HTMLElement | null>,
  visibilityTarget?: RefObject<HTMLElement | null>,
) {
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [mobile, setMobile] = useState(
    () => matchMedia("(max-width: 768px)").matches,
  );
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const [reducedMotion, setReducedMotion] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          preload.disconnect();
        }
      },
      { rootMargin: "0px 0px -64px 0px" },
    );
    const observer = new IntersectionObserver(
      ([entry]) =>
        setVisible(entry.isIntersecting && entry.intersectionRatio > 0),
      { threshold: [0, 0.001] },
    );
    preload.observe(element);
    observer.observe(visibilityTarget?.current ?? element);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = matchMedia("(max-width: 768px)");
    const updateMobile = () => setMobile(mobileQuery.matches);
    const updateMotion = () => setReducedMotion(motion.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    motion.addEventListener("change", updateMotion);
    mobileQuery.addEventListener("change", updateMobile);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preload.disconnect();
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      mobileQuery.removeEventListener("change", updateMobile);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [section, visibilityTarget]);

  useEffect(() => {
    if (!nearby) return;
    let cancelled = false;
    // Probe only after the visitor approaches Skills. Unsupported devices never
    // download Three.js. Release the temporary context before mounting Canvas.
    void Promise.resolve().then(() => {
      let supported = false;
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2", {
          failIfMajorPerformanceCaveat: true,
          powerPreference: "low-power",
        });
        supported = Boolean(context);
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        /* The interactive HTML keyboard remains available. */
      }
      if (!cancelled) setWebgl(supported);
    });
    return () => {
      cancelled = true;
    };
  }, [nearby]);

  return {
    nearby,
    webgl,
    active: visible && pageVisible,
    reducedMotion,
    mobile,
  };
}
