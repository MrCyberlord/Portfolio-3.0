import { SKILLS } from "./reference/skills";
import type { SkillNames } from "./reference/skills";
import type { KeyboardSkill } from "./reference/scene";
import { getSkillDetails } from "./skillDetails";

type Props = {
  skill: KeyboardSkill | null;
  previewing: boolean;
  pinned: boolean;
};

export default function SkillDetailsPanel({
  skill,
  previewing,
  pinned,
}: Props) {
  const details = skill ? getSkillDetails(skill) : null;
  const original = skill ? SKILLS[skill.name as SkillNames] : null;
  return (
    <aside className="skill-details-panel" aria-labelledby="skill-detail-name">
      <div className="skill-details-top">
        <span>THE TOOLKIT</span>
        <span>
          {skill
            ? String(
                Object.values(SKILLS).findIndex(
                  (item) => item.name === skill.name,
                ) + 1,
              ).padStart(2, "0")
            : "—"}
          <span className="skill-details-count">
            {" "}
            / {Object.keys(SKILLS).length}
          </span>
        </span>
      </div>
      <div className="skill-details-content" key={skill?.name ?? "intro"}>
        <div
          className={`skill-details-icon ${skill ? "" : "skill-details-icon-empty"}`}
        >
          {skill ? (
            <img
              src={original?.keyboardIcon ?? skill.icon}
              width="38"
              height="38"
              alt=""
            />
          ) : (
            <svg
              width="34"
              height="34"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="10" height="10" rx="2" />
              <rect x="19" y="3" width="10" height="10" rx="2" />
              <rect x="3" y="19" width="10" height="10" rx="2" />
              <rect x="19" y="19" width="10" height="10" rx="2" />
            </svg>
          )}
        </div>
        <p className="skill-details-category">
          <span className="skill-details-badge">
            {details?.category ?? "START HERE"}
          </span>
        </p>
        <h3 id="skill-detail-name">{skill?.label ?? "Explore the toolkit"}</h3>
        <p className="skill-details-description">
          {details?.description ??
            "Hover over a key to preview a technology. Click or tap to keep its details open."}
        </p>
        {details && details.uses.length > 0 ? (
          <div className="skill-details-uses">
            <p>WHAT IT BRINGS</p>
            <ul>
              {details.uses.map((use) => (
                <li key={use}>
                  <span />
                  {use}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          !skill && (
            <div className="skill-details-guide">
              <span aria-hidden="true">↖</span>
              <p>You can also use the matching keys on your keyboard.</p>
            </div>
          )
        )}
      </div>
      <div className="skill-details-status">
        <span className="skill-details-led" />
        <span>
          {previewing ? "PREVIEWING" : pinned ? "SELECTED" : "READY TO EXPLORE"}
        </span>
        <span className="skill-details-status-line" />
      </div>
    </aside>
  );
}
