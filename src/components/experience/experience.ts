export type ExperienceId = "luxia" | "magnibot" | "informist";

export type ImpactMetric = {
  before?: string;
  value: string;
  unit: string;
  label: string;
};

export type Experience = {
  id: ExperienceId;
  company: string;
  role: string;
  focus?: string;
  start: { iso: string; label: string };
  end: { iso: string; label: string };
  years: string;
  employment?: string;
  chapter: string;
  accent: string;
  description: string;
  highlights: readonly { title: string; text: string }[];
  metrics: readonly ImpactMetric[];
  tech: readonly string[];
};

// Supplied career history, in reverse chronological order. No role is marked current.
export const EXPERIENCE: readonly Experience[] = [
  {
    id: "luxia",
    company: "Luxia AI",
    role: "Full-Stack Developer",
    focus: "Frontend-Focused",
    start: { iso: "2025-01", label: "January 2025" },
    end: { iso: "2026-04", label: "April 2026" },
    years: "2025 — 2026",
    employment: "Through Anlage Infotech / Eigenlytics",
    chapter: "Conversational AI",
    accent: "#8bdcff",
    description:
      "Built and enhanced AI-powered conversational experiences, focusing on frontend architecture, performance and seamless user interactions.",
    highlights: [
      {
        title: "Interactive interfaces",
        text: "React, TypeScript and Redux Toolkit chat interfaces and embeddable widgets.",
      },
      {
        title: "Multimodal experiences",
        text: "Interactive 3D avatars, voice interactions and customizable chat experiences.",
      },
      {
        title: "Full-stack integration",
        text: "Frontend and backend work with NestJS, PostgreSQL and REST APIs.",
      },
      {
        title: "Product polish",
        text: "Responsive layouts, theme customization and application reliability.",
      },
    ],
    metrics: [
      {
        before: "900",
        value: "520",
        unit: "ms",
        label: "Approx. API p95 response time",
      },
    ],
    tech: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "NestJS",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
  },
  {
    id: "magnibot",
    company: "Magnibot",
    role: "Software Developer",
    start: { iso: "2022-08", label: "August 2022" },
    end: { iso: "2024-12", label: "December 2024" },
    years: "2022 — 2024",
    chapter: "Performance & craft",
    accent: "#b8beff",
    description:
      "Developed and optimized modern web applications with an emphasis on performance, maintainability and user experience.",
    highlights: [
      {
        title: "Frontend delivery",
        text: "Responsive features using React, Next.js and JavaScript.",
      },
      {
        title: "Reusable foundations",
        text: "Shared components and maintainable application architecture.",
      },
      {
        title: "Connected applications",
        text: "API integrations and frontend optimizations across the product.",
      },
    ],
    metrics: [
      {
        before: "1.8",
        value: "1.2",
        unit: "MB",
        label: "Approx. application payload",
      },
      { value: "~20", unit: "%", label: "Frontend performance improvement" },
    ],
    tech: ["React", "Next.js", "JavaScript", "TypeScript"],
  },
  {
    id: "informist",
    company: "Informist",
    role: "Software Developer",
    start: { iso: "2021-12", label: "December 2021" },
    end: { iso: "2022-07", label: "July 2022" },
    years: "2021 — 2022",
    chapter: "The foundations",
    accent: "#90deca",
    description:
      "Started my professional journey building performant interfaces and learning how production applications are developed, deployed and maintained.",
    highlights: [
      {
        title: "Interface foundations",
        text: "Responsive web interfaces built with TypeScript and Tailwind CSS.",
      },
      {
        title: "Production workflows",
        text: "Helped streamline AWS rollback workflows and improve page-load performance.",
      },
    ],
    metrics: [
      { value: "~40", unit: "%", label: "Page-load performance improvement" },
      {
        before: "20",
        value: "8",
        unit: "min",
        label: "Approx. AWS rollback time",
      },
    ],
    tech: ["TypeScript", "Tailwind CSS", "AWS"],
  },
];
