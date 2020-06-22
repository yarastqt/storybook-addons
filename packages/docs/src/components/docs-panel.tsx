import React, { FC, useEffect, useState, useRef, memo } from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'

import { Link, processMarkdownHeading } from '../lib/process-markdown-heading'
import { unescapeMarkdownSpecific } from '../lib/unescape-markdown-specific'
import { injectMarkdownPlaceholders } from '../lib/inject-markdown-placeholders'
import { createNativeRef } from '../lib/ref'
import { DocsContextProps, DocsContextProvider } from '../docs-context'
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

  > :first-of-type {
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
  context: DocsContextProps
}

type DocsPanelContent = {
  content?: string
  navigation: Link[]
}

const kindRef = createNativeRef<any>()
const stateRef = createNativeRef<any>({ content: null, navigation: [] })

export const DocsPanel: FC<DocsPanelProps> = ({ context }) => {
  const { kind, parameters } = context
  const isNextKind = kindRef.current !== kind
  const isFirstRender = useRef(isNextKind)
  const [shownSkeleton, setShownSkeleton] = useState(isNextKind)
  // @ts-ignore (FIXME: Fix ts issue for init values.)
  const { enableNavigation = true, readme = '', placeholders } = parameters.docs || {}
  const rawMarkdown = typeof readme === 'string' ? readme : readme.default

  const [{ content, navigation }, setContent] = useState<DocsPanelContent>(stateRef.current)

  // FIXME: Don't work with new api with iframe.
  useEffect(() => {
    if (window.location.hash !== '') {
      const hash = decodeURIComponent(window.location.hash)
      const element = document.querySelector(hash)
      if (element !== null) {
        element.scrollIntoView()
      }
    }
  }, [])

  useEffect(() => {
    if (!isNextKind) {
      return
    }

    let markdown = rawMarkdown
    markdown = unescapeMarkdownSpecific(markdown)
    markdown = injectMarkdownPlaceholders(markdown, placeholders)

    const links: Link[] = []
    const processedContent = processMarkdownHeading({
      markdown,
      onVisit: ({ text, ...link }) => links.push({ ...link, text: text.replace(/`/g, '') }),
    })

    stateRef.current = {
      content: processedContent,
      // eslint-disable-next-line no-magic-numbers
      navigation: links.filter((link) => link.level > 1 && link.level < 4),
    }

    setContent(stateRef.current)
  }, [rawMarkdown])

  useEffect(() => {
    if (kindRef.current !== kind) {
      kindRef.current = kind
    }
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      setShownSkeleton(Boolean(content))
    }
  }, [])

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
          <DocsContextProvider value={context}>
            <ReactMarkdown escapeHtml={false} renderers={markdownRenderers} source={content} />
          </DocsContextProvider>
        </Content>
        {enableNavigation && (
          <Navigation>
            <NavigationList>
              {navigation.map((link) => (
                <NavigationItem key={link.url} level={link.level}>
                  <NavigationLink level={link.level} href={link.url} target="_self">
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
