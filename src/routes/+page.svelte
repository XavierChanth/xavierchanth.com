<script>
  import LinkRow from "$lib/site/components/LinkRow.svelte";
  import PostList from "$lib/site/components/PostList.svelte";
  import ProjectList from "$lib/site/components/ProjectList.svelte";
  import Section from "$lib/site/components/Section.svelte";
  import WorkList from "$lib/site/components/WorkList.svelte";
  import { PROJECTS } from "$lib/site/data/projects.js";
  import { WORK } from "$lib/site/data/work.js";
  import {
    COLOPHON_DOTFILES,
    CONTACT_LINKS,
    EDUCATION,
    NAME,
    PORTRAIT,
  } from "$lib/site/data/profile.js";
  import { BLOG_DESCRIPTION, BLOG_URL } from "$lib/metadata";

  let { data } = $props();

  const TITLE = "Xavier Chanthavong";
  const DESCRIPTION = BLOG_DESCRIPTION;
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
      <h1 class="site-title">{NAME}</h1>
    </div>

    <div class="site-intro-body">
      <p>
        I am currently building <a href="https://www.woosah.io">Woosah</a>, a
        startup working on solving problems in the operational assurance space.
        I love all kinds of software and have spent time deepening my knowledge
        across full-stack development, systems programming, and data science and
        machine learning. I write about how software is designed, shipped, and
        maintained.
      </p>
      <p>
        Before Woosah, I was a senior engineer at Atsign. I've also worked as an
        independent consultant since 2017, serving clients across technology
        startups, public-sector records, mining services, healthcare, media and
        entertainment, and recreation.
      </p>
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
        I am a dotfile fanatic, you can find mine on
        <a href={COLOPHON_DOTFILES.href} rel="noopener noreferrer">GitHub</a>.
        I maintained them with a massive handwritten posix shell harness until
        agents got good enough to rewrite it all in nix.
      </p>
    </div>
  </Section>
</div>
