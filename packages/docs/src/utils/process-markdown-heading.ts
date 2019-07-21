const HEADING_REGEXP_GLOBAL = /^(#{1,5})\s([A-z].+)/gm
const SYMBOL_REGEXP = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g
const WHITESPACE_REGEXP = /\s/g

export type Link = {
  url: string
  text: string
}

type ProcessMarkdownHeadingOptions = {
  markdown: string
  onVisit?: (link: Link) => void
}

export const processMarkdownHeading = ({ markdown, onVisit }: ProcessMarkdownHeadingOptions) => {
  let executed: RegExpExecArray | null = null

  while ((executed = HEADING_REGEXP_GLOBAL.exec(markdown)) !== null) {
    const [rawHeading, level, heading] = executed
    const headingRegExp = new RegExp(`^${rawHeading}`, 'm')
    const id = heading
      .toLowerCase()
      .replace(SYMBOL_REGEXP, '')
      .replace(WHITESPACE_REGEXP, '-')
    const component = `h${level.length}`
    const url = `#${id}`

    if (onVisit !== undefined) {
      onVisit({ url, text: heading })
    }

    markdown = markdown
      .replace(headingRegExp, `<${component} id="${id}"><a href="${url}"></a>${heading}</${component}>`)
  }

  return markdown
}
