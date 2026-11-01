import { useEffect, useRef, useState } from "react";

const destinations = [
  "Home",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
] as const;

export type Destination = (typeof destinations)[number];

type NavigationProps = {
  onNavigate: (
    destination: Destination,
    returnFocusElement?: HTMLElement | null,
  ) => void;
};

export default function Navigation({ onNavigate }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !header.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    // Clear mobile state when the desktop navigation becomes visible.
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const navigate = (destination: Destination) => {
    // The selected mobile link will be hidden while its dialog is open.
    // Give the caller a visible focus target to restore when that dialog closes.
    onNavigate(destination, open ? toggle.current : undefined);
    setOpen(false);
  };

  return (
    <header
      ref={header}
      className="navigation flex items-center justify-between"
    >
      <a
        className="brand flex items-center gap-3"
        href="#home"
        aria-label="Portfolio home"
        onClick={() => setOpen(false)}
      >
        <svg
          className="brand-mark"
          width="36"
          height="36"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="20"
            cy="20"
            r="16"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="m11 27 9-17 9 17-9-5-9 5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M20 10v12" stroke="currentColor" />
        </svg>
        <span>
          PORTFOLIO<span className="brand-dot">.</span>
        </span>
      </a>

      <button
        ref={toggle}
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span className={open ? "rotated" : ""} />
      </button>

      <nav
        id="primary-navigation"
        aria-label="Main navigation"
        className={`nav-links ${open ? "is-open" : ""}`}
      >
        {destinations.map((destination) =>
          destination === "Home" ? (
            <a
              key={destination}
              href="#home"
              aria-current="page"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
          ) : (
            <button
              key={destination}
              type="button"
              onClick={() => navigate(destination)}
            >
              {destination}
            </button>
          ),
        )}
      </nav>

      <span className="nav-note">
        <span /> OPEN TO POSSIBILITIES
      </span>
    </header>
  );
}
