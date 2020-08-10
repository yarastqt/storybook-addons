import React, { FC, useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'
import createTable from 'markdown-table'

import { Link, processMarkdownHeading } from '../lib/process-markdown-heading'
import { unescapeMarkdownSpecific } from '../lib/unescape-markdown-specific'
import { escapeMarkdownSpecific } from '../lib/escape-markdown-specific'
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
  .tooitip {
    position: relative;
    cursor: pointer;
  }
  .tooitip:after {
    content: attr(data-title);
    display: none;
    position: absolute;
    min-width: 150px;
    top: 0;
    left: 105%;
    background-color: #f7f8f9;
    z-index: 100;
    color: #646a75;
    padding: 5px;
    text-align: left;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.16);
    font-size: 14px;
    border-radius: 2px;
  }
  .tooitip:hover {
    color: #767676;
  }
  .tooitip:hover:after {
    display: block;
  }
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

export type DocsPageProps = {
  context: DocsContextProps
}

type DocsPageContent = {
  content?: string
  navigation: Link[]
}

const initialState = { content: undefined, navigation: [] }
const kindRef = createNativeRef<any>()
const stateRef = createNativeRef<any>()

function createPropType(type: any) {
  console.log('>>> type', type)
  if (type.raw) {
    const wideTypes = type.value.reduce((acc: string, val: any) => {
      return `${acc} ${escapeMarkdownSpecific(val.value)} I`
    }, '')

    console.log(wideTypes)

    // eslint-disable-next-line prettier/prettier
    return `<span data-title="${wideTypes.replace(/"/g, '&quot;').slice(0, -1)}" class="tooitip">${escapeMarkdownSpecific(type.raw)}</span>`
  }

  return escapeMarkdownSpecific(type.name)
}
function createPropsTable(props: any) {
  const titles = ['Prop', 'Type', 'Default value', 'Description']
  const content = Object.entries(props).map(([, prop]: any) => [
    escapeMarkdownSpecific(prop.name),
    createPropType(prop.type),
    escapeMarkdownSpecific(prop.defaultValue ? prop.defaultValue.value : '—'),
    escapeMarkdownSpecific(prop.description),
  ])

  return createTable([titles, ...content])
}

export const DocsPage: FC<DocsPageProps> = ({ context }) => {
  const { kind, parameters } = context
  const isNextKind = kindRef.current !== kind
  const isFirstRender = useRef(isNextKind)
  const [shownSkeleton, setShownSkeleton] = useState(isNextKind)
  const { enableNavigation = true, readme = '', placeholders = {}, props = {} } =
    parameters.docs || {}
  const rawMarkdown = typeof readme === 'string' ? readme : readme.default

  Object.assign(placeholders, {
    description: props.PopupProps.__docgenInfo.description,
    PopupProps: createPropsTable(props.PopupProps.__docgenInfo.props),
  })
  console.log('========> props', props)
  const [{ content, navigation }, setContent] = useState<DocsPageContent>(
    isNextKind ? initialState : stateRef.current,
  )

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
