<script>
  import LinkRow from "$lib/site/components/LinkRow.svelte";
  import PostList from "$lib/site/components/PostList.svelte";
  import ProjectList from "$lib/site/components/ProjectList.svelte";
  import Section from "$lib/site/components/Section.svelte";
  import WorkList from "$lib/site/components/WorkList.svelte";
  import { PROJECTS } from "$lib/site/data/projects.js";
  import { WORK } from "$lib/site/data/work.js";
  import {
    BIO,
    COLOPHON_DOTFILES,
    CONTACT_LINKS,
    EDUCATION,
    NAME,
    PORTRAIT,
    ROLE,
  } from "$lib/site/data/profile.js";
  import { BLOG_URL } from "$lib/metadata";

  let { data } = $props();

  const TITLE = "Xavier Chanthavong — a writer who builds";
  const DESCRIPTION =
    "Writing, work, and open source from Xavier Chanthavong: Co-Founder & CTO at Woosah Technologies and an independent software consultant since 2017.";
  const canonical = `${BLOG_URL}/`;

  /** @type {{ label: string; href: string }[]} */
  const writingLinks = [
    { label: "All posts", href: "/posts" },
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
</svelte:head>

<div class="site-shell">
  <div class="site-intro">
    <div class="site-intro-head">
      <img
        class="site-portrait"
        src={PORTRAIT.src}
        alt={PORTRAIT.alt}
        width={PORTRAIT.width}
        height={PORTRAIT.height}
      />
      <div>
        <h1 class="site-title">{NAME}</h1>
        <p class="site-lede site-muted">{ROLE}</p>
      </div>
    </div>

    <div class="site-intro-body">
      {#each BIO as paragraph (paragraph)}
        <p>{paragraph}</p>
      {/each}
      <LinkRow links={CONTACT_LINKS} label="Contact" />
    </div>
  </div>

  <Section id="writing" title="Writing">
    <PostList posts={data.posts} />
    <LinkRow
      links={writingLinks}
      class="site-section-footer"
      label="More writing"
    />
  </Section>

  <Section id="work" title="Work">
    <WorkList entries={WORK} />
  </Section>

  <Section id="open-source" title="Open source">
    <ProjectList projects={PROJECTS} />
  </Section>

  <Section id="colophon" title="Colophon">
    <div class="site-colophon site-small site-muted site-section-footer">
      <p>{EDUCATION}</p>
      <p>
        Machine setup lives in
        <a href={COLOPHON_DOTFILES.href} rel="noopener noreferrer"
          >{COLOPHON_DOTFILES.label}</a
        >.
        {COLOPHON_DOTFILES.description}
      </p>
    </div>
  </Section>
</div>
