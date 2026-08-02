export const prerender = true;

import showdown from 'showdown';
import { create } from 'xmlbuilder2';
import { getPosts } from '$lib/utils.js';
import {
  BLOG_AUTHOR,
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  BLOG_URL
} from '$lib/metadata';

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/rss+xml; charset=utf-8'
  };
  return new Response(await getRssXml(), { headers });
}

async function getRssXml() {
  const posts = (await getPosts())
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const rssUrl = `${BLOG_URL}/rss.xml`;
  const lastBuildDate = posts.length ? new Date(posts[0].date) : new Date();
  const root = create({ version: '1.0', encoding: 'utf-8' })
    .ele('rss', {
      'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
      'xmlns:atom': 'http://www.w3.org/2005/Atom',
      'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
      version: '2.0'
    })
    .ele('channel')
    .ele('atom:link', { rel: 'self', type: 'application/rss+xml', href: rssUrl }).up()
    .ele('title').txt(BLOG_TITLE).up()
    .ele('link').txt(BLOG_URL).up()
    .ele('lastBuildDate').txt(lastBuildDate.toUTCString()).up()
    .ele('language').txt('en-ca').up()
    .ele('description').txt(BLOG_DESCRIPTION).up();

  for (const post of posts) {
    const postUrl = `${BLOG_URL}/posts/${post.slug}`;
    root
      .ele('item')
      .ele('guid', { isPermaLink: 'true' }).txt(postUrl).up()
      .ele('title').txt(post.title).up()
      .ele('link').txt(postUrl).up()
      .ele('description').txt(post.description).up()
      .ele('dc:creator').txt(BLOG_AUTHOR).up()
      .ele('pubDate').txt(new Date(post.date).toUTCString()).up()
      .ele('content:encoded').txt((await getHtmlForPost(post.slug)).replaceAll('&', '&amp;')).up()
      .up();
  }

  return root.end();
}

const converter = new showdown.Converter();
const postMarkdownFiles = import.meta.glob('/src/posts/*.md', {
  query: '?raw',
  import: 'default'
});

/** @param {string} postSlug */
async function getHtmlForPost(postSlug) {
  const loadMarkdown = postMarkdownFiles[`/src/posts/${postSlug}.md`];
  if (!loadMarkdown) {
    throw new Error(`Unable to find post Markdown for "${postSlug}"`);
  }
  const source = /** @type {string} */ (await loadMarkdown());
  // Remove only a YAML frontmatter block at the beginning of the document.
  const postMarkdown = source.replace(/^\uFEFF?---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, '').trim();
  return converter
    .makeHtml(postMarkdown)
    .replace(/\b(href|src)=(['"])\/(?!\/)([^'"]*)\2/gi, makeUrlAbsolute)
    .replaceAll('{base}', '');
}

/**
 * @param {string} _match
 * @param {string} attribute
 * @param {string} quote
 * @param {string} path
 */
function makeUrlAbsolute(_match, attribute, quote, path) {
  return `${attribute}=${quote}${BLOG_URL}/${path}${quote}`;
}
