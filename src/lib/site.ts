import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import path from 'node:path';
import { zolaSlug } from './zola-html.mjs';

export const SITE = {
  url: 'https://mrgreen.blog',
  title: "Mr Green's Blog",
  description: 'Linux, ArchBang, and minimal workflows.',
  author: 'Mr Green',
  links: [
    { name: 'github', url: 'https://github.com/mrgreen3' },
    { name: 'archbang', url: 'https://archbang.org' },
    { name: 'rss', url: '/rss.xml' },
  ],
  menu: [
    { name: 'blog', url: '/' },
    { name: 'tags', url: '/tags' },
    { name: 'about', url: '/about' },
    { name: 'links', url: '/links' },
  ],
  perPage: 10,
};

export type Post = CollectionEntry<'blog'>;

export const permalink = (p: Post) => `${SITE.url}/${p.id}/`;
export const tagUrl = (t: string) => `${SITE.url}/tags/${zolaSlug(t)}/`;
export const ymd = (d?: Date) => (d ? d.toISOString().slice(0, 10) : '');

const byDate = (a: Post, b: Post) =>
  (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) || a.id.localeCompare(b.id);

export async function allPages() {
  return (await getCollection('blog', (p) => !p.data.draft)).sort(byDate);
}

// Pages shown on the front page: dated, in the root section (not posts/).
export async function listed() {
  return (await allPages()).filter((p) => p.data.date && !p.id.includes('/'));
}

// Pages included in feeds: every dated page.
export async function feedPages() {
  return (await allPages()).filter((p) => p.data.date);
}

export async function tags() {
  const map = new Map<string, { name: string; pages: Post[] }>();
  for (const p of await allPages()) {
    for (const t of p.data.tags) {
      const slug = zolaSlug(t);
      if (!map.has(slug)) map.set(slug, { name: t, pages: [] });
      map.get(slug)!.pages.push(p);
    }
  }
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export const sortedTags = (p: Post) =>
  [...p.data.tags].sort().filter((t, i, a) => a.findIndex((x) => x.toLowerCase() === t.toLowerCase()) === i);

// Co-located post images, keyed by absolute path.
const images = Object.fromEntries(
  Object.entries(import.meta.glob<{ default: ImageMetadata }>(
    '/src/content/blog/**/*.{png,jpg,jpeg,webp,gif,avif}', { eager: true },
  )).map(([k, v]) => [path.join(process.cwd(), k), v.default]),
);

// Rendered HTML with Astro's image placeholders swapped for optimised <img> tags.
export async function postHtml(p: Post, absolute = false) {
  let html = p.rendered?.html ?? '';
  const dir = path.dirname(path.resolve(p.filePath ?? ''));
  for (const m of [...html.matchAll(/<img __ASTRO_IMAGE_="([^"]*)"[^>]*>/g)]) {
    const { src, alt = '' } = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, '&'));
    const meta = images[path.resolve(dir, src)];
    if (!meta) continue;
    const img = await getImage({ src: meta });
    const url = absolute ? new URL(img.src, SITE.url).href : img.src;
    const esc = (v: string) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    html = html.replace(m[0],
      `<img src="${url}" alt="${esc(alt)}" width="${img.attributes.width ?? meta.width}" height="${img.attributes.height ?? meta.height}" loading="lazy" decoding="async">`);
  }
  return html;
}

// Front-page summary: leading paragraphs before the first heading, max 2.
export async function summary(p: Post) {
  const html = await postHtml(p);
  const head = html.split(/<h[1-6][\s>]/)[0];
  const paras = head.match(/<p>[\s\S]*?<\/p>/g) ?? [];
  return paras.slice(0, 2).join('\n');
}

export function describe(p: Post) {
  if (p.data.description) return p.data.description;
  const first = (p.rendered?.html ?? '').match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? '';
  const text = first.replace(/<[^>]+>/g, '').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  return text.length > 160 ? text.slice(0, 157).replace(/\s+\S*$/, '') + '…' : text;
}
