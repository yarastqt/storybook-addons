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
import { ExampleFrame } from './example-frame'

const Markdown = styled.div`
  display: flex;
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;

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

const Example = styled.div`
  box-shadow: rgba(0, 0, 0, .05) 0px 1px 3px 0px;
  border-radius: 3px;
  background: #fff;
  border: 1px solid #f3f4f6;
  padding: 30px 20px;
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
    if (props.children[0].match(/{{%frame:.+.%}}/)) {
      const content = props.children[0].match(/{{%(.+.)%}}/)
      if (content !== null) {
        const [platform, storyId] = content[1].split(/:/)
        return (
          <Example>
            <span>{platform}</span>
            <ExampleFrame storyId={storyId} />
          </Example>
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

export const DocsPanel: FC<DocsPanelProps> = ({ api }) => {
  const [navigation, setNavigation] = useState<Link[]>([])
  const [content, setContent] = useState<ReactNode>(null)

  useEffect(() => {
    const onAddReadme = (markdown: string) => {
      const navigationList: Link[] = []
      const content = unified()
        .use(remark)
        .use(slug)
        .use(autolinkHeadings)
        .use(visitHeadingLinks as any, {
          onVisit: (link: Link) => navigationList.push(link),
        })
        .use(remark2react, { remarkReactComponents })
        .processSync(markdown)
        .contents
      setContent(content)
      setNavigation(navigationList)
    }
    if (content === null) {
      // TODO: check content update after change story kinds.
      api.on(ADD_README, onAddReadme)
    }
    return () => {
      api.off(ADD_README, onAddReadme)
    }
  }, [content])

  return (
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
  )
}
