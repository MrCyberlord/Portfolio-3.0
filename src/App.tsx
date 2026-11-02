import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ElasticCursor from "./components/ElasticCursor";
import CosmicScene from "./components/CosmicScene";
import Navigation from "./components/Navigation";
import type { Destination } from "./components/Navigation";
import SkillsSection from "./components/skills/SkillsSection";
import "./App.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const hero = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [destination, setDestination] = useState<Destination>("Projects");

  useEffect(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from("[data-reveal]", {
          y: 22,
          opacity: 0,
          duration: 1.1,
          stagger: 0.13,
          ease: "power3.out",
          delay: 0.15,
        });
        gsap.from(".navigation", {
          opacity: 0,
          y: -10,
          duration: 1,
          delay: 0.2,
        });
      }, hero);
      const art = hero.current?.querySelector("[data-parallax]");
      if (!art) return () => context.revert();
      const moveX = gsap.quickTo(art, "x", {
        duration: 1.5,
        ease: "power2.out",
      });
      const moveY = gsap.quickTo(art, "y", {
        duration: 1.5,
        ease: "power2.out",
      });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        moveX((event.clientX / window.innerWidth - 0.5) * 10);
        moveY((event.clientY / window.innerHeight - 0.5) * 8);
      };
      const reset = () => {
        moveX(0);
        moveY(0);
      };
      const element = hero.current;
      element?.addEventListener("pointermove", move);
      element?.addEventListener("pointerleave", reset);
      return () => {
        element?.removeEventListener("pointermove", move);
        element?.removeEventListener("pointerleave", reset);
        context.revert();
        gsap.killTweensOf(art);
        gsap.set(art, { clearProps: "transform" });
      };
    });
    return () => motion.revert();
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#skills") return;
    const frame = requestAnimationFrame(() => {
      document
        .getElementById("skills")
        ?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const navigate = (target: Destination, trigger?: HTMLElement | null) => {
    if (target === "Skills") {
      const section = document.getElementById("skills");
      section?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      section?.focus({ preventScroll: true });
      return;
    }
    setDestination(target);
    returnFocus.current = trigger ?? null;
    dialog.current?.showModal();
  };

  return (
    <main>
      <ElasticCursor />
      <a className="skip-link" href="#hero-copy">
        Skip to content
      </a>
      <section
        id="home"
        className="hero"
        ref={hero}
        aria-labelledby="hero-title"
      >
        <CosmicScene />
        <Navigation onNavigate={navigate} />
        <div className="hero-copy" id="hero-copy" tabIndex={-1}>
          <p className="eyebrow flex items-center" data-reveal>
            <span className="eyebrow-line" />
            <span>AI ENGINEER</span>
            <span>•</span>
            <span>FULL-STACK DEVELOPER</span>
            <span>•</span>
            <span>BUILDER</span>
            <span className="eyebrow-line" />
          </p>
          <h1 id="hero-title" data-reveal>
            With AI, the
            <br />
            possibilities are
            <br />
            <span className="limitless">limitless.</span>
          </h1>
          <p className="secondary" data-reveal>
            I'm here to explore them.
          </p>
          <div className="hero-actions flex flex-wrap gap-3" data-reveal>
            <button
              className="cta cta-primary"
              onClick={(event) => navigate("Projects", event.currentTarget)}
            >
              Explore My Work <Arrow />
            </button>
            <button
              className="cta cta-secondary"
              onClick={(event) => navigate("Contact", event.currentTarget)}
            >
              Get in Touch <Arrow diagonal />
            </button>
          </div>
        </div>
        <div className="hero-footer flex items-end justify-between" data-reveal>
          <p>
            <span className="footer-label">DRIVEN BY CURIOSITY</span>
            <br />
            Built for what comes next.
          </p>
          <span className="coordinates">
            01 / THE BEGINNING <span className="orbit-dot" />
          </span>
        </div>
      </section>
      <SkillsSection />
      <dialog
        ref={dialog}
        className="coming-soon"
        aria-labelledby="destination-title"
        onClose={() => returnFocus.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <p className="eyebrow">THE JOURNEY CONTINUES</p>
        <h2 id="destination-title">
          {destination === "Contact"
            ? "Let’s connect. Soon."
            : `${destination} on the horizon.`}
        </h2>
        <p>
          {destination === "Contact"
            ? "Contact details will be available here soon."
            : `My ${destination.toLowerCase()} will be available here soon.`}
        </p>
        <button
          autoFocus
          className="cta cta-primary"
          onClick={() => dialog.current?.close()}
        >
          Back to exploring <Arrow />
        </button>
      </dialog>
    </main>
  );
}
