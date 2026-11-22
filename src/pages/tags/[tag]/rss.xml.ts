import type { APIRoute } from 'astro';
import { tags, SITE } from '../../../lib/site';
import { rss } from '../../../lib/feeds';

export async function getStaticPaths() {
  return (await tags()).map(([slug, t]) => ({ params: { tag: slug }, props: t }));
}
export const GET: APIRoute = ({ params, props }) =>
  rss(props.pages.filter((p: any) => p.data.date), `${SITE.url}/tags/${params.tag}/rss.xml`, `${SITE.title} - ${props.name}`);
