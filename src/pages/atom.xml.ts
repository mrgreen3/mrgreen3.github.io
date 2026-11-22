import { feedPages, SITE } from '../lib/site';
import { atom } from '../lib/feeds';
export const GET = async () => atom(await feedPages(), `${SITE.url}/atom.xml`);
