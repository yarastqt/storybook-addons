import React from 'react'

import { CodeHighlighter } from './code-highlighter'
import { ExampleMeta, Example } from './example'

const STORY_REGEXP = /{{%story::(.+.)%}}/

export const markdownRenderers = {
  code: CodeHighlighter,
  paragraph: ({ children }: any) => {
    const { value } = children[0].props

    if (value !== undefined) {
      const content = value.match(STORY_REGEXP)

      if (content !== null) {
        // TODO: Use one map instead two.
        const examples: ExampleMeta[] = content[1]
          .split(/\|/)
          .map((chunk: string) => {
            const splittedChunk = chunk.split(/:/)
            return splittedChunk.length === 1 ? ['Unknown', ...splittedChunk] : splittedChunk
          })
          .map(([platform, storyId]: string[]) => ({ platform, storyId }))

        return <Example examples={examples} />
      }
    }

    return <p>{children}</p>
  },
}
