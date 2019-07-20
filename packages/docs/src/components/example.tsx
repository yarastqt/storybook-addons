import React, { FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'

import { ExampleFrame } from './example-frame'

const Container = styled.div`
  border-radius: 4px;
  background: #fff;
  border: 2px solid rgba(0,0,0,.05);
  box-sizing: border-box;
`

const Tabs = styled.div`
  display: flex;
  height: 44px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
`

type TabProps = {
  active: boolean
}

const Tab = styled.div<TabProps>`
  padding: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid rgba(0,0,0,0.05);
  color: #999;
  ${props => props.active && `
    color: #000;
  `}

  &:hover {
    color: #000;
  }
`

type ContentProps = {
  active: boolean
}

const Content = styled.div<ContentProps>`
  padding: 30px 20px;
  ${props => !props.active && `
    display: none;
  `}
`

export type ExampleMeta = {
  platform: string,
  storyId: string
}

export type ExampleProps = {
  examples: ExampleMeta[]
}

// TODO: Add local and global platform toggler (with context).
export const Example: FC<ExampleProps> = ({ examples }) => {
  const [activeTab, setActiveTab] = useState(0)
  const onTabClick = useCallback((tabIndex) => () => {
    setActiveTab(tabIndex)
  }, [])

  return (
    <Container>
      {examples.length > 1 && (
        <Tabs>
          {examples.map(({ platform }, index) => (
            <Tab
              active={index === activeTab}
              onClick={onTabClick(index)}
            >
              {platform}
            </Tab>
          ))}
        </Tabs>
      )}
      {examples.map(({ storyId }, index) => (
        <Content active={index === activeTab}>
          <ExampleFrame
            storyId={storyId}
            visible={index === activeTab}
          />
        </Content>
      ))}
    </Container>
  )
}
