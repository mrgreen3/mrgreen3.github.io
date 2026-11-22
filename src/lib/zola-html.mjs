// Match Zola's markdown output: heading ids and external link attributes.
export function zolaSlug(s) {
  return s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export default function zolaHtml() {
  const seen = new Map();
  return {
    name: 'zola-html',
    element: {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'code'],
      visit(node, ctx) {
        if (node.tagName === 'code') {
          const parent = ctx.parent(node);
          const cls = [].concat(node.properties?.className || []).find((c) => String(c).startsWith('language-'));
          if (cls && parent?.tagName === 'pre') {
            const lang = String(cls).slice(9);
            ctx.setProperty(parent, 'dataLang', lang);
            ctx.setProperty(parent, 'className', [`language-${lang}`]);
            ctx.setProperty(node, 'dataLang', lang);
          }
          return;
        }
        if (node.tagName === 'a') {
          if (/^https?:\/\//.test(node.properties?.href || '')) {
            ctx.setProperty(node, 'rel', 'noopener');
            ctx.setProperty(node, 'target', '_blank');
          }
          return;
        }
        let id = zolaSlug(ctx.textContent(node));
        const n = seen.get(id) || 0;
        seen.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        ctx.setProperty(node, 'id', id);
      },
    },
  };
}
