import { SITE, permalink, type Post } from './site';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const html = (p: Post) => esc(p.rendered?.html ?? '');
const xml = (body: string) =>
  new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });

export function rss(pages: Post[], self: string, title = SITE.title) {
  const updated = pages[0]?.data.date?.toUTCString().replace('GMT', '+0000') ?? '';
  const items = pages.map((p) => `
      <item>
          <title>${esc(p.data.title)}</title>
          <pubDate>${p.data.date!.toUTCString().replace('GMT', '+0000')}</pubDate>
          <author>Unknown</author>
          <link>${permalink(p)}</link>
          <guid>${permalink(p)}</guid>
          <description xml:base="${permalink(p)}">${html(p)}</description>
      </item>`).join('');
  return xml(`<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>${esc(title)}</title>
      <link>${SITE.url}</link>
      <description>${esc(SITE.description)}</description>
      <generator>Astro</generator>
      <language>en</language>
      <atom:link href="${self}" rel="self" type="application/rss+xml"/>
      <lastBuildDate>${updated}</lastBuildDate>${items}
    </channel>
</rss>
`);
}

const iso = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, '+00:00');

export function atom(pages: Post[], self: string, title = SITE.title) {
  const entries = pages.map((p) => `
    <entry xml:lang="en">
        <title>${esc(p.data.title)}</title>
        <published>${iso(p.data.date!)}</published>
        <updated>${iso(p.data.date!)}</updated>
        <author><name>Unknown</name></author>
        <link rel="alternate" type="text/html" href="${permalink(p)}"/>
        <id>${permalink(p)}</id>
        <content type="html" xml:base="${permalink(p)}">${html(p)}</content>
    </entry>`).join('');
  return xml(`<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
    <title>${esc(title)}</title>
    <subtitle>${esc(SITE.description)}</subtitle>
    <link rel="self" type="application/atom+xml" href="${self}"/>
    <link rel="alternate" type="text/html" href="${SITE.url}"/>
    <generator uri="https://astro.build/">Astro</generator>
    <updated>${pages[0] ? iso(pages[0].data.date!) : ''}</updated>
    <id>${self}</id>${entries}
</feed>
`);
}
