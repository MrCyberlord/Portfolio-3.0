export type ProjectId = "researchlab" | "rivaliq" | "runningo" | "explainbot";

export type Project = {
  id: ProjectId;
  title: string;
  tagline: string;
  description: string;
  category: string;
  stack: readonly string[];
  github: string;
  accent: string;
  featured?: boolean;
  preview?: { src: string; alt: string };
  demo?: { url: string; label: "Live demo" | "Watch demo" };
};

// Previews and demos are optional: add real screenshots/verified demo URLs here.
export const PROJECTS: readonly Project[] = [
  {
    id: "researchlab",
    title: "ResearchLab",
    tagline: "Two AI architectures. One research workspace.",
    description:
      "A local-first AI research platform combining document-grounded RAG with LangGraph-powered agentic workflows. Features hybrid retrieval, reranking, validated citations and an evaluation dashboard to compare both approaches.",
    category: "AI research workspace",
    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "LangGraph",
      "Ollama",
    ],
    github: "https://github.com/MrCyberlord/ResearchLab",
    accent: "#7ddcff",
    featured: true,
  },
  {
    id: "rivaliq",
    title: "RivalIQ",
    tagline: "Turn competitor data into actionable intelligence.",
    description:
      "An AI-powered competitor intelligence platform for online sellers combining Google Shopping data, local LLM analysis, pricing predictions and workflow orchestration.",
    category: "Commerce intelligence",
    stack: ["React", "FastAPI", "MongoDB", "Gemma 3", "TabPFN", "Mastra"],
    github: "https://github.com/MrCyberlord/RivalIQ",
    accent: "#aab4ff",
  },
  {
    id: "runningo",
    title: "Runningo",
    tagline: "Less scrolling. More running.",
    description:
      "An AI-assisted walking and jogging route planner that transforms natural-language preferences into pedestrian routes based on duration, scenery and planned stops.",
    category: "AI route planning",
    stack: ["React", "FastAPI", "Leaflet", "OpenStreetMap", "OSRM", "Ollama"],
    github: "https://github.com/MrCyberlord/RunningApp",
    accent: "#81dcca",
  },
  {
    id: "explainbot",
    title: "ExplainBot",
    tagline: "Complex ideas. Simpler explanations.",
    description:
      "A lightweight AI explainer using a locally running language model to make difficult concepts easier to understand.",
    category: "Local AI explainer",
    stack: ["Python", "FastAPI", "Ollama", "Gemma"],
    github: "https://github.com/MrCyberlord/ExplainBot",
    accent: "#9acaff",
  },
];
