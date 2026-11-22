import { getCollection, type CollectionEntry } from 'astro:content';
import { zolaSlug } from './zola-html.mjs';

export const SITE = {
  url: 'https://mrgreen.blog',
  title: "Mr Green's Blog",
  description: 'Linux, ArchBang, and minimal workflows.',
  author: 'Mr Green',
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
