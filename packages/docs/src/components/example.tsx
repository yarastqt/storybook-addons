import React, { FC, useCallback, useState, memo } from 'react'
import styled from '@emotion/styled'
// @ts-ignore
import jsxToString from 'react-element-to-jsx-string'

import { ExampleFrame } from './example-frame'
import { CodeHighlighter } from './code-highlighter'

// вместо styled использовать storybook/theming
const Container = styled.div`
  border-radius: var(--border-radius);
  background: var(--color-bg-default);
  border: 1px solid var(--color-bg-border);
  box-sizing: border-box;
  margin-bottom: 2em;
  box-shadow: 0 2px 8px var(--color-bg-border);
`

const Tabs = styled.div`
  display: flex;
  height: 44px;
  border-bottom: 1px solid var(--color-bg-border);
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
  padding: 30px 20px;
  ${(props) =>
    !props.active &&
    `
    display: none;
  `}
`

export type ExampleMeta = {
  platform: string
  storyId: string
}

export type ExampleProps = {
  examples: ExampleMeta[]
  sources: any
}

const Source = styled.div`
  pre {
    /* TODO: кажется, что тут проще обнулить нужные углы??? или нет */
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    margin-bottom: 0;
  }
`

const Wrapper = styled.div``

const ExpandButton = styled.button`
  border: 1px solid var(--color-bg-border);
  border-width: 1px 0 0 1px;
  border-radius: var(--border-radius) 0 0 0;

  cursor: pointer;

  margin-left: auto;
`

// TODO: Add local and global platform toggler (with context).
// TODO: мб мемоизацию тут добавить?
export const Example: FC<ExampleProps> = ({ examples, sources }) => {
  const [expanded, setExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const onTabClick = useCallback(
    (tabIndex) => () => {
      setActiveTab(tabIndex)
    },
    [],
  )

  console.log('render example')

  // @ts-ignores
  // if (sources['lego-button-desktop--theme']) {
    // console.log('>>>sources', sources['lego-button-desktop--theme'])
  // }

  return (
    <Container>
      {examples.length > 1 && (
        <Tabs>
          {examples.map(({ platform }, index) => (
            <Tab key={platform} active={index === activeTab} onClick={onTabClick(index)}>
              {platform}
            </Tab>
          ))}
        </Tabs>
      )}
      {examples.map(({ storyId }, index) => (
        <Wrapper>
          <Content key={storyId} active={index === activeTab}>
            <ExampleFrame storyId={storyId} visible={index === activeTab} />
          </Content>
          {/* TODO: add tabindex -1 */}
          <ExpandButton style={{ display: index === activeTab ? 'block' : 'none' }} onClick={() => setExpanded(!expanded)}>
            expand
          </ExpandButton>
          {/* TODO: вынести все в отедьный компонент и так же обработаь кейс когда нету данных */}
          {expanded && (
            <Source style={{ display: index === activeTab ? 'block' : 'none' }}>
              <CodeHighlighter
                // language="jsx"
                // value="fa"
                value={sources[storyId] || 'fake'}
                // value={jsxToString(sources[storyId])}
              />
            </Source>
          )}
        </Wrapper>
      ))}
    </Container>
  )
}
