import React, { FC, useEffect, useState, ReactNode } from 'react'
import { API } from '@storybook/api'
import unified from 'unified'
import remark from 'remark-parse'
import remark2react from 'remark-react'
import slug from 'remark-slug'
import autolinkHeadings from 'remark-autolink-headings'
import styled from '@emotion/styled'

import { visitHeadingLinks, Link } from '../utils/visit-heading-links'
import { ADD_README } from '../constants'
import { ExampleMeta, Example } from './example'

const Markdown = styled.div`
  --text-color: #000;
  --code-color: hsla(0,0%,100%,0.9);
  --code-background: #222;
  --code-inline-background: rgba(255,204,0,0.15);
  --text-size: 18px;
  --text-line-height: 28px;
  --h1-size: 56px;
  --h2-size: 28px;
  --h3-size: 20px;
  --code-size: 15px;
  --text-small: 16px;
  --h1-family: "YS Display",sans-serif;
  --code-family: "Roboto Mono",monospace;

  display: flex;
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;

  h1 {
    padding-bottom: .5em;
    font-family: var(--h1-family);
    font-size: var(--h1-size);
    font-weight: 100;
  }

  h2 {
    font-size: var(--h2-size);
    margin-top: 52px;
    margin-bottom: 24px;
  }

  p {
    margin-top: 0;
    margin-bottom: 26px;
    font-size: var(--text-size);
    line-height: var(--text-line-height);
    hyphens: auto;
    color: var(--text-color);
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 32px;
    padding-left: 16px;
  }

  li {
    font-size: var(--text-size);
    line-height: var(--text-line-height);
    counter-increment: counter;
  }

  h1 a,
  h2 a,
  h3 a {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='octicon octicon-link' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath fill-rule='evenodd' d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    float: left;
    line-height: 1;
    margin-left: -20px;
    padding-right: 4px;
    width: 20px;
    height: 32px;
  }
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

const NavigationListItem = styled.li`
  margin-bottom: 8px;
`

const NavigationLink = styled.a``

const remarkReactComponents = {
  p: (props: any) => {
    if (props.children[0].match(/{{%story::.+.%}}/)) {
      const content = props.children[0].match(/{{%story::(.+.)%}}/)
      if (content !== null) {
        const examples: ExampleMeta[] = content[1]
          .split(/\|/)
          .map((chunk: string) => chunk.split(/\:/))
          .map(([platform, storyId]: string[]) => ({ platform, storyId }))
        return (
          <Example examples={examples} />
        )
      }
    }
    return <p>{props.children}</p>
  },
}

export type DocsPanelProps = {
  active: boolean
  api: API
}

export const DocsPanel: FC<DocsPanelProps> = ({ api, active }) => {
  const [navigation, setNavigation] = useState<Link[]>([])
  const [content, setContent] = useState<ReactNode>(null)

  useEffect(() => {
    const onAddReadme = ({ content }: any) => {
      const navigationList: Link[] = []
      const markdown = unified()
        .use(remark)
        .use(slug)
        .use(autolinkHeadings)
        .use(visitHeadingLinks as any, {
          onVisit: (link: Link) => navigationList.push(link),
        })
        .use(remark2react, { remarkReactComponents })
        .processSync(content)
        .contents
      setContent(markdown)
      setNavigation(navigationList)
    }
    api.on(ADD_README, onAddReadme)
    return () => {
      api.off(ADD_README, onAddReadme)
    }
  })

  return active ? (
    <Markdown>
      <Content>
        {content}
      </Content>
      <Navigation>
        <NavigationList>
        {navigation.map((link) => (
          <NavigationListItem>
            <NavigationLink href={link.url}>
              {link.text}
            </NavigationLink>
          </NavigationListItem>
        ))}
        </NavigationList>
      </Navigation>
    </Markdown>
  ) : null
}
