import type { Project, ProjectId } from "./projects";

export function ProjectGlyph({ id }: { id: ProjectId }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {id === "researchlab" && (
          <>
            <path d="m7 7 10 10M7 17 17 7" />
            <rect x="3" y="3" width="6" height="6" rx="2" />
            <rect x="15" y="3" width="6" height="6" rx="2" />
            <rect x="3" y="15" width="6" height="6" rx="2" />
            <rect x="15" y="15" width="6" height="6" rx="2" />
          </>
        )}
        {id === "rivaliq" && (
          <>
            <path d="M4 20V10m8 10V4m8 16v-7M2 20h20" />
            <path d="m3 6 6-3 6 5 6-5" />
          </>
        )}
        {id === "runningo" && (
          <>
            <circle cx="5" cy="18" r="3" />
            <circle cx="19" cy="6" r="3" />
            <path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8" />
          </>
        )}
        {id === "explainbot" && (
          <>
            <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8l-6 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
            <path d="M8 9h8M8 13h5" />
          </>
        )}
      </g>
    </svg>
  );
}

function ResearchPreview() {
  return (
    <div className="project-window project-research-window">
      <div className="project-window-bar">
        <span className="project-window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>researchlab / workspace</span>
        <span className="project-window-status" />
      </div>
      <div className="project-research-body">
        <div className="project-document-rail">
          <span className="project-mini-label">LIBRARY</span>
          <span className="project-document">
            <i /> Research notes
          </span>
          <span className="project-document">
            <i /> Source material
          </span>
          <div className="project-rail-lines">
            <i />
            <i />
            <i />
          </div>
          <span className="project-local-note">
            <i /> Local-first
          </span>
        </div>
        <div className="project-research-chat">
          <div className="project-preview-tabs">
            <span>Document RAG</span>
            <span>Agentic workflow</span>
          </div>
          <strong>
            A question.
            <br />
            Two ways to explore.
          </strong>
          <div className="project-prompt">
            Ask across your research.<span>↗</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RivalPreview() {
  return (
    <div className="project-window project-rival-window">
      <div className="project-window-bar">
        <span className="project-window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>rivaliq / intelligence</span>
      </div>
      <div className="project-chart-heading">
        <span className="project-mini-label">THE COMPETITIVE PICTURE</span>
        <strong>Signals into strategy.</strong>
      </div>
      <div className="project-chart">
        <svg
          viewBox="0 0 420 138"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="project-chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#8b9fff" stopOpacity=".3" />
              <stop offset="1" stopColor="#8b9fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 35H420M0 80H420M0 125H420"
            stroke="#b2c2fa"
            strokeOpacity=".12"
            strokeDasharray="4 6"
          />
          <path
            d="M0 105C35 105 35 55 70 65S120 108 155 72 190 95 225 50 280 70 315 32 365 64 420 12V138H0Z"
            fill="url(#project-chart-fill)"
          />
          <path
            d="M0 105C35 105 35 55 70 65S120 108 155 72 190 95 225 50 280 70 315 32 365 64 420 12"
            stroke="#aab4ff"
            strokeWidth="3"
          />
          <path
            d="M0 119C70 92 90 130 155 98S240 111 300 79 360 92 420 52"
            stroke="#70d9ef"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        </svg>
      </div>
      <div className="project-signal-row">
        <span>
          <i /> Market signals
        </span>
        <span>
          <i /> Pricing intelligence
        </span>
      </div>
    </div>
  );
}

function RoutePreview() {
  return (
    <div className="project-window project-route-window">
      <div className="project-window-bar">
        <span className="project-window-dots">
          <i />
          <i />
          <i />
        </span>
        <span>runningo / your next route</span>
      </div>
      <svg
        className="project-route-map"
        viewBox="0 0 440 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 25 100 10 145 70 95 110 15 80ZM250 95 315 60 400 90 380 170 300 185Z"
          fill="#1f585a"
          fillOpacity=".5"
        />
        <g stroke="#6f9fbb" strokeOpacity=".2" strokeWidth="9">
          <path d="m-10 125 130-25 130 120M60-10l55 95 170-25L430 5M440 170l-150-50-85 130M175-10l-15 80L15 220M340-10l-80 65 180 60" />
        </g>
        <path
          d="M95 170c-35-30-30-76 22-82l92-12c28-3 43 4 59 27l39 51c20 26-4 49-35 37l-67-28c-39-16-53 38-94 16Z"
          stroke="#81dcca"
          strokeOpacity=".13"
          strokeWidth="16"
        />
        <path
          d="M95 170c-35-30-30-76 22-82l92-12c28-3 43 4 59 27l39 51c20 26-4 49-35 37l-67-28c-39-16-53 38-94 16Z"
          stroke="#91ead7"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx="95"
          cy="170"
          r="7"
          fill="#b8f5e4"
          stroke="#16423e"
          strokeWidth="3"
        />
        <circle
          cx="251"
          cy="91"
          r="6"
          fill="#123849"
          stroke="#81dcca"
          strokeWidth="3"
        />
      </svg>
      <span className="project-map-label">
        A little greener. A little further.
      </span>
    </div>
  );
}

function ExplainPreview() {
  return (
    <div className="project-explain-art">
      <div className="project-question-bubble">
        <span className="project-mini-label">YOUR QUESTION</span>
        <strong>A complex idea…</strong>
        <span className="project-message-lines">
          <i />
          <i />
        </span>
      </div>
      <div className="project-answer-bubble">
        <span className="project-bot-mark">
          <ProjectGlyph id="explainbot" />
        </span>
        <span className="project-mini-label">A FRESH PERSPECTIVE</span>
        <strong>…a simpler explanation.</strong>
        <span className="project-message-lines">
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  );
}

export default function ProjectPreview({ project }: { project: Project }) {
  return (
    <figure
      className={`project-preview project-preview--${project.id} ${project.preview ? "project-preview--image" : ""}`}
    >
      <div className="project-preview-float" data-project-parallax>
        {project.preview ? (
          <img
            src={project.preview.src}
            alt={project.preview.alt}
            loading="lazy"
            decoding="async"
            width="960"
            height="640"
          />
        ) : (
          <div className="project-preview-illustration" aria-hidden="true">
            {project.id === "researchlab" && <ResearchPreview />}
            {project.id === "rivaliq" && <RivalPreview />}
            {project.id === "runningo" && <RoutePreview />}
            {project.id === "explainbot" && <ExplainPreview />}
            <span className="project-floating-chip">
              <ProjectGlyph id={project.id} />
              {project.id === "researchlab"
                ? "Grounded in your documents"
                : project.id === "rivaliq"
                  ? "A clearer competitive edge"
                  : project.id === "runningo"
                    ? "Scenery. Stops. Your pace."
                    : "Powered by a local model"}
            </span>
          </div>
        )}
      </div>
      <figcaption>
        {project.preview
          ? `${project.title} preview`
          : "Illustrative preview · screenshot coming soon"}
      </figcaption>
    </figure>
  );
}
