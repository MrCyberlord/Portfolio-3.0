import SectionIntro from "../SectionIntro";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "./experience";
import type { Experience, ExperienceId, ImpactMetric } from "./experience";
import "./experience.css";

gsap.registerPlugin(ScrollTrigger);

function CompanyGlyph({ id }: { id: ExperienceId }) {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {id === "luxia" && (
          <>
            <path d="M7 5h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-6l-6 4v-4H7a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
            <path d="m10 10 4 7 4-7M10 14h8" />
          </>
        )}
        {id === "magnibot" && (
          <>
            <path d="M4 22V8l10 10L24 8v14M4 8V5l10 10L24 5v3" />
            <path d="M9 22v-5m10 5v-5" />
          </>
        )}
        {id === "informist" && (
          <>
            <rect x="5" y="4" width="18" height="20" rx="3" />
            <path d="M10 9h8M10 14h8M10 19h4" />
            <path d="M2 8v12" />
          </>
        )}
      </g>
    </svg>
  );
}

function ImpactArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12h15m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Impact({ metric }: { metric: ImpactMetric }) {
  return (
    <li className="experience-impact">
      <div className="experience-impact-value">
        {metric.before && (
          <>
            <span className="experience-impact-before">{metric.before}</span>
            <ImpactArrow />
            <span className="experience-sr-only">to</span>
          </>
        )}
        <strong>{metric.value}</strong>
        <span className="experience-impact-unit">{metric.unit}</span>
      </div>
      <p>{metric.label}</p>
    </li>
  );
}

function ExperienceChapter({
  item,
  index,
  active,
}: {
  item: Experience;
  index: number;
  active: boolean;
}) {
  return (
    <li
      className="experience-chapter"
      id={`experience-${item.id}`}
      tabIndex={-1}
      data-current={active}
      style={{ "--experience-accent": item.accent } as CSSProperties}
      aria-labelledby={`experience-company-${item.id}`}
    >
      <span className="experience-timeline-node" aria-hidden="true">
        <i />
      </span>
      <div className="experience-card-reveal" data-experience-reveal>
        <article className="experience-card">
          <div className="experience-card-top">
            <span className="experience-chapter-label">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.chapter}
            </span>
            <p className="experience-period">
              <time dateTime={item.start.iso}>{item.start.label}</time>
              <span aria-hidden="true">—</span>
              <span className="experience-sr-only">to</span>
              <time dateTime={item.end.iso}>{item.end.label}</time>
            </p>
          </div>
          <header className="experience-company-header">
            <span className="experience-company-glyph">
              <CompanyGlyph id={item.id} />
            </span>
            <div>
              <h3 id={`experience-company-${item.id}`}>{item.company}</h3>
              <p className="experience-role">
                {item.role}
                {item.focus && (
                  <span className="experience-focus">{item.focus}</span>
                )}
              </p>
            </div>
          </header>
          {item.employment && (
            <p className="experience-employment">
              <span aria-hidden="true">↳</span>
              {item.employment}
            </p>
          )}
          <p className="experience-description">{item.description}</p>
          <ul
            className="experience-highlights"
            aria-label={`${item.company} contributions`}
          >
            {item.highlights.map((highlight) => (
              <li key={highlight.title}>
                <span
                  className="experience-highlight-mark"
                  aria-hidden="true"
                />
                <div>
                  <strong>{highlight.title}</strong>
                  <p>{highlight.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="experience-impact-heading">
            <span />
            THE IMPACT
          </div>
          <ul
            className={`experience-impacts ${item.metrics.length === 1 ? "experience-impacts-single" : ""}`}
            aria-label={`${item.company} measurable achievements`}
          >
            {item.metrics.map((metric) => (
              <Impact key={metric.label} metric={metric} />
            ))}
          </ul>
          <ul
            className="experience-tech"
            aria-label={`${item.company} technologies`}
          >
            {item.tech.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </article>
      </div>
    </li>
  );
}

export default function ExperienceSection() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = 0;
      const chapters = root.querySelectorAll<HTMLElement>(
        ".experience-chapter",
      );
      chapters.forEach((chapter, index) => {
        if (chapter.getBoundingClientRect().top <= innerHeight * 0.4)
          current = index;
      });
      // The final chapter may be too short to reach the viewport's reading
      // line before the page ends. Keep its index accurate at the bottom.
      if (
        scrollY >= document.documentElement.scrollHeight - innerHeight - 2 &&
        root.getBoundingClientRect().top < innerHeight
      )
        current = chapters.length - 1;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        for (const card of root.querySelectorAll<HTMLElement>(
          "[data-experience-reveal]",
        )) {
          gsap.from(card, {
            y: 26,
            autoAlpha: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          });
        }
        const timeline = root.querySelector(".experience-timeline");
        const progress = root.querySelector(".experience-timeline-progress");
        if (timeline && progress)
          gsap.fromTo(
            progress,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: timeline,
                start: "top 65%",
                end: "bottom bottom-=40px",
                scrub: 0.45,
              },
            },
          );
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  const goToChapter = (
    event: MouseEvent<HTMLAnchorElement>,
    id: ExperienceId,
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    const chapter = document.getElementById(`experience-${id}`);
    chapter?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    chapter?.focus({ preventScroll: true });
  };

  return (
    <section
      id="experience"
      ref={section}
      className="experience-section"
      tabIndex={-1}
      aria-labelledby="experience-section-title"
    >
      <div className="experience-inner">
        <SectionIntro id="experience-section-title" number="04" title="THE JOURNEY" summary="4+ years of building products, solving problems and turning ideas into real-world products." className="experience-heading" reveal="experience" />
        <div className="experience-layout">
          <aside className="experience-index" aria-label="Career chapter index">
            <div className="experience-index-orbit" aria-hidden="true">
              <span />
              <i />
              <b />
            </div>
            <p className="experience-index-label">
              A JOURNEY IN
              <br />
              <span>THREE CHAPTERS.</span>
            </p>
            <p className="experience-index-direction">
              Recent work to foundations
            </p>
            <nav aria-label="Experience chapters">
              {EXPERIENCE.map((item, index) => (
                <a
                  key={item.id}
                  href={`#experience-${item.id}`}
                  aria-current={active === index ? "location" : undefined}
                  onClick={(event) => goToChapter(event, item.id)}
                  style={
                    { "--experience-accent": item.accent } as CSSProperties
                  }
                >
                  <span className="experience-index-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="experience-index-company">
                    {item.company}
                    <small>{item.years}</small>
                  </span>
                  <span className="experience-index-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </nav>
            <p className="experience-index-note">
              From strong foundations
              <br />
              to conversational AI.
            </p>
          </aside>
          <div className="experience-timeline">
            <div className="experience-timeline-track" aria-hidden="true">
              <span className="experience-timeline-progress" />
            </div>
            <ol
              className="experience-chapters"
              aria-label="Professional experience, most recent first"
            >
              {EXPERIENCE.map((item, index) => (
                <ExperienceChapter
                  key={item.id}
                  item={item}
                  index={index}
                  active={active === index}
                />
              ))}
            </ol>
            <p className="experience-foundation">
              <span />
              December 2021 / The starting point
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
