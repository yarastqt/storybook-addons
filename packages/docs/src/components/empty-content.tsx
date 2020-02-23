import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'

import { markdownRenderers } from './markdown-renderers'

const content = `
# Documentation not found

Add \`withDocs\` decorator in your story for adding documentation:

\`\`\`js
import { withDocs } from '@storybook-addons/docs'

export default {
  title: 'StoryKind',
  decorators: [
    withDocs({
      readme: {
        content: require('./Component.md').default,
      },
    }),
  ],
}
\`\`\`

For getting full information about \`@storybook-addons/docs\` you can see at <a target="_blank" href="https://github.com/yarastqt/storybook-addons/tree/master/packages/docs#usage">usage</a> section.
`

export const EmptyContent = () => (
  <ReactMarkdown escapeHtml={false} renderers={markdownRenderers} source={content} />
)
