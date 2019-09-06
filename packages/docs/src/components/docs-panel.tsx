import React, { FC, useEffect, useState, memo } from 'react'
import { API } from '@storybook/api'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'

import { Link, processMarkdownHeading } from '../lib/process-markdown-heading'
import { ADD_README } from '../constants'
import { ExampleMeta, Example } from './example'
import { CodeHighlighter } from './code-highlighter'
import { typo } from './typo'
import { theme } from './theme'

const Markdown = styled.div`
  ${theme}
  font-size: var(--size-text-base);
  line-height: var(--line-height-text-m);
  background-color: var(--color-bg-default);
  color: var(--color-typo-primary);
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 960px;
  margin: 0 auto;
  padding: 24px 32px;
`

const Content = styled.div`
  ${typo}
  width: 750px;
  flex: 1 0 auto;

  > :first-child {
    margin-top: 0;
  }
`

const Navigation = styled.div`
  margin-left: var(--space-xl);
  flex: 1 0 240px;
  position: sticky;
  top: 0;
`

const NavigationList = styled.ul`
  padding-left: var(--space-xl);
  border-left: 1px solid var(--color-bg-border);
  list-style: none;
  font-size: var(--size-text-s);
  line-height: var(--line-height-text-s);
`

const NavigationItem = styled.li<{ level: number }>`
  margin-bottom: var(--space-xs);
  /* Skip first two levels for margin. */
  margin-left: ${(props) => (props.level - 2) * 20}px;
`

const NavigationLink = styled.a`
  color: var(--color-link-minor);
  text-decoration: none;
  transition: color 50ms ease-in-out;

  &:hover {
    color: var(--color-link-hover);
  }
`

export type DocsPanelProps = {
  active: boolean
  api: API
}

const STORY_REGEXP = /{{%story::(.+.)%}}/

const ReactMarkdownRenderers = {
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

type DocsPanelContent = {
  content?: string
  navigation: Link[]
}

export const DocsPanelView: FC<DocsPanelProps> = ({ api, active }) => {
  const [{ content, navigation }, setContent] = useState<DocsPanelContent>({
    content: undefined,
    navigation: [],
  })

  useEffect(() => {
    if (window.location.hash !== '') {
      const hash = decodeURIComponent(window.location.hash)
      const element = document.querySelector(hash)
      if (element !== null) {
        element.scrollIntoView()
      }
    }
  })

  useEffect(() => {
    const onAddReadme = ({ content: markdown }: any) => {
      const links: Link[] = []
      const processedContent = processMarkdownHeading({
        markdown,
        onVisit: (link) => links.push(link),
      })

      if (content !== processedContent) {
        setContent({
          content: processedContent,
          // eslint-disable-next-line no-magic-numbers
          navigation: links.filter((link) => link.level > 1 && link.level < 4),
        })
      }
    }

    api.on(ADD_README, onAddReadme)

    return () => {
      api.off(ADD_README, onAddReadme)
    }
  }, [content, api])

  if (!active) {
    return null
  }

  if (content === undefined) {
    return <div>No documentation content.</div>
  }

  return (
    <Markdown>
      <Wrapper>
        <Content>
          <ReactMarkdown escapeHtml={false} source={content} renderers={ReactMarkdownRenderers} />
        </Content>
        <Navigation>
          <NavigationList>
            {navigation.map((link) => (
              <NavigationItem key={link.url} level={link.level}>
                <NavigationLink href={link.url}>{link.text}</NavigationLink>
              </NavigationItem>
            ))}
          </NavigationList>
        </Navigation>
      </Wrapper>
    </Markdown>
  )
}

export const DocsPanel = memo(DocsPanelView)
