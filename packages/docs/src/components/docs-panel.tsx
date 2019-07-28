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
  --text-size: 18px;
  --text-line-height: 28px;
  --code-size: 15px;

  ${typo}

  display: flex;
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;
  color: var(--text-color);
`

const Content = styled.div`
  width: 750px;
`

const Navigation = styled.div`
  margin-left: 24px;
`

const NavigationList = styled.ul`
  border-left: 2px solid rgba(0, 0, 0, 0.05);
  padding-left: 24px;
  list-style: none;
`

const NavigationItem = styled.li`
  margin-bottom: 8px;
`

const NavigationLink = styled.a``

export type DocsPanelProps = {
  active: boolean
  api: API
}

const ReactMarkdownRenderers = {
  code: CodeHighlighter,
  paragraph: (props: any) => {
    if (props.children[0].props.value.match(/{{%story::.+.%}}/)) {
      const content = props.children[0].props.value.match(/{{%story::(.+.)%}}/)
      if (content !== null) {
        const examples: ExampleMeta[] = content[1]
          .split(/\|/)
          .map((chunk: string) => chunk.split(/\:/))
          .map(([platform, storyId]: string[]) => ({ platform, storyId }))
        return <Example examples={examples} />
      }
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
    const onAddReadme = ({ content }: any) => {
      const navigation: Link[] = []
      const processedContent = processMarkdownHeading({
        markdown: content,
        onVisit: (link) => navigation.push(link),
      })

      setContent({ content: processedContent, navigation })
    }

    api.on(ADD_README, onAddReadme)

    return () => {
      api.off(ADD_README, onAddReadme)
    }
  })

  if (!active) {
    return null
  }

  return (
    <Markdown>
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
            <NavigationItem key={index}>
              <NavigationLink href={link.url}>
                {link.text}
              </NavigationLink>
            </NavigationItem>
          ))}
        </NavigationList>
      </Navigation>
    </Markdown>
  )
}
