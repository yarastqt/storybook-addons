export const injectMarkdownPlaceholders = (
  content: string,
  placeholders: Record<string, string> = {},
) => {
  return content.replace(/{{%inject::(.+.)%}}/g, (match: string, key: string) => {
    if (placeholders[key] !== undefined) {
      return placeholders[key]
    }
    return ''
  })
}
