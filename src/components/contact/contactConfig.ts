export type ContactDetail = {
  value: string;
  unavailableLabel: string;
};

export type ContactConfig = {
  email: ContactDetail;
  phone: ContactDetail;
  linkedin: { url: string; subtitle: string };
  x: { url: string; subtitle: string };
};

// Add real details between the quotes. Empty values never copy or display a
// fabricated address/number. Examples: "you@example.com", "+91 ...".
export const CONTACT_CONFIG: ContactConfig = {
  email: { value: "amanjain2691@gmail.com", unavailableLabel: "Email not shared yet" },
  phone: { value: "8087491938", unavailableLabel: "Phone not shared yet" },
  linkedin: {
    url: "https://www.linkedin.com/in/theamanjain/",
    subtitle: "Let's connect",
  },
  x: {
    url: "https://x.com/MrCyberlord",
    subtitle: "Follow my journey",
  },
};
