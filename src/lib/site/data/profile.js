/**
 * Static intro copy and contact links for the site.
 * Only user-confirmed public facts belong here.
 */

export const NAME = "Xavier Chanthavong";

/**
 * @typedef {{ label: string; href: string }} ProfileLink
 */

/** @type {ProfileLink[]} */
export const CONTACT_LINKS = [
  { label: "GitHub", href: "https://github.com/xavierchanth" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/xavierchanth" },
];

export const PORTRAIT = {
  src: "/assets/Xavier_profile_2024.jpeg",
  alt: "Xavier Chanthavong",
  width: 512,
  height: 512,
};

export const EDUCATION =
  "Computer Science, Ontario Tech University — Data Science specialization with distinction, Mathematics minor.";

export const COLOPHON_DOTFILES = {
  href: "https://github.com/xavierchanth/dotfiles",
};
