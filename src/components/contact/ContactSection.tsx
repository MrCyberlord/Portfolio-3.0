import SectionIntro from "../SectionIntro";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_CONFIG } from "./contactConfig";
import ContactIcon from "./ContactIcons";
import DirectContactCard from "./DirectContactCard";
import "./contact.css";

gsap.registerPlugin(ScrollTrigger);

function SocialContactCard({
  kind,
  title,
  url,
  subtitle,
}: {
  kind: "linkedin" | "x";
  title: string;
  url: string;
  subtitle: string;
}) {
  return (
    <article
      className={`contact-card contact-card--social contact-card--${kind}`}
      aria-labelledby={`contact-${kind}-title`}
    >
      <a
        className="contact-social-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${title} profile (opens in a new tab)`}
      >
        <span className="contact-card-top">
          <span className="contact-icon-well">
            <span className="contact-icon-medallion">
              <ContactIcon name={kind} />
            </span>
          </span>
          <span className="contact-kind">SOCIAL PROFILE</span>
          <span className="contact-external" aria-hidden="true">
            <ContactIcon name="external" />
          </span>
        </span>
        <h3 id={`contact-${kind}-title`} className="contact-title">
          {title}
        </h3>
        <p className="contact-value">{subtitle}</p>
        <span className="contact-social-cue">
          Open profile<span aria-hidden="true">↗</span>
        </span>
      </a>
    </article>
  );
}

export default function ContactSection() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        root
          .querySelectorAll<HTMLElement>("[data-contact-reveal]")
          .forEach((card, index) => {
            gsap.from(card, {
              y: 18,
              autoAlpha: 0,
              delay: index * 0.08,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: { trigger: root, start: "top 75%", once: true },
            });
          });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <section
      id="contact"
      className="contact-section"
      ref={section}
      tabIndex={-1}
      aria-labelledby="contact-section-title"
    >
      <div className="contact-inner">
        <SectionIntro id="contact-section-title" number="05" title="SAY HELLO" summary="Have an idea, an opportunity or just want to talk tech? I'm always up for a good conversation." className="contact-heading" />
        <div className="contact-grid">
          <div className="contact-card-reveal" data-contact-reveal>
            <SocialContactCard
              kind="linkedin"
              title="LinkedIn"
              url={CONTACT_CONFIG.linkedin.url}
              subtitle={CONTACT_CONFIG.linkedin.subtitle}
            />
          </div>
          <div className="contact-card-reveal" data-contact-reveal>
            <DirectContactCard kind="email" detail={CONTACT_CONFIG.email} />
          </div>
          <div className="contact-card-reveal" data-contact-reveal>
            <DirectContactCard kind="phone" detail={CONTACT_CONFIG.phone} />
          </div>
          <div className="contact-card-reveal" data-contact-reveal>
            <SocialContactCard
              kind="x"
              title="X (Twitter)"
              url={CONTACT_CONFIG.x.url}
              subtitle={CONTACT_CONFIG.x.subtitle}
            />
          </div>
        </div>
      </div>
      <footer className="contact-footer">
          <span>Thanks for stopping by.</span>
          <a href="#home">
            Back to top<span aria-hidden="true">↑</span>
          </a>
      </footer>
    </section>
  );
}
