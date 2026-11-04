import SectionIntro from "../SectionIntro";
import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useRef,
  useState,
} from "react";
import type { CSSProperties, ReactNode } from "react";
import { SKILLS } from "./reference/skills";
import type { KeyboardSkill } from "./reference/scene";
import { useKeyboardSounds } from "./reference/use-keyboard-sounds";
import { useSkillsEnvironment } from "./useSkillsEnvironment";
import SkillDetailsPanel from "./SkillDetailsPanel";
import { getSkillDetails } from "./skillDetails";
import "./skills.css";

const ReferenceKeyboard = lazy(() => import("./ReferenceKeyboard"));
const skills = Object.values(SKILLS);
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function SkillsSection() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const environment = useSkillsEnvironment(section, stage);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [pinned, setPinned] = useState<KeyboardSkill | null>(null);
  const [preview, setPreview] = useState<KeyboardSkill | null>(null);
  const displayed = preview ?? pinned;
  const playSound = useKeyboardSounds(environment.nearby, false);
  const fallback = failed || environment.webgl === false;
  const showScene =
    environment.nearby && environment.webgl === true && !fallback;
  const loaded = useCallback(() => setReady(true), []);
  const errored = useCallback(() => {
    setFailed(true);
    setReady(false);
    setPreview(null);
  }, []);

  return (
    <section
      id="skills"
      ref={section}
      tabIndex={-1}
      className={`ref-skills ${fallback ? "ref-skills-fallback" : ""}`}
      aria-labelledby="skills-title"
    >
      <SectionIntro id="skills-title" number="02" title="UNDER THE HOOD" summary="The tools and technologies behind the things I build." className="ref-skills-heading" />
      <div className="ref-skills-layout">
        <div className="ref-skills-keyboard-column">
          <div
            ref={stage}
            className="ref-skills-viewport"
            aria-label="Interactive technology keyboard"
            onPointerLeave={() => {
              setPreview(null);
            }}
          >
            {showScene && (
              <SceneBoundary onError={errored}>
                <Suspense fallback={null}>
                  <ReferenceKeyboard
                    stage={stage}
                    active={environment.active}
                    reducedMotion={environment.reducedMotion}
                    maxDpr={environment.mobile ? 1.5 : 2}
                    playSound={playSound}
                    onReady={loaded}
                    onError={errored}
                    onPreview={setPreview}
                    onSelect={setPinned}
                  />
                </Suspense>
              </SceneBoundary>
            )}
            {!fallback && !ready && (
              <div className="ref-skills-loading" role="status">
                <span />
                Loading keyboard…
              </div>
            )}

            <ul
              className={fallback ? "ref-skills-grid" : "ref-skills-sr-only"}
              aria-label="Technology skills"
            >
              {skills.map((skill) => (
                <li
                  key={skill.name}
                  style={{ "--skill": skill.color } as CSSProperties}
                >
                  {fallback ? (
                    <button
                      type="button"
                      className="ref-skill-card"
                      aria-pressed={pinned?.name === skill.name}
                      onClick={() => setPinned(skill)}
                      onPointerDown={() => playSound(true)}
                      onPointerUp={() => playSound(false)}
                      onMouseEnter={() => setPreview(skill)}
                      onMouseLeave={() => setPreview(null)}
                      onFocus={() => setPreview(skill)}
                      onBlur={() => setPreview(null)}
                    >
                      <span
                        className="ref-skill-card-glow"
                        aria-hidden="true"
                      />
                      <img
                        src={skill.keyboardIcon ?? skill.icon}
                        width="44"
                        height="44"
                        alt=""
                        loading="lazy"
                      />
                      <span>{skill.label}</span>
                    </button>
                  ) : (
                    <>
                      <span>{skill.label}</span>
                      <span>{getSkillDetails(skill).description}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>

          </div>
        </div>
        <SkillDetailsPanel
          skill={displayed}
          previewing={preview !== null}
          pinned={pinned !== null}
        />
      </div>
      <div className="ref-skills-sr-only" aria-live="polite" aria-atomic="true">
        <p>{pinned?.label ?? "Skill details"}</p>
        <p>
          {pinned
            ? getSkillDetails(pinned).description
            : "Choose a technology to view its details."}
        </p>
      </div>
    </section>
  );
}
