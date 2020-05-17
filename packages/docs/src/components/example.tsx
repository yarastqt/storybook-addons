import React, { FC, useState } from 'react'
import styled from '@emotion/styled'

import { useDocsContext } from '../docs-context'
import { ExampleFrame } from './example-frame'
import { CodeIcon } from './icon'
import { ExampleSource } from './example-source'

export type ExampleMeta = {
  platform: string
  storyId: string
}

export type ExampleProps = {
  examples: ExampleMeta[]
}

// TODO: Add local and global platform toggler (with context).
export const Example: FC<ExampleProps> = ({ examples }) => {
  const docsContext = useDocsContext()
  const [activeTab, setActiveTab] = useState(0)
  const [showSource, setShowSource] = useState(false)

  return (
    <Container>
      <Toolbar>
        {examples.length > 1 && (
          <Tabs>
            {examples.map(({ platform }, index) => (
              <Tab key={platform} active={index === activeTab} onClick={() => setActiveTab(index)}>
                {platform}
              </Tab>
            ))}
          </Tabs>
        )}
        <Actions>
          {/* TODO: Add new-tab and copy-code actions. */}
          <ActionButton
            selected={showSource}
            tabIndex={-1}
            onClick={() => setShowSource(!showSource)}
            title="Show source"
          >
            <CodeIcon />
          </ActionButton>
        </Actions>
      </Toolbar>
      {examples.map(({ storyId }, index) => (
        <>
          <Content key={storyId} active={index === activeTab}>
            <ExampleFrame storyId={storyId} visible={index === activeTab} />
          </Content>
          {showSource && (
            <ExampleSource
              active={index === activeTab}
              storyId={storyId}
              storySource={docsContext.parameters.storySource}
            />
          )}
        </>
      ))}
    </Container>
  )
}

const Container = styled.div`
  border-radius: var(--border-radius);
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-bg-border);
  box-sizing: border-box;
  margin: 18px 0;
  box-shadow: 0 2px 8px var(--color-bg-border);
  overflow: hidden;
`

const Tabs = styled.div`
  display: flex;
  height: 100%;
`

const Tab = styled.div<{ active: boolean }>`
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid var(--color-bg-border);
  /* TODO: Use colors from design-system. */
  color: #999;
  ${(props) =>
    props.active &&
    `
    color: #000;
  `}

  &:hover {
    color: #000;
  }
`

const Content = styled.div<{ active: boolean }>`
  position: relative;
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

  ${(props) =>
    !props.active &&
    `
    display: none;
  `}
`

const Toolbar = styled.div`
  height: 40px;
  border-bottom: 1px solid var(--color-bg-border);
  display: flex;
  align-items: center;
  background-color: var(--color-bg-default);
  position: relative;
  z-index: 2;
`

const Actions = styled.div`
  margin-left: auto;
  margin-right: 16px;
  display: flex;
`

const ActionButton = styled.button<{ selected?: boolean }>`
  cursor: pointer;
  height: 32px;
  width: 32px;
  background: none;
  padding: 0;
  border: none;
  outline: none;
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.3;
  transition: opacity 100ms ease-in-out, background-color 100ms ease-in-out;

  &:hover {
    opacity: 1;
    background-color: #f5f5f5;
  }

  & + & {
    margin-left: 8px;
  }

  ${(props) =>
    props.selected &&
    `
    opacity: 1;
  `}
`
