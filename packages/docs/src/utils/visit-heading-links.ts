export type Link = {
  url: string
  text: string
}

type VisitHeadingLinksOptions = {
  onVisit: (link: Link) => void
}

// TODO: add types for any.
export const visitHeadingLinks = (options: VisitHeadingLinksOptions) => (ast: any) => {
  ast.children
    .filter((node: any) => node.type === 'heading')
    .forEach((node: any) => {
      if (options.onVisit !== undefined) {
        // TODO: add levels for first two levels (configurable).
        if (node.children[0] !== undefined && node.children[1] !== undefined) {
          options.onVisit({
            url: node.children[0].url,
            text: node.children[1].value
          })
        }
      }
    })
}
