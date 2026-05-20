// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://calofre.fr',
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    mdx(),
  ],
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  compressHTML: true,
  prefetch: { defaultStrategy: 'viewport' },
});
