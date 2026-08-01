import { getPosts } from "$lib/utils.js";

/**
 * The five most recent published posts, reduced to serializable fields.
 */
export const load = async () => {
  const posts = (await getPosts())
    .filter((post) => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
    .slice(0, 5)
    .map(({ slug, title, description, date }) => ({
      slug,
      title,
      description,
      date,
    }));

  return { posts };
};
