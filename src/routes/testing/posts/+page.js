import { getPosts } from "$lib/utils.js";

export const prerender = true;

// Emit `build/testing/posts/index.html` so the archive lives beside the
// prototype landing page and stays as easy to delete as the rest of /testing.
export const trailingSlash = "always";

/**
 * Every published post, newest first, reduced to serializable fields.
 */
export const load = async () => {
  const posts = (await getPosts())
    .filter((post) => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
    .map(({ slug, title, description, date }) => ({
      slug,
      title,
      description,
      date,
    }));

  return { posts };
};
