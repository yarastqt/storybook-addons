// const escape = require('escape-markdown')

export const escapeMarkdownSpecific = (markdown: string) => {
  return typeof markdown === 'string'
    ? markdown
        .replace(/\|/g, 'I')
        .replace(/\n/g, '  ')
        .replace(/"/g, '&quot;')
    : markdown
}
