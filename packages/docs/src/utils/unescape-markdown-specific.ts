export const unescapeMarkdownSpecific = (markdown: string) => {
  // Unescape pipe symbol from tables.
  return markdown.replace(/\\|/g, '')
}
