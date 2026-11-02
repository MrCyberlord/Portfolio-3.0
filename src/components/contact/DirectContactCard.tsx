import { useEffect, useRef, useState } from "react";
import type { ContactDetail } from "./contactConfig";
import ContactIcon from "./ContactIcons";

type Props = {
  kind: "email" | "phone";
  detail: ContactDetail;
};
type Feedback = { kind: "idle" | "success" | "error"; message: string };

export default function DirectContactCard({ kind, detail }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [copying, setCopying] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>({
    kind: "idle",
    message: "",
  });
  const timer = useRef<number | undefined>(undefined);
  const mounted = useRef(false);
  const title = kind === "email" ? "Email" : "Phone";
  const field = kind === "email" ? "email address" : "phone number";
  const value = detail.value.trim();
  const valueId = `contact-${kind}-value`;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      window.clearTimeout(timer.current);
    };
  }, []);

  const showFeedback = (next: Feedback) => {
    window.clearTimeout(timer.current);
    setFeedback(next);
    timer.current = window.setTimeout(
      () => {
        if (mounted.current) setFeedback({ kind: "idle", message: "" });
      },
      next.kind === "success" ? 2000 : 4500,
    );
  };

  const copy = async () => {
    if (copying) return;
    if (!value) {
      showFeedback({
        kind: "error",
        message: `${title} isn't shared here yet.`,
      });
      return;
    }
    setCopying(true);
    window.clearTimeout(timer.current);
    setFeedback({ kind: "idle", message: "" });
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(value);
      if (mounted.current)
        showFeedback({ kind: "success", message: "Copied!" });
    } catch {
      if (mounted.current)
        showFeedback({
          kind: "error",
          message: "Couldn't copy. Reveal the detail and copy it manually.",
        });
    } finally {
      if (mounted.current) setCopying(false);
    }
  };

  return (
    <article
      className={`contact-card contact-card--direct contact-card--${kind}`}
      aria-labelledby={`contact-${kind}-title`}
      data-feedback={feedback.kind}
      data-revealed={revealed}
    >
      <div className="contact-direct-content">
        <span className="contact-card-top">
          <span className="contact-icon-well">
            <span className="contact-icon-medallion">
              <ContactIcon name={kind} />
            </span>
          </span>
          <span className="contact-kind">DIRECT CONTACT</span>
        </span>
        <h3 id={`contact-${kind}-title`} className="contact-title">
          {title}
        </h3>
        <span
          id={valueId}
          className="contact-value"
          data-revealed={revealed}
          aria-live="polite"
          aria-atomic="true"
        >
          {revealed ? value || detail.unavailableLabel : "Click to reveal"}
        </span>
      </div>
      <button
        className="contact-reveal-button"
        type="button"
        onClick={() => setRevealed(true)}
        aria-label={revealed ? `${title} details revealed` : `Reveal ${field}`}
        aria-expanded={revealed}
        aria-controls={valueId}
        aria-describedby={revealed ? valueId : undefined}
      />
      <button
        type="button"
        className="contact-copy-button"
        onClick={() => void copy()}
        aria-label={`Copy ${field}`}
        aria-describedby={`contact-${kind}-feedback`}
        aria-busy={copying}
        disabled={copying}
      >
        <ContactIcon name={feedback.kind === "success" ? "check" : "copy"} />
      </button>
      <p
        id={`contact-${kind}-feedback`}
        className="contact-card-feedback"
        data-kind={feedback.kind}
      >
        <span role="status" aria-live="polite" aria-atomic="true">
          {feedback.message}
        </span>
        {feedback.kind === "idle" && (
          <span aria-hidden="true">
            {copying
              ? "Copying…"
              : revealed && !value
                ? "This detail hasn't been added yet."
                : revealed
                  ? "Select the detail or use copy"
                  : "Or copy without revealing"}
          </span>
        )}
      </p>
    </article>
  );
}
