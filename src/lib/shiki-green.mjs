// Dark, green-leaning highlight theme matching the site palette.
export default {
  name: 'mrgreen',
  type: 'dark',
  colors: { 'editor.background': '#0f150f', 'editor.foreground': '#b8e6c1' },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#5f7a64', fontStyle: 'italic' } },
    { scope: ['string', 'string.quoted', 'markup.inline.raw'], settings: { foreground: '#d7e88f' } },
    { scope: ['constant.numeric', 'constant.language', 'constant.character'], settings: { foreground: '#ffb86c' } },
    { scope: ['keyword', 'storage', 'keyword.control', 'keyword.operator.logical'], settings: { foreground: '#00d75f' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#7fe0c4' } },
    { scope: ['variable.parameter', 'variable.other.normal', 'variable'], settings: { foreground: '#e6f5e9' } },
    { scope: ['entity.name.tag', 'entity.name.type', 'support.type', 'entity.name.class'], settings: { foreground: '#9be37a' } },
    { scope: ['entity.other.attribute-name', 'meta.object-literal.key', 'support.type.property-name'], settings: { foreground: '#8fd3ff' } },
    { scope: ['punctuation', 'keyword.operator'], settings: { foreground: '#7fa587' } },
    { scope: ['markup.heading', 'entity.name.section'], settings: { foreground: '#00d75f', fontStyle: 'bold' } },
    { scope: ['markup.bold'], settings: { fontStyle: 'bold' } },
    { scope: ['markup.italic'], settings: { fontStyle: 'italic' } },
  ],
};
