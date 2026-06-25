import { getPost, getPostBySeriesAlias, getPosts } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';

export const entries = async () => {
	const posts = (await getPosts()).filter((post) => post.published);
	const aliases = posts
		.filter((post) => post.series)
		.map((post) => ({
			slug: `${post.series?.slug}-${post.series?.index}`
		}));

	return [
		...posts.map((post) => ({
			slug: post.slug
		})),
		...aliases
	];
};

//@ts-ignore
export const load = async ({ params }) => {
	const post = await getPost(params.slug);
	if (!post) {
		const aliasPost = await getPostBySeriesAlias(params.slug);
		if (aliasPost) {
			throw redirect(307, `/posts/${aliasPost.slug}`);
		}

		throw error(404, {
			message: "The post you requested doesn't exist!"
		});
	} else if (!post.published) {
		throw error(404, {
			message: 'This post no longer exists!'
		});
	}

	return post;
};
