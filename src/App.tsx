import { useEffect, useRef } from "react";
import gsap from "gsap";
import ElasticCursor from "./components/ElasticCursor";
import CosmicScene from "./components/CosmicScene";
import Navigation from "./components/Navigation";
import type { Destination } from "./components/Navigation";
import SkillsSection from "./components/skills/SkillsSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import ExperienceSection from "./components/experience/ExperienceSection";
import ContactSection from "./components/contact/ContactSection";
import AboutSection from "./components/about/AboutSection";
import "./App.css";

export default function App() {
  const hero = useRef<HTMLElement>(null);

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
    const id = window.location.hash.slice(1);
    if (id !== "about" && id !== "skills" && id !== "projects" && id !== "experience" && id !== "contact") return;
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const navigate = (target: Destination) => {
    const section = document.getElementById(target.toLowerCase());
    section?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
    section?.focus({ preventScroll: true });
  };

  return (
    <main>
      <ElasticCursor />
      <a className="skip-link" href="#hero-copy">
        Skip to content
      </a>
      <Navigation onNavigate={navigate} />
      <section
        id="home"
        className="hero"
        ref={hero}
        aria-labelledby="hero-title"
        tabIndex={-1}
      >
        <CosmicScene />
        <div className="hero-nav-space" aria-hidden="true" />
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
            Imagination sets the bar. We build beyond it.
          </p>
          <div className="hero-actions flex flex-wrap gap-3" data-reveal>
          </div>
        </div>
        <div className="hero-footer flex items-end justify-between" data-reveal>
          <p>
            <span className="footer-label">DRIVEN BY CURIOSITY</span>
            <br />
            Powered by persistence.
          </p>
          <span className="coordinates">
          </span>
        </div>
      </section>
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
