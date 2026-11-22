import type { APIRoute } from 'astro';
import { tags, SITE } from '../../../lib/site';
import { atom } from '../../../lib/feeds';

export async function getStaticPaths() {
  return (await tags()).map(([slug, t]) => ({ params: { tag: slug }, props: t }));
}
export const GET: APIRoute = ({ params, props }) =>
  atom(props.pages.filter((p: any) => p.data.date), `${SITE.url}/tags/${params.tag}/atom.xml`, `${SITE.title} - ${props.name}`);
