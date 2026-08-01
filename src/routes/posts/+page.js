import { getPosts, getSeriesSummaries, getTagSummaries } from "$lib/utils.js";

/**
 * Every published post, newest first, reduced to the serializable fields the
 * archive renders — including each post's series and tags so the archive can
 * link into the existing taxonomy routes.
 */
export const load = async () => {
  const posts = (await getPosts())
    .filter((post) => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
    .map(({ slug, title, description, date, series, tags }) => ({
      slug,
      title,
      description,
      date,
      series: series
        ? { label: series.label, slug: series.slug, index: series.index }
        : undefined,
      tags: (tags ?? []).map(({ label, slug: tagSlug }) => ({
        label,
        slug: tagSlug,
      })),
    }));

  const [seriesSummaries, tagSummaries] = await Promise.all([
    getSeriesSummaries(),
    getTagSummaries(),
  ]);

  return {
    posts,
    seriesSummaries: seriesSummaries.sort((a, b) =>
      a.label.localeCompare(b.label),
    ),
    tagSummaries,
  };
};
