import SectionIntro from "../SectionIntro";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "./projects";
import type { Project } from "./projects";
import ProjectPreview, { ProjectGlyph } from "./ProjectPreview";
import "./projects.css";

gsap.registerPlugin(ScrollTrigger);

function LinkArrow() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 18 18 6M6 6h12v12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const FEATURED_DESKTOP_OUTLINE =
  "M32 4H600Q628 4 628 26V28Q628 46 650 46Q676 46 676 25V24Q676 4 700 4H842Q868 4 868 28V46H966Q996 46 996 76V360Q996 392 964 392H36Q4 392 4 360V34Q4 4 32 4Z";
const FEATURED_MOBILE_OUTLINE =
  "M80 4H550Q616 4 616 18V20Q616 32 650 32Q680 32 680 18V16Q680 4 728 4H928Q992 4 992 30V366Q992 392 920 392H80Q8 392 8 366V20Q8 4 80 4Z";

function FeaturedPlate() {
  return (
    <svg
      className="project-featured-plate"
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="project-featured-material"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop stopColor="#376889" />
          <stop offset=".55" stopColor="#254f70" />
          <stop offset="1" stopColor="#153852" />
        </linearGradient>
      </defs>
      {[
        ["desktop", FEATURED_DESKTOP_OUTLINE],
        ["mobile", FEATURED_MOBILE_OUTLINE],
      ].map(([name, d]) => (
        <g key={name} className={`project-featured-outline-${name}`}>
          <path
            d={d}
            transform="translate(0 6)"
            fill="#0d273f"
            stroke="#406884"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={d}
            fill="url(#project-featured-material)"
            stroke="#80b2d0"
            strokeOpacity=".6"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}

function FeaturedPanelShape() {
  return (
    <svg
      className="project-featured-panel-shape"
      viewBox="0 0 400 280"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="project-featured-inset" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#142f4d" />
          <stop offset="1" stopColor="#091e35" />
        </linearGradient>
      </defs>
      <path
        d="M18 24H180Q196 24 196 11Q196 1 212 1H380Q399 1 399 20V260Q399 279 380 279H20Q1 279 1 260V43Q1 24 18 24Z"
        fill="url(#project-featured-inset)"
        stroke="#739dbd"
        strokeOpacity=".55"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      className={`project-card project-card--${project.id} ${project.featured ? "project-card--featured" : ""}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
      aria-labelledby={`project-title-${project.id}`}
      data-project-reveal
    >
      {project.featured && <FeaturedPlate />}
      {project.featured && (
        <span className="project-featured-label">
          <i /> FEATURED
        </span>
      )}
      <div className="project-card-surface">
        <div className="project-card-top">
          <span className="project-category">
            <ProjectGlyph id={project.id} />
            {project.category}
          </span>
          <span className="project-card-number">
            {String(index + 1).padStart(2, "0")} <span>/ 04</span>
          </span>
        </div>
        <div className="project-card-grid">
          {project.featured && (
            <div className="project-featured-visual">
              <h3 id={`project-title-${project.id}`}>{project.title}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <ProjectPreview project={project} />
            </div>
          )}
          <div className="project-card-copy">
            {project.featured ? (
              <>
                <FeaturedPanelShape />
                <span className="project-featured-panel-label">
                  THE WORKSPACE
                </span>
              </>
            ) : (
              <>
                <h3 id={`project-title-${project.id}`}>{project.title}</h3>
                <p className="project-tagline">{project.tagline}</p>
              </>
            )}
            <p className="project-description">{project.description}</p>
            <ul
              className="project-stack"
              aria-label={`${project.title} technologies`}
            >
              {project.stack.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
              >
                <GitHubMark />
                <span>View on GitHub</span>
                <LinkArrow />
              </a>
              {project.demo && (
                <a
                  className="project-demo-link"
                  href={project.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.demo.label}: ${project.title} (opens in a new tab)`}
                >
                  {project.demo.label}
                  <LinkArrow />
                </a>
              )}
            </div>
          </div>
          {!project.featured && <ProjectPreview project={project} />}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        for (const item of element.querySelectorAll<HTMLElement>(
          "[data-project-reveal]",
        )) {
          gsap.from(item, {
            y: 32,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 94%", once: true },
          });
        }
      }, element);
      return () => context.revert();
    });
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const cleanups: (() => void)[] = [];
        const context = gsap.context(() => {
          for (const card of element.querySelectorAll<HTMLElement>(
            ".project-card",
          )) {
            const artwork = card.querySelector<HTMLElement>(
              "[data-project-parallax]",
            );
            if (!artwork) continue;
            const x = gsap.quickTo(artwork, "x", {
              duration: 0.7,
              ease: "power2.out",
            });
            const y = gsap.quickTo(artwork, "y", {
              duration: 0.7,
              ease: "power2.out",
            });
            const move = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              const bounds = card.getBoundingClientRect();
              x(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
              y(((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
            };
            const reset = () => {
              x(0);
              y(0);
            };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", reset);
            cleanups.push(() => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", reset);
              x.tween.kill();
              y.tween.kill();
              gsap.set(artwork, { clearProps: "transform" });
            });
          }
        }, element);
        return () => {
          cleanups.forEach((cleanup) => cleanup());
          context.revert();
        };
      },
    );
    return () => media.revert();
  }, []);

  return (
    <section
      id="projects"
      className="projects-section"
      ref={section}
      tabIndex={-1}
      aria-labelledby="projects-title"
    >
      <div className="projects-inner">
        <SectionIntro id="projects-title" number="03" title="THE BUILD LOG" summary="Experiments, built into tools." className="projects-heading" reveal="project" />
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <p className="projects-closing">
          <span />
          Built with curiosity. Always a work in progress.
        </p>
      </div>
    </section>
  );
}
