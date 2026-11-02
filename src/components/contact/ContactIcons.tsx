export type ContactIconName =
  | "linkedin"
  | "email"
  | "phone"
  | "x"
  | "copy"
  | "check"
  | "external";

export default function ContactIcon({ name }: { name: ContactIconName }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {name === "linkedin" && (
        <path
          fill="currentColor"
          d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.97V9.2h2.96v9.55ZM6.45 7.9a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.31h.04c.39-.75 1.36-1.55 2.8-1.55 3 0 3.56 1.97 3.56 4.53v5.26Z"
        />
      )}
      {/* X brand silhouette, from Simple Icons (CC0); see design/CONTACT.md. */}
      {name === "x" && (
        <path
          fill="currentColor"
          d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"
        />
      )}
      <g
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {name === "email" && (
          <>
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="m4 7 8 6 8-6" />
          </>
        )}
        {name === "phone" && (
          <path d="M7.4 3H4.8C3.8 3 3 3.8 3 4.8 3 13.7 10.3 21 19.2 21c1 0 1.8-.8 1.8-1.8v-2.6a1.3 1.3 0 0 0-1.1-1.3l-3.2-.5a1.3 1.3 0 0 0-1.2.4l-1.3 1.3a15 15 0 0 1-6.7-6.7l1.3-1.3c.3-.3.5-.8.4-1.2l-.5-3.2A1.3 1.3 0 0 0 7.4 3Z" />
        )}
        {name === "copy" && (
          <>
            <rect x="8" y="8" width="12" height="13" rx="2" />
            <path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
          </>
        )}
        {name === "check" && <path d="m5 12 4 4L19 6" />}
        {name === "external" && <path d="M7 17 17 7M7 7h10v10" />}
      </g>
    </svg>
  );
}
