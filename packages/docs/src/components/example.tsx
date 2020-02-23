import React, { FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'

import { ExampleFrame } from './example-frame'

const Container = styled.div`
  border-radius: var(--border-radius);
  background: var(--color-bg-default);
  border: 1px solid var(--color-bg-border);
  box-sizing: border-box;
  margin: 18px 0;
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
}

// TODO: Add local and global platform toggler (with context).
export const Example: FC<ExampleProps> = ({ examples }) => {
  const [activeTab, setActiveTab] = useState(0)
  const onTabClick = useCallback(
    (tabIndex) => () => {
      setActiveTab(tabIndex)
    },
    [],
  )

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
        <Content key={storyId} active={index === activeTab}>
          <ExampleFrame storyId={storyId} visible={index === activeTab} />
        </Content>
      ))}
    </Container>
  )
}
