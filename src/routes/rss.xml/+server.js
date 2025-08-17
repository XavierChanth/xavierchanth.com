export const prerender = true;

import showdown from 'showdown';
import { readFile } from 'fs/promises';
import { create } from 'xmlbuilder2';
import { getPosts } from '$lib/utils.js';
import {
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  BLOG_URL
} from '$lib/metadata';

export async function GET() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml'
  };
  return new Response(await getRssXml(), { headers });
}



async function getRssXml() {
  const posts = await getPosts();
  const rssUrl = `${BLOG_URL}/rss.xml`;
  const root = create({ version: '1.0', encoding: 'utf-8' })
    .ele('rss', {
      "xmlns:content": "http://purl.org/rss/1.0/modules/content/",
      "xmlns:atom": 'http://www.w3.org/2005/atom',
      version: "2.0",
    })
    .ele('channel')
    .ele('atom:link', { rel: 'self', type: "application/rss+xml", href: rssUrl }).up()
    .ele('title').txt(BLOG_TITLE).up()
    .ele('link', { href: BLOG_URL }).up()
    .ele('lastBuiltDate').txt(new Date().toISOString()).up()
    .ele('description').txt(BLOG_DESCRIPTION).up()

  const filteredPosts = posts.filter((post) => post.published);
  filteredPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  const N = 10;
  const maxPosts = filteredPosts.length > N ? N : filteredPosts.length;

  let i = 0;
  for await (const post of filteredPosts) {
    if (i++ == maxPosts) break;
    const postUrl = `${BLOG_URL}/posts/${post.slug}`
    root
      .ele('item')
      .ele('guid').txt(postUrl).up()
      .ele('title').txt(post.title).up()
      .ele('link', { href: postUrl }).up()
      .ele('description').txt(post.description).up()
      .ele('pubDate').txt(post.date).up()
      .ele('content:encoded').txt(await getHtmlForPost(post.slug)).up()
      .up();
  }

  return root.end();
}
const converter = new showdown.Converter();
/** @param {string} postSlug  */
async function getHtmlForPost(
  postSlug,
) {
  const postMarkdownWithFrontmatter = await readFile(
    `./src/posts/${postSlug}.md`,
    'utf-8'
  );
  const postMarkdown = postMarkdownWithFrontmatter.split('---')[2].trim();
  let postHtml = converter.makeHtml(postMarkdown);
  // prevents HTML in code tags from being rendered
  postHtml = postHtml
    .replaceAll('&lt;', '&amp;lt;')
    .replaceAll('&gt;', '&amp;gt;')
    .replaceAll('{base}', '');
  return postHtml;
}
