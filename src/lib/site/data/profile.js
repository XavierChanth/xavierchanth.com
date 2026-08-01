/**
 * Static intro copy and contact links for the site.
 * Only user-confirmed public facts belong here.
 */

export const NAME = "Xavier Chanthavong";

export const ROLE = "Co-Founder & CTO at Woosah Technologies";

export const BIO = [
  "I build operations-assurance infrastructure for distributed systems, and I write about how software gets designed, shipped, and maintained.",
  "Before Woosah I was a senior engineer at Atsign, and I have worked as an independent consultant since 2017 across technology startups, public-sector records, mining services, healthcare, media and entertainment, and recreation.",
];

/**
 * @typedef {{ label: string; href: string }} ProfileLink
 */

/** @type {ProfileLink[]} */
export const CONTACT_LINKS = [
  { label: "GitHub", href: "https://github.com/xavierchanth" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/xavierchanth" },
  { label: "Email", href: "mailto:xavier@woosah.io" },
];

export const PORTRAIT = {
  src: "/assets/Xavier_profile_2024.jpeg",
  alt: "Xavier Chanthavong",
  width: 3024,
  height: 3024,
};

export const EDUCATION =
  "Computer Science, Ontario Tech University — Data Science specialization with distinction, Mathematics minor.";

export const COLOPHON_DOTFILES = {
  label: "dotfiles",
  href: "https://github.com/xavierchanth/dotfiles",
  description: "Nix flake based configuration for my machines.",
};
