const SITE_ORIGIN = 'https://xavierchanth.com';

/**
 * Make external links in Markdown-generated HTML open in a separate tab while
 * leaving internal, relative, hash, and non-HTTP links alone.
 */
export default function rehypeExternalLinks() {
	/** @param {import('hast').Root} tree */
	return (tree) => {
		visit(tree);
	};
}

/** @param {import('hast').Nodes} node */
function visit(node) {
	if (node.type === 'element' && node.tagName === 'a') {
		const href = node.properties?.href;
		if (typeof href === 'string' && isExternalHttpUrl(href)) {
			node.properties.target = '_blank';
			node.properties.rel = ['noopener', 'noreferrer'];
		}
	}

	if ('children' in node) {
		for (const child of node.children) visit(child);
	}
}

/** @param {string} href */
function isExternalHttpUrl(href) {
	try {
		const url = new URL(href, SITE_ORIGIN);
		return (url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== SITE_ORIGIN;
	} catch {
		return false;
	}
}
