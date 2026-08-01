/**
 * Public open-source work shown on the homepage.
 * Descriptions follow each repository's own public summary.
 *
 * @typedef {{ name: string; href: string; context: string; description: string }} Project
 */

/** @type {Project[]} */
export const PROJECTS = [
  {
    name: "NoPorts",
    href: "https://github.com/atsign-foundation/noports",
    context: "Atsign",
    description: "Connect to any device with no external listening ports open.",
  },
  {
    name: "at_c",
    href: "https://github.com/atsign-foundation/at_c",
    context: "Atsign",
    description:
      "Cross-platform C implementation of the atSDK for SoC and embedded devices.",
  },
  {
    name: "at_client_sdk",
    href: "https://github.com/atsign-foundation/at_client_sdk",
    context: "Atsign",
    description: "The Dart implementation of the atSDK.",
  },
  {
    name: "pi-tai",
    href: "https://github.com/xavierchanth/pi-tai",
    context: "Personal",
    description: "The mai tai of coding agents — my opinionated coding agent.",
  },
  {
    name: "Swapper",
    href: "https://github.com/xavierchanth/swapper",
    context: "Personal",
    description:
      "A native Swift macOS utility for moving windows between displays.",
  },
];
