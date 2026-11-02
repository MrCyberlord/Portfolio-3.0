// Keyboard data adapted from Naresh Khatri (MIT); skill selection and copy customized.
// See public/licenses/naresh-khatri-3d-portfolio-MIT.txt and design/SKILLS.md.
// Insertion order is the six-column, four-row key layout.
export const SkillNames = {
  JS: "js",
  TS: "ts",
  REACT: "react",
  NEXTJS: "nextjs",
  TAILWIND: "tailwind",
  REDUX: "redux",
  PYTHON: "python",
  FASTAPI: "fastapi",
  NODEJS: "nodejs",
  POSTGRES: "postgres",
  MONGODB: "mongodb",
  EXPRESS: "express",
  LANGGRAPH: "langgraph",
  LANGCHAIN: "langchain",
  RAG: "rag",
  OLLAMA: "ollama",
  PGVECTOR: "pgvector",
  HUGGINGFACE: "huggingface",
  DOCKER: "docker",
  GIT: "git",
  LINUX: "linux",
  AWS: "aws",
  SQLALCHEMY: "sqlalchemy",
  VECTORDB: "vectordb",
} as const;
export type SkillNames = (typeof SkillNames)[keyof typeof SkillNames];
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  keyboardIcon?: string;
  keyboardColor?: string;
  shortcut?: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  js: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription:
      "The language behind interactive web experiences. Connect interfaces, browser APIs, and application logic with a flexible, event-driven foundation.",
    color: "#f0db4f",
    icon: "/assets/keyboard/logos/js.svg",
    keyboardIcon: "/assets/keyboard/logos/js.svg",
    keyboardColor: "#ff9408",
  },
  ts: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "Clear contracts for growing applications. Type-safe code makes complex interfaces and services easier to understand, refactor, and maintain.",
    color: "#007acc",
    icon: "/assets/keyboard/logos/ts.svg",
    keyboardIcon: "/assets/keyboard/logos/ts.svg",
    keyboardColor: "#008fd5",
  },
  react: {
    id: 3,
    name: "react",
    label: "React",
    shortDescription:
      "Interfaces that feel as good as they work. Reusable components, thoughtful state management, and responsive experiences for the web.",
    color: "#61dafb",
    icon: "/assets/keyboard/logos/react.svg",
    keyboardIcon: "/assets/keyboard/logos/react.svg",
    keyboardColor: "#00cce8",
  },
  nextjs: {
    id: 4,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "A framework for connecting React interfaces to production-ready web applications, with flexible rendering, routing, and server-side capabilities.",
    color: "#fff",
    icon: "/assets/keyboard/logos/nextjs.svg",
    keyboardIcon: "/assets/keyboard/logos/nextjs.svg",
    keyboardColor: "#333537",
  },
  tailwind: {
    id: 5,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription:
      "A practical bridge between design and code. Utility-first styling supports consistent spacing, responsive layouts, and reusable visual patterns.",
    color: "#38bdf8",
    icon: "/assets/keyboard/logos/tailwind.svg",
    keyboardIcon: "/assets/keyboard/logos/tailwind.svg",
    keyboardColor: "#00bfd8",
  },
  redux: {
    id: 6,
    name: "redux",
    label: "Redux Toolkit",
    shortDescription:
      "Predictable state for complex React applications. Redux Toolkit organizes shared state, reducers, and asynchronous data flows with concise, maintainable patterns.",
    color: "#764abc",
    icon: "/assets/keyboard/logos/redux.svg",
    keyboardIcon: "/assets/keyboard/logos/redux.svg",
    keyboardColor: "#8556bd",
  },
  python: {
    id: 7,
    name: "python",
    label: "Python",
    shortDescription:
      "A versatile foundation for backend services, automation, and AI applications. Clear syntax and a rich ecosystem connect data processing to practical software.",
    color: "#3776ab",
    icon: "/assets/keyboard/logos/python.svg",
    keyboardIcon: "/assets/keyboard/logos/python.svg",
    keyboardColor: "#c89b2f",
  },
  fastapi: {
    id: 8,
    name: "fastapi",
    label: "FastAPI",
    shortDescription:
      "Typed Python APIs with clear request models and automatic API documentation. Async endpoints connect application logic, databases, and model services.",
    color: "#009688",
    icon: "/assets/keyboard/logos/fastapi.svg",
    keyboardIcon: "/assets/keyboard/logos/fastapi.svg",
    keyboardColor: "#009b8c",
  },
  nodejs: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "JavaScript beyond the browser. An event-driven runtime for APIs, application services, automation, and the tooling that connects a development workflow.",
    color: "#6cc24a",
    icon: "/assets/keyboard/logos/nodejs.svg",
    keyboardIcon: "/assets/keyboard/logos/nodejs.svg",
    keyboardColor: "#00952c",
  },
  postgres: {
    id: 10,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "Reliable data at the heart of an application. Relational modeling and expressive SQL provide a strong foundation for transactional systems and search.",
    color: "#336791",
    icon: "/assets/keyboard/logos/postgres.svg",
    keyboardIcon: "/assets/keyboard/logos/postgres.svg",
    keyboardColor: "#146888",
  },
  mongodb: {
    id: 11,
    name: "mongodb",
    label: "MongoDB",
    shortDescription:
      "Document-oriented storage for evolving application data. Flexible structures and expressive queries support products with varied, nested information.",
    color: "#336791",
    icon: "/assets/keyboard/logos/mongodb.svg",
    keyboardIcon: "/assets/keyboard/logos/mongodb.svg",
    keyboardColor: "#00c51b",
  },
  express: {
    id: 12,
    name: "express",
    label: "Express.js",
    shortDescription:
      "A focused foundation for HTTP services. Routing and middleware make it straightforward to connect application endpoints, validation, and request handling.",
    color: "#fff",
    icon: "/assets/keyboard/logos/express.svg",
    keyboardIcon: "/assets/keyboard/logos/express.svg",
    keyboardColor: "#343638",
  },
  langgraph: {
    id: 13,
    name: "langgraph",
    label: "LangGraph",
    shortDescription:
      "Stateful workflows for applications that use language models and tools. Graph-based orchestration supports branching, persistent state, and human review.",
    color: "#1c8b83",
    icon: "/assets/keyboard/logos/langgraph.svg",
    keyboardIcon: "/assets/keyboard/logos/langgraph.svg",
    keyboardColor: "#268c91",
  },
  langchain: {
    id: 14,
    name: "langchain",
    label: "LangChain",
    shortDescription:
      "Building blocks for connecting language models to prompts, tools, and application data. Compose reusable integrations into practical AI workflows.",
    color: "#1c6659",
    icon: "/assets/keyboard/logos/langchain.svg",
    keyboardIcon: "/assets/keyboard/logos/langchain.svg",
    keyboardColor: "#24745e",
  },
  rag: {
    id: 15,
    name: "rag",
    label: "RAG",
    shortDescription:
      "Retrieval-augmented generation connects model responses to relevant source material. Document ingestion, retrieval, and context assembly ground answers in application data.",
    color: "#527de8",
    icon: "/assets/keyboard/logos/rag.svg",
    keyboardIcon: "/assets/keyboard/logos/rag.svg",
    keyboardColor: "#426dd0",
  },
  ollama: {
    id: 16,
    name: "ollama",
    label: "Ollama",
    shortDescription:
      "Run and integrate language models locally through a consistent interface. Local inference supports experimentation and AI features without a hosted model dependency.",
    color: "#d7dde8",
    icon: "/assets/keyboard/logos/ollama.svg",
    keyboardIcon: "/assets/keyboard/logos/ollama.svg",
    keyboardColor: "#44485b",
  },
  pgvector: {
    id: 17,
    name: "pgvector",
    label: "pgvector",
    shortDescription:
      "Vector similarity search alongside relational data in PostgreSQL. Store embeddings and combine semantic retrieval with SQL filters and existing application records.",
    color: "#5873ad",
    icon: "/assets/keyboard/logos/pgvector.svg",
    keyboardIcon: "/assets/keyboard/logos/pgvector.svg",
    keyboardColor: "#596ca9",
  },
  huggingface: {
    id: 18,
    name: "huggingface",
    label: "Hugging Face",
    shortDescription:
      "An ecosystem of models, datasets, and tools for machine learning. Explore pretrained models and connect transformer-based capabilities to AI applications.",
    color: "#ffd21e",
    icon: "/assets/keyboard/logos/huggingface.svg",
    keyboardIcon: "/assets/keyboard/logos/huggingface.svg",
    keyboardColor: "#d9a62c",
  },
  docker: {
    id: 19,
    name: "docker",
    label: "Docker",
    shortDescription:
      "A consistent environment, from development onward. Containerized applications and services are easier to run, share, and ship across different machines.",
    color: "#2496ed",
    icon: "/assets/keyboard/logos/docker.svg",
    keyboardIcon: "/assets/keyboard/logos/docker.svg",
    keyboardColor: "#009fe8",
  },
  git: {
    id: 20,
    name: "git",
    label: "Git",
    shortDescription:
      "A history that makes collaboration possible. Version control supports focused changes, reviewable branches, and a reliable path through a project's evolution.",
    color: "#f1502f",
    icon: "/assets/keyboard/logos/git.svg",
    keyboardIcon: "/assets/keyboard/logos/git.svg",
    keyboardColor: "#ff4622",
  },
  linux: {
    id: 21,
    name: "linux",
    label: "Linux",
    shortDescription:
      "A dependable environment for development and deployment. Command-line tools and transparent system controls make services easier to run and understand.",
    color: "#fff",
    icon: "/assets/keyboard/logos/linux.svg",
    keyboardIcon: "/assets/keyboard/logos/linux.svg",
    keyboardColor: "#333537",
  },
  aws: {
    id: 22,
    name: "aws",
    label: "AWS",
    shortDescription:
      "A broad set of building blocks for cloud applications. Compute, storage, and managed services can be composed around the needs of a system.",
    color: "#ff9900",
    icon: "/assets/keyboard/logos/aws.svg",
    keyboardIcon: "/assets/keyboard/logos/aws.svg",
    keyboardColor: "#ff9208",
  },
  sqlalchemy: {
    id: 23,
    name: "sqlalchemy",
    label: "SQLAlchemy",
    shortDescription:
      "A Python toolkit for connecting application code to relational databases. Explicit queries, object mapping, and transaction management keep data access organized.",
    color: "#d55252",
    icon: "/assets/keyboard/logos/sqlalchemy.svg",
    keyboardIcon: "/assets/keyboard/logos/sqlalchemy.svg",
    keyboardColor: "#a84b60",
  },
  vectordb: {
    id: 24,
    name: "vectordb",
    label: "Vector Databases",
    shortDescription:
      "Storage and retrieval built around embeddings. Similarity search and metadata filtering help applications find related content across large collections.",
    color: "#9674da",
    icon: "/assets/keyboard/logos/vectordb.svg",
    keyboardIcon: "/assets/keyboard/logos/vectordb.svg",
    keyboardColor: "#8055b5",
  },
};
