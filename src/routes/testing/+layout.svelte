<script>
  import "./styles/testing.css";
  import LinkRow from "./lib/LinkRow.svelte";

  let { children } = $props();

  /** @type {{ label: string; href: string }[]} */
  const sectionLinks = [
    { label: "Writing", href: "#writing" },
    { label: "Work", href: "#work" },
    { label: "Open source", href: "#open-source" },
  ];

  /** @type {{ label: string; href: string }[]} */
  const footerLinks = [
    { label: "All posts", href: "/posts" },
    { label: "RSS", href: "/rss.xml" },
    { label: "GitHub", href: "https://github.com/xavierchanth" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/xavierchanth" },
    { label: "Email", href: "mailto:xchanthavong@gmail.com" },
  ];
</script>

<div class="t-root">
  <a class="t-skip" href="#main">Skip to content</a>

  <header class="t-header">
    <div class="t-shell t-header-inner">
      <a class="t-wordmark" href="/testing/">Xavier Chanthavong</a>
      <nav class="t-header-nav" aria-label="Sections">
        <LinkRow links={sectionLinks} />
      </nav>
    </div>
  </header>

  <main class="t-main" id="main">
    <div class="t-shell">
      {@render children()}
    </div>
  </main>

  <footer class="t-footer">
    <div class="t-shell t-footer-inner">
      <p class="t-meta">&copy; 2026 Xavier Chanthavong</p>
      <LinkRow links={footerLinks} label="Elsewhere" />
    </div>
  </footer>
</div>
