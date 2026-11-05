export type ExperienceId = "anlage" | "magnibot" | "informist";

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
  metrics: readonly ImpactMetric[];
  tech: readonly string[];
};

// Supplied career history, in reverse chronological order. No role is marked current.
export const EXPERIENCE: readonly Experience[] = [
  {
    id: "anlage",
    company: "Anlage Infotech",
    role: "Full-Stack Developer",
    start: { iso: "2025-01", label: "January 2025" },
    end: { iso: "2026-04", label: "April 2026" },
    years: "2025 — 2026",
    chapter: "Conversational AI",
    accent: "#8bdcff",
    description:
      "Built AI-powered conversational experiences using React, TypeScript, NestJS and PostgreSQL, focusing on interactive interfaces, 3D avatars and application performance.",
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
      "Developed responsive web applications using React, Next.js and JavaScript, building reusable components, integrating APIs and optimizing frontend performance and maintainability.",
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
      "Built responsive web interfaces using TypeScript and Tailwind CSS, improved page-load performance and helped streamline AWS rollback workflows for production applications.",
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
