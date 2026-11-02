import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const destinations = [
  "Home",
  "Skills",
  "Projects",
  "Experience",
  "Contact",
] as const;

export type Destination = (typeof destinations)[number];

type NavigationProps = { onNavigate: (destination: Destination) => void };

export default function Navigation({ onNavigate }: NavigationProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Destination>("Home");
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tween = gsap.from(header.current, {
        opacity: 0,
        y: -10,
        duration: 1,
        delay: 0.2,
      });
      return () => tween.revert();
    });
    return () => media.revert();
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: Destination = "Home";
      for (const name of destinations) {
        const section = document.getElementById(name.toLowerCase());
        if (
          section &&
          section.getBoundingClientRect().top <= innerHeight * 0.35
        )
          current = name;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

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
    onNavigate(destination);
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
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
          event.preventDefault();
          navigate("Home");
        }}
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
        {destinations.map((destination) => (
          <a
            key={destination}
            href={`#${destination.toLowerCase()}`}
            aria-current={active === destination ? "location" : undefined}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              )
                return;
              event.preventDefault();
              navigate(destination);
            }}
          >
            {destination}
          </a>
        ))}
      </nav>

      <span className="nav-note">
        <span /> OPEN TO POSSIBILITIES
      </span>
    </header>
  );
}
