import { allPages, tags, listed, permalink, SITE } from '../lib/site';

export async function GET() {
  const urls = [`${SITE.url}/`, `${SITE.url}/tags/`];
  for (const p of await allPages()) urls.push(permalink(p));
  const pages = Math.ceil((await listed()).length / SITE.perPage);
  for (let i = 1; i <= pages; i++) urls.push(`${SITE.url}/page/${i}/`);
  for (const [slug] of await tags()) urls.push(`${SITE.url}/tags/${slug}/`);
  const body = urls.sort().map((u) => `    <url>\n        <loc>${u}</loc>\n    </url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
