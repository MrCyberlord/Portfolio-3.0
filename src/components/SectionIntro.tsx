import "./SectionIntro.css";

type Props = {
  id: string;
  number: string;
  title: string;
  summary: string;
  className?: string;
  reveal?: "about" | "project" | "experience";
};

export default function SectionIntro({ id, number, title, summary, className = "", reveal }: Props) {
  return (
    <header className={`section-intro ${className}`} {...(reveal ? { [`data-${reveal}-reveal`]: true } : {})}>
      <h2 id={id} className="section-intro-label">
        <span aria-hidden="true" />{number} / {title}
      </h2>
      {summary && <p className="section-intro-summary">{summary}</p>}
    </header>
  );
}
