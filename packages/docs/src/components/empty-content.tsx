import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import { markdownRenderers } from './markdown-renderers'

const content = `
# Documentation not found

For adding documentation to your story, you should add \`readme\` in \`docs\` parameters.

\`\`\`js
import documentation from './Component.md'

export default {
  title: 'StoryKind',
  parameters: {
    docs: {
      readme: documentation,
    },
  }
}
\`\`\`

For getting full information about \`@storybook-addons/docs\` you can see at <a target="_blank" href="https://github.com/yarastqt/storybook-addons/tree/master/packages/docs#usage">usage</a> section.
`

export const EmptyContent = () => (
  <ReactMarkdown escapeHtml={false} renderers={markdownRenderers} source={content} />
)
