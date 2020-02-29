import React, { FC, useEffect, useState, useRef, memo } from 'react'
import { API } from '@storybook/api'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'

import { Link, processMarkdownHeading } from '../lib/process-markdown-heading'
import { ADD_README } from '../constants'
import { PARAM_KEY, DocsxParams, defaultParams } from '../params'
import { SkeletonContent } from './skeleton-content'
import { EmptyContent } from './empty-content'
import { typo } from './typo'
import { theme } from './theme'
import { markdownRenderers } from './markdown-renderers'

const Markdown = styled.div`
  ${theme}
  font-family: var(--font-family);
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
  padding: 24px 16px 64px;
`

const Content = styled.div`
  ${typo}
  width: 720px;
  flex: 1 0 auto;

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`

const Navigation = styled.div`
  margin-left: var(--space-xl);
  flex: 1 1 240px;
  position: sticky;
  top: 0;
`

const NavigationList = styled.ul`
  padding-left: var(--space-xl);
  border-left: 1px solid var(--color-bg-border);
  list-style: none;
  font-size: var(--size-text-m);
  line-height: var(--line-height-text-m);
`

const NavigationItem = styled.li<{ level: number }>`
  margin: ${(props) => (props.level === 2 ? `12px 0` : `8px 0 8px 12px`)};
`

const NavigationLink = styled.a<{ level: number }>`
  color: ${(props) =>
    props.level === 2 ? 'var(--color-typo-primary)' : 'var(--color-link-external)'};
  text-decoration: none;
  transition: color 100ms ease-in-out;
  font-weight: ${(props) => (props.level === 2 ? 'var(--weight-bold)' : 'var(--weight-normal)')};

  &:hover {
    color: var(--color-link-external-hover);
  }

  &:focus {
    outline: 2px solid var(--color-typo-primary);
  }
`

export type DocsPanelProps = {
  active: boolean
  api: API
}

type DocsPanelContent = {
  content?: string
  navigation: Link[]
}

export const DocsPanelView: FC<DocsPanelProps> = ({ api, active }) => {
  const currentStoryData = api.getCurrentStoryData() || {}
  const userParams = api.getParameters(currentStoryData.id, PARAM_KEY) || {}
  const { enableNavigation }: DocsxParams = { ...defaultParams, ...userParams }

  const isFirstRender = useRef(true)
  const [shownSkeleton, setShownSkeleton] = useState(true)

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
        onVisit: ({ text, ...link }) => links.push({ ...link, text: text.replace(/`/g, '') }),
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

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      setShownSkeleton(Boolean(content))
    }
  }, [content])

  if (!active) {
    return null
  }

  if (!content) {
    return (
      <Markdown>
        <Wrapper>
          <Content>
            {/* eslint-disable-next-line eslint(prettier/prettier) */}
            {shownSkeleton ? <SkeletonContent /> : <EmptyContent />}
          </Content>
        </Wrapper>
      </Markdown>
    )
  }

  return (
    <Markdown>
      <Wrapper>
        <Content>
          <ReactMarkdown escapeHtml={false} renderers={markdownRenderers} source={content} />
        </Content>
        {enableNavigation && (
          <Navigation>
            <NavigationList>
              {navigation.map((link) => (
                <NavigationItem key={link.url} level={link.level}>
                  <NavigationLink level={link.level} href={link.url}>
                    {link.text}
                  </NavigationLink>
                </NavigationItem>
              ))}
            </NavigationList>
          </Navigation>
        )}
      </Wrapper>
    </Markdown>
  )
}

export const DocsPanel = memo(DocsPanelView)
