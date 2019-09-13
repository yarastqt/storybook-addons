import React, { FC, useCallback } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import copy from 'copy-to-clipboard'
import styled from '@emotion/styled'

import { CopyButton } from './copy-button'

const theme = {
  plain: {
    backgroundColor: '#011627',
    color: '#fff',
  },
  styles: [
    {
      style: { color: '#809393' },
      types: ['comment'],
    },
    {
      style: { color: '#addb67' },
      types: ['string', 'url'],
    },
    {
      style: { color: '#d6deeb' },
      types: ['variable'],
    },
    {
      style: { color: '#f78c6c' },
      types: ['number'],
    },
    {
      style: { color: '#82aaff' },
      types: ['builtin', 'char', 'constant', 'function'],
    },
    {
      style: { color: '#c792ea' },
      types: ['punctuation'],
    },
    {
      style: { color: '#c792ea' },
      types: ['doctype', 'selector'],
    },
    {
      style: { color: '#ffcb8b' },
      types: ['class-name'],
    },
    {
      style: { color: '#ffa7c4' },
      types: ['keyword', 'operator', 'tag'],
    },
    {
      style: { color: '#ff5874' },
      types: ['boolean'],
    },
    {
      style: { color: '#80cbc4' },
      types: ['property'],
    },
    {
      style: { color: '#b2ccd6' },
      types: ['namespace'],
    },
    {
      style: { color: '#addb67' },
      types: ['attr-name'],
    },
  ],
}

export type CodeHighlighterType = {
  value: string
  language: Language
}

const CodeWrapper = styled.div`
  position: relative;
`

const Pre = styled.pre`
  border-radius: var(--border-radius);
  box-sizing: border-box;
  font-family: var(--font-family-mono);
  font-size: var(--size-text-s);
  line-height: var(--line-height-text-s);
  margin-bottom: 1em;
  margin-top: 0;
  overflow-x: auto;
  padding: var(--space-m);
  tab-size: 4;
  white-space: pre;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
`

// TODO: Add line highlight.
export const CodeHighlighter: FC<CodeHighlighterType> = ({ value, language }) => {
  const onCopyClick = useCallback(() => {
    copy(value)
  }, [value])

  // TODO: remove style and take colors from css vars.
  return (
    <CodeWrapper>
      <Highlight {...defaultProps} theme={theme} code={value} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <Pre style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        )}
      </Highlight>
      <CopyButton onClick={onCopyClick} />
    </CodeWrapper>
  )
}
