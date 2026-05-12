import { getPosts } from '$lib/utils.js';
import { BLOG_URL } from '$lib/metadata';
import { create } from 'xmlbuilder2';

export const prerender = true;

export const GET = async () => {
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};

	const urls = [
		{
			loc: BLOG_URL,
			priority: '1.0'
		},
		{
			loc: `${BLOG_URL}/posts`,
			priority: '0.8'
		}
	];

	const posts = (await getPosts())
		.filter((post) => post.published)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	for (const post of posts) {
		urls.push({
			loc: `${BLOG_URL}/posts/${post.slug}`,
			priority: '0.7'
		});
	}

	const root = create({ version: '1.0', encoding: 'utf-8' }).ele('urlset', {
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
	});

	for (const url of urls) {
		const entry = root.ele('url').ele('loc').txt(url.loc).up();
		entry.ele('priority').txt(url.priority).up();
		entry.up();
	}

	return new Response(root.end(), { headers });
};
