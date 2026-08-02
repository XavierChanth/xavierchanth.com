import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import rehypePrism from 'rehype-prism-plus';
import rehypeExternalLinks from './scripts/rehype-external-links.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter({})
  },

  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      rehypePlugins: [rehypePrism, rehypeExternalLinks]
    })
  ]
};

export default config;
