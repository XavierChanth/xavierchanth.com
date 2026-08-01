<script>
  // @ts-nocheck

  import "$lib/site/styles/article.css";
  import ArticleHeader from "$lib/site/components/ArticleHeader.svelte";
  import SeriesNav from "$lib/site/components/SeriesNav.svelte";
  import { BLOG_AUTHOR, BLOG_IMAGE, BLOG_TITLE, BLOG_URL } from "$lib/metadata";

  /** @type {{ data: Md.ResolvedPost }}*/
  const { data } = $props();
  const Component = $derived(data.component);

  const canonical = $derived(`${BLOG_URL}/posts/${data.slug}`);

  const articleJsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.title,
    description: data.description,
    author: {
      "@type": "Person",
      name: BLOG_AUTHOR,
    },
    datePublished: data.date,
    dateModified: data.updated ?? data.date,
    image: BLOG_IMAGE,
    mainEntityOfPage: canonical,
  });

  const breadcrumbJsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BLOG_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog Posts",
        item: `${BLOG_URL}/posts`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.title,
        item: canonical,
      },
    ],
  });
</script>

<svelte:head>
  <title>{data.title} - {BLOG_TITLE}</title>
  <meta name="description" content={data.description} />
  <link rel="canonical" href={canonical} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={`${data.title} - ${BLOG_TITLE}`} />
  <meta property="og:description" content={data.description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={BLOG_IMAGE} />

  <meta name="twitter:title" content={`${data.title} - ${BLOG_TITLE}`} />
  <meta name="twitter:description" content={data.description} />
  <meta name="twitter:image" content={BLOG_IMAGE} />

  <script type="application/ld+json">
{JSON.stringify(articleJsonLd)}
  </script>
  <script type="application/ld+json">
{JSON.stringify(breadcrumbJsonLd)}
  </script>
</svelte:head>

<!--
  The article is its own container rather than a `.site-shell` child: it needs
  the shared measure and gutters, but not the shell's element resets, which
  flatten long-form rhythm. All of its styling lives in `article.css`.
-->
<article class="site-article">
  <ArticleHeader
    title={data.title}
    description={data.description}
    author={data.author ?? BLOG_AUTHOR}
    date={data.date}
    updated={data.updated}
    series={data.series}
    tags={data.tags}
  />

  <div class="site-article-body">
    <Component />
  </div>

  {#if data.series}
    <SeriesNav series={data.series} />
  {/if}
</article>
