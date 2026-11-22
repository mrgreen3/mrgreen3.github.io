import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import zolaHtml from './src/lib/zola-html.mjs';
import green from './src/lib/shiki-green.mjs';

export default defineConfig({
  site: 'https://mrgreen.blog',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: green, langAlias: { sh: 'bash', conf: 'ini' } },
    processor: satteri({
      hastPlugins: [zolaHtml],
      features: { smartPunctuation: false },
    }),
  },
});
