<script>
  import LinkRow from "$lib/site/components/LinkRow.svelte";
  import PostList from "$lib/site/components/PostList.svelte";
  import Section from "$lib/site/components/Section.svelte";
  import TaxonomyBrowse from "$lib/site/components/TaxonomyBrowse.svelte";
  import { renderJsonLd } from "$lib/json-ld.js";
  import { BLOG_DESCRIPTION, BLOG_TITLE, BLOG_URL } from "$lib/metadata";

  const { data } = $props();

  const TITLE = `Blog Posts - ${BLOG_TITLE}`;
  const DESCRIPTION = `Posts from ${BLOG_TITLE}. ${BLOG_DESCRIPTION}`;
  const canonical = `${BLOG_URL}/posts`;

  const blogJsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: TITLE,
    description: DESCRIPTION,
    url: canonical,
    blogPost: data.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${BLOG_URL}/posts/${post.slug}`,
      datePublished: post.date,
    })),
  });

  /** @type {{ label: string; href: string }[]} */
  const backLinks = [{ label: "Back to overview", href: "/" }];

  /** @type {{ label: string; href: string }[]} */
  const archiveLinks = [
    { label: "Back to overview", href: "/" },
    { label: "RSS", href: "/rss.xml" },
  ];
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESCRIPTION} />
  <link rel="canonical" href={canonical} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESCRIPTION} />
  <meta property="og:url" content={canonical} />

  <meta name="twitter:title" content={TITLE} />
  <meta name="twitter:description" content={DESCRIPTION} />

  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html renderJsonLd(blogJsonLd)}
</svelte:head>

<div class="site-shell">
  <div class="site-intro">
    <h1 class="site-title">Writing</h1>
    <div class="site-intro-body">
      <p class="site-lede site-muted">
        Everything I have published, newest first. Mostly notes on how software
        gets designed, shipped, and maintained.
      </p>
      <LinkRow links={backLinks} label="Back" />
    </div>
  </div>

  <Section id="archive" title="All posts">
    <PostList posts={data.posts} taxonomy />
    <LinkRow
      links={archiveLinks}
      class="site-section-footer"
      label="More writing"
    />
  </Section>

  <Section id="browse" title="Browse">
    <div class="site-browse">
      <TaxonomyBrowse
        id="browse-series"
        title="Series"
        basePath="/posts/series"
        items={data.seriesSummaries}
      />
      <TaxonomyBrowse
        id="browse-tags"
        title="Tags"
        basePath="/posts/tags"
        items={data.tagSummaries}
      />
    </div>
  </Section>
</div>
