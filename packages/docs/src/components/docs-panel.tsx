import React, { FC, useEffect, useState } from 'react'
import { API } from '@storybook/api'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'

import { Link, processMarkdownHeading } from '../utils/process-markdown-heading'
import { ADD_README } from '../constants'
import { ExampleMeta, Example } from './example'
import { CodeHighlighter } from './code-highlighter'
import { typo } from './typo'

const Markdown = styled.div`
  --text-color: #000;
  --text-size: 16px;
  --text-line-height: 28px;
  --code-size: 15px;
  --code-font: Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace;

  background-color: #fff;
  color: var(--text-color);
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 960px;
  margin: 0 auto;
  padding: 24px 32px;
`

const Content = styled.div`
  width: 750px;
  flex: 1 0 auto;

  ${typo}

  > :first-child {
    margin-top: 0;
  }
`

const Navigation = styled.div`
  margin-left: 24px;
  flex: 1 0 240px;
  position: sticky;
  top: 0;
`

const NavigationList = styled.ul`
  border-left: 2px solid rgba(0, 0, 0, 0.05);
  padding-left: 24px;
  list-style: none;
  font-size: 14px;
  line-height: 21px;
`

type NavigationItemProps = {
  level: number
}

const NavigationItem = styled.li<NavigationItemProps>`
  margin-bottom: 8px;
  /* Skip first two levels for margin. */
  margin-left: ${props => ((props.level - 2) * 20)}px;
`

const NavigationLink = styled.a`
  text-decoration: none;
  color: #999;

  &:hover {
    color: #070;
  }
`

export type DocsPanelProps = {
  active: boolean
  api: API
}

const STORY_REGEXP = /{{%story::(.+.)%}}/

const ReactMarkdownRenderers = {
  code: CodeHighlighter,
  paragraph: (props: any) => {
    const { value } = props.children[0].props
    const content = value.match(STORY_REGEXP)

    if (value !== undefined && content !== null) {
      const examples: ExampleMeta[] = content[1]
        .split(/\|/)
        .map((chunk: string) => {
          const splittedChunk = chunk.split(/\:/)
          return splittedChunk.length === 1
            // Add unknown platform if not set.
            ? ['Unknown', ...splittedChunk]
            : splittedChunk
        })
        .map(([platform, storyId]: string[]) => ({ platform, storyId }))

      return <Example examples={examples} />
    }

    return <p>{props.children}</p>
  },
}

type DocsPanelContent = {
  content: string,
  navigation: Link[],
}

export const DocsPanel: FC<DocsPanelProps> = ({ api, active }) => {
  const [{ content, navigation }, setContent] =
    useState<DocsPanelContent>({ content: '', navigation: [] })

  useEffect(() => {
    if (location.hash !== '') {
      const element = document.querySelector(location.hash)
      if (element !== null) {
        element.scrollIntoView()
      }
    }
  })

  useEffect(() => {
    const onAddReadme = ({ content }: any) => {
      const navigation: Link[] = []
      const processedContent = processMarkdownHeading({
        markdown: content,
        onVisit: (link) => navigation.push(link),
      })

      setContent({
        content: processedContent,
        navigation: navigation.filter((link) => link.level > 1 && link.level < 4),
      })
    }

    api.on(ADD_README, onAddReadme)

    return () => {
      api.off(ADD_README, onAddReadme)
    }
  }, [api])

  if (!active) {
    return null
  }

  if (content === '') {
    return <div>No documentation content.</div>
  }

  return (
    <Markdown>
      <Wrapper>
        <Content>
          <ReactMarkdown
            escapeHtml={false}
            source={content}
            renderers={ReactMarkdownRenderers}
          />
        </Content>
        <Navigation>
          <NavigationList>
            {navigation.map((link, index) => (
              <NavigationItem key={index} level={link.level}>
                <NavigationLink href={link.url}>
                  {link.text}
                </NavigationLink>
              </NavigationItem>
            ))}
          </NavigationList>
        </Navigation>
      </Wrapper>
    </Markdown>
  )
}
