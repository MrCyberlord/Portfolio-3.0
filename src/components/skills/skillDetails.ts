import type { KeyboardSkill } from "./reference/scene";
import type { SkillNames } from "./reference/skills";
export type SkillDetails = {
  category: string;
  description: string;
  uses: readonly string[];
};
// Panel copy stays independent of keyboard geometry and materials.
export const SKILL_DETAILS: Record<SkillNames, SkillDetails> = {
  js: {
    category: "Languages",
    description:
      "The language behind interactive web experiences. Connect interfaces, browser APIs, and application logic with a flexible, event-driven foundation.",
    uses: ["Browser interactions", "Application logic", "Async workflows"],
  },
  ts: {
    category: "Languages",
    description:
      "Clear contracts for growing applications. Type-safe code makes complex interfaces and services easier to understand, refactor, and maintain.",
    uses: ["Type-safe applications", "API contracts", "Developer tooling"],
  },
  react: {
    category: "Frontend",
    description:
      "Interfaces that feel as good as they work. Reusable components, thoughtful state management, and responsive experiences for the web.",
    uses: ["Component systems", "Interactive UI", "Responsive design"],
  },
  nextjs: {
    category: "Full-stack",
    description:
      "A framework for connecting React interfaces to production-ready web applications, with flexible rendering, routing, and server-side capabilities.",
    uses: ["Application routing", "Server rendering", "Full-stack experiences"],
  },
  tailwind: {
    category: "Frontend / Design",
    description:
      "A practical bridge between design and code. Utility-first styling supports consistent spacing, responsive layouts, and reusable visual patterns.",
    uses: ["Responsive layouts", "Design systems", "Interface styling"],
  },
  redux: {
    category: "Frontend / State",
    description:
      "Predictable state for complex React applications. Redux Toolkit organizes shared state, reducers, and asynchronous data flows with concise, maintainable patterns.",
    uses: [
      "Shared application state",
      "Async data fetching",
      "Predictable updates",
    ],
  },
  python: {
    category: "Languages",
    description:
      "A versatile foundation for backend services, automation, and AI applications. Clear syntax and a rich ecosystem connect data processing to practical software.",
    uses: ["AI application logic", "Backend services", "Automation scripts"],
  },
  fastapi: {
    category: "Backend",
    description:
      "Typed Python APIs with clear request models and automatic API documentation. Async endpoints connect application logic, databases, and model services.",
    uses: ["Typed REST APIs", "Request validation", "Async services"],
  },
  nodejs: {
    category: "Backend",
    description:
      "JavaScript beyond the browser. An event-driven runtime for APIs, application services, automation, and the tooling that connects a development workflow.",
    uses: ["Backend services", "API development", "Automation"],
  },
  postgres: {
    category: "Data",
    description:
      "Reliable data at the heart of an application. Relational modeling and expressive SQL provide a strong foundation for transactional systems and search.",
    uses: ["Relational data", "SQL queries", "Data modeling"],
  },
  mongodb: {
    category: "Data",
    description:
      "Document-oriented storage for evolving application data. Flexible structures and expressive queries support products with varied, nested information.",
    uses: ["Document data", "Flexible schemas", "Application queries"],
  },
  express: {
    category: "Backend",
    description:
      "A focused foundation for HTTP services. Routing and middleware make it straightforward to connect application endpoints, validation, and request handling.",
    uses: ["REST APIs", "Request middleware", "Service integration"],
  },
  langgraph: {
    category: "AI / Agents",
    description:
      "Stateful workflows for applications that use language models and tools. Graph-based orchestration supports branching, persistent state, and human review.",
    uses: [
      "Agent orchestration",
      "Stateful workflows",
      "Human-in-the-loop flows",
    ],
  },
  langchain: {
    category: "AI / LLMs",
    description:
      "Building blocks for connecting language models to prompts, tools, and application data. Compose reusable integrations into practical AI workflows.",
    uses: ["Model integrations", "Tool calling", "Retrieval pipelines"],
  },
  rag: {
    category: "AI / Retrieval",
    description:
      "Retrieval-augmented generation connects model responses to relevant source material. Document ingestion, retrieval, and context assembly ground answers in application data.",
    uses: ["Document ingestion", "Context retrieval", "Grounded generation"],
  },
  ollama: {
    category: "AI / Local Models",
    description:
      "Run and integrate language models locally through a consistent interface. Local inference supports experimentation and AI features without a hosted model dependency.",
    uses: [
      "Local model serving",
      "Model experimentation",
      "Local AI workflows",
    ],
  },
  pgvector: {
    category: "Data / Vector Search",
    description:
      "Vector similarity search alongside relational data in PostgreSQL. Store embeddings and combine semantic retrieval with SQL filters and existing application records.",
    uses: ["Embedding storage", "Similarity queries", "Hybrid SQL retrieval"],
  },
  huggingface: {
    category: "AI / Models",
    description:
      "An ecosystem of models, datasets, and tools for machine learning. Explore pretrained models and connect transformer-based capabilities to AI applications.",
    uses: [
      "Pretrained models",
      "Dataset workflows",
      "Transformer integrations",
    ],
  },
  docker: {
    category: "Infrastructure",
    description:
      "A consistent environment, from development onward. Containerized applications and services are easier to run, share, and ship across different machines.",
    uses: ["Containers", "Reproducible environments", "Service composition"],
  },
  git: {
    category: "Developer tooling",
    description:
      "A history that makes collaboration possible. Version control supports focused changes, reviewable branches, and a reliable path through a project's evolution.",
    uses: ["Version control", "Code collaboration", "Change tracking"],
  },
  linux: {
    category: "Systems",
    description:
      "A dependable environment for development and deployment. Command-line tools and transparent system controls make services easier to run and understand.",
    uses: ["Server environments", "Shell workflows", "System administration"],
  },
  aws: {
    category: "Cloud",
    description:
      "A broad set of building blocks for cloud applications. Compute, storage, and managed services can be composed around the needs of a system.",
    uses: ["Cloud infrastructure", "Compute and storage", "Managed services"],
  },
  sqlalchemy: {
    category: "Backend / Data",
    description:
      "A Python toolkit for connecting application code to relational databases. Explicit queries, object mapping, and transaction management keep data access organized.",
    uses: [
      "ORM data models",
      "Composable SQL queries",
      "Transactions and sessions",
    ],
  },
  vectordb: {
    category: "Data / Vector Search",
    description:
      "Storage and retrieval built around embeddings. Similarity search and metadata filtering help applications find related content across large collections.",
    uses: ["Semantic search", "Embedding indexes", "Metadata filtering"],
  },
};
export function getSkillDetails(skill: KeyboardSkill): SkillDetails {
  if (Object.hasOwn(SKILL_DETAILS, skill.name))
    return SKILL_DETAILS[skill.name as SkillNames];
  return {
    category: "Technology",
    description: skill.shortDescription,
    uses: [],
  };
}
