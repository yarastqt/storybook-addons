const HEADING_REGEXP_GLOBAL = /^(#{1,5})\s([А-яA-z].+)/gm
const SYMBOL_REGEXP = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g
const WHITESPACE_REGEXP = /\s/g

export type Link = {
  level: number
  url: string
  text: string
}

type ProcessMarkdownHeadingOptions = {
  markdown: string
  onVisit?: (link: Link) => void
}

export const processMarkdownHeading = ({ markdown, onVisit }: ProcessMarkdownHeadingOptions) => {
  let executed: RegExpExecArray | null = null
  let processedMarkdown = markdown

  // eslint-disable-next-line no-cond-assign
  while ((executed = HEADING_REGEXP_GLOBAL.exec(markdown)) !== null) {
    const [rawHeading, level, heading] = executed
    // prettier-ignore
    const sanitizedRawHeading = rawHeading
      .replace('(', '\\(')
      .replace(')', '\\)')
    const headingRegExp = new RegExp(`^${sanitizedRawHeading}`, 'm')
    const id = heading
      .toLowerCase()
      .replace(SYMBOL_REGEXP, '')
      .replace(WHITESPACE_REGEXP, '-')
    const component = `h${level.length}`
    const url = `#${id}`

    if (onVisit !== undefined) {
      onVisit({ level: level.length, url, text: heading })
    }

    processedMarkdown = processedMarkdown.replace(
      headingRegExp,
      `<${component} id="${id}"><a class="anchor" href="${url}"></a>${heading}</${component}>\n`,
    )
  }

  return processedMarkdown
}
