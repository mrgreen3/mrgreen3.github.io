import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import zolaHtml from './src/lib/zola-html.mjs';

export default defineConfig({
  site: 'https://mrgreen.blog',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    syntaxHighlight: false,
    processor: satteri({
      hastPlugins: [zolaHtml],
      features: { smartPunctuation: false },
    }),
  },
});
