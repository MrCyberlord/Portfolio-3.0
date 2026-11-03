import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(root.querySelectorAll("[data-about-reveal]"), {
          y: 24,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        });
        gsap.from(root.querySelector(".about-portrait"), {
          opacity: 0,
          duration: 0.85,
          scrollTrigger: { trigger: root, start: "top 75%", once: true },
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section id="about" className="about-section" ref={section} aria-labelledby="about-title" tabIndex={-1}>
      <div className="about-layout">
        <p className="about-eyebrow" data-about-reveal><span aria-hidden="true" /> BEHIND THE CODE</p>
        <h2 id="about-title" data-about-reveal><span className="about-greeting">Hi, I’m</span><span className="about-name">Aman Jain<span className="about-title-dot">.</span></span></h2>
        <div className="about-introduction" data-about-reveal>
          <p className="about-lead">I’m a <strong>software developer</strong> with <strong>4+ years of experience</strong> turning ideas into real-world applications.</p>
          <p>My journey began with frontend development, expanded into full-stack engineering and now extends into AI-powered systems.</p>
        </div>
        <div className="about-story" data-about-reveal>
          <p>These days, I’m exploring how <strong>RAG, AI agents</strong> and modern web technologies can work together to solve meaningful problems.</p>
          <p>I enjoy understanding how things work, experimenting with new ideas and building projects that challenge what I already know. I’m always eager to research and learn new technologies, especially when they open up new possibilities or offer better ways to solve problems.</p>
        </div>
        <div className="about-signature" data-about-reveal>
          <div className="about-mantra">
            <span className="about-mantra-icon"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5c3-2 5-2 5-2s0 2-2 5l-6 6-4-4 7-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="15" cy="7" r="1.5" fill="currentColor" /><path d="m8 9-4 1-2 4 5-1m5 0-1 5 4-2 1-5M7 17l-3 3m1-4-2 2m5 0-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
            <span>Learn</span><i aria-hidden="true" /><span>Explore</span><i aria-hidden="true" /><span>Build</span>
          </div>
          <span className="about-signature-note">Curiosity is the constant.</span>
        </div>
        <div className="about-portrait">
          <div className="about-portrait-window">
            <img src="/images/about-character.webp" alt="Illustrated Aman Jain smiling in a navy hoodie, jeans and sneakers." width="1792" height="2400" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
}
