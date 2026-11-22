import { feedPages, SITE } from '../lib/site';
import { rss } from '../lib/feeds';
export const GET = async () => rss(await feedPages(), `${SITE.url}/rss.xml`);
