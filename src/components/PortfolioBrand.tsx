import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./PortfolioBrand.css";

const messages = [
  "I build things. You hire builders. 👀 Coincidence? I think not. 😂🙏",
  "You found the secret button. Now hire me. 😂🙏",
  "Powered by curiosity, coffee and job applications. ☕😂",
  "This button does nothing. Unlike me. Hire me? 😂🙏",
  "I promise my code has fewer bugs than this joke. 🐛😂",
  "404: Reason not to hire me not found. 😂",
  "Congratulations! You've unlocked a developer who's available for hire. 🏆",
  "I spent four years learning to code. Now I'm making buttons tell jokes. 😂",
  "Some developers hide bugs. I hide jokes. 🐛",
] as const;

export default function PortfolioBrand() {
  const [message, setMessage] = useState({ index: -1, visible: false, golden: false });
  const container = useRef<HTMLDivElement>(null);
  const popover = useRef<HTMLDivElement>(null);
  const dismiss = () => setMessage((current) => ({ ...current, visible: false, golden: false }));

  useEffect(() => {
    if (!message.visible) return;
    const timeout = window.setTimeout(dismiss, 4000);
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) dismiss();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [message.index, message.visible]);

  useEffect(() => {
    if (!message.golden) return;
    const timeout = window.setTimeout(() => {
      setMessage((current) => ({ ...current, golden: false }));
    }, 1400);
    return () => window.clearTimeout(timeout);
  }, [message.golden]);

  useEffect(() => {
    if (!message.visible) return;
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.fromTo(popover.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
      );
      return () => tween.revert();
    });
    return () => motion.revert();
  }, [message.index, message.visible]);

  return (
    <div className="brand-container" ref={container}>
      <button
        type="button"
        className={`brand flex items-center gap-3${message.golden ? " brand-golden" : ""}`}
        aria-label="Portfolio — reveal a secret message"
        aria-expanded={message.visible}
        aria-controls="portfolio-secret"
        onClick={() => setMessage((current) => {
          const index = (current.index + 1) % messages.length;
          return { index, visible: true, golden: index === messages.length - 1 };
        })}
      >
        <svg
          className="brand-mark"
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="m11 27 9-17 9 17-9-5-9 5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M20 10v12" stroke="currentColor" />
        </svg>
        <span>PORTFOLIO<span className="brand-dot">.</span></span>
      </button>
      <div
        id="portfolio-secret"
        ref={popover}
        className="brand-popover"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        hidden={!message.visible}
      >
        {message.visible && <>
          <p>{messages[message.index]}</p>
          <span className="brand-counter" aria-label={`Message ${message.index + 1} of ${messages.length}`}>
            {message.index + 1}/{messages.length}
          </span>
        </>}
      </div>
    </div>
  );
}
