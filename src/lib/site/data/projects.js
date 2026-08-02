/**
 * Public open-source work shown on the homepage.
 *
 * @typedef {{ label: string; href: string }} ProjectLink
 * @typedef {{ links: ProjectLink[]; context: string; description: string }} Project
 */

/** @type {Project[]} */
export const PROJECTS = [
	{
		links: [{ label: 'pi-tai', href: 'https://github.com/xavierchanth/pi-tai' }],
		context: 'Personal',
		description: 'My highly opinionated coding agent; built on top of pi.'
	},
	{
		links: [{ label: 'Swapper', href: 'https://github.com/xavierchanth/swapper' }],
		context: 'Personal',
		description: 'A native macOS utility for swapping windows between dual monitors.'
	},
	{
		links: [
			{
				label: 'NoPorts',
				href: 'https://github.com/atsign-foundation/noports'
			},
			{ label: 'at_c', href: 'https://github.com/atsign-foundation/at_c' }
		],
		context: 'Atsign',
		description: 'Two of the more notable projects from my Atsign days.'
	}
];
