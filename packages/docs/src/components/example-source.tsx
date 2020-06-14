import React, { FC, useMemo } from 'react'
import styled from '@emotion/styled'

import { extractStorySource, enhanceLocationsMap } from '../lib/story-source'
import { StoryStore } from '../docs-context'
import { CodeHighlighter } from './code-highlighter'

export const ExampleSource: FC<{
  active: boolean
  storyId: string
  storyStore: StoryStore
}> = ({ active, storyId, storyStore }) => {
  const code = useMemo(() => {
    const data = storyStore.fromId(storyId)
    if (data !== null && data.parameters.storySource !== undefined) {
      return extractStorySource(storyId, {
        source: data.parameters.storySource.source,
        locationsMap: enhanceLocationsMap(data.kind, data.parameters.storySource.locationsMap),
      })
    }
    return null
  }, [storyStore, storyId])

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
