import React, { FC } from 'react'
import styled from '@emotion/styled'

import { extractStorySource } from '../lib/extract-story-source'
import { StorySource } from '../docs-context'
import { CodeHighlighter } from './code-highlighter'

export const ExampleSource: FC<{
  active: boolean
  storyId: string
  storySource: StorySource
}> = ({ active, storyId, storySource }) => {
  const code = extractStorySource(storyId, storySource)
  return (
    <Source active={active}>
      {code === null ? (
        <UnavailableMessage>Unavailable source code.</UnavailableMessage>
      ) : (
        <CodeHighlighter language="jsx" value={code} />
      )}
    </Source>
  )
}

const Source = styled.div<{ active: boolean }>`
  ${(props) =>
    !props.active &&
    `
    display: none;
  `}

  background-color: #f5f5f5;
  color: var(--color-typo-secondary);

  pre {
    border-radius: 0;
    margin: 0;
  }
`

const UnavailableMessage = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`
