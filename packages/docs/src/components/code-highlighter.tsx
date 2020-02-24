import React, { FC, useCallback } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import copy from 'copy-to-clipboard'
import styled from '@emotion/styled'

import { CopyButton } from './copy-button'

const theme = {
  plain: {
    backgroundColor: '#f5f5f5',
    color: '#111',
  },
  styles: [
    {
      style: { color: '#777' },
      types: ['comment'],
    },
    {
      style: { color: '#009688' },
      types: ['string', 'url', 'attr-value'],
    },
    {
      style: { color: '#660099' },
      types: ['number'],
    },
    {
      style: { color: '#777' },
      types: ['punctuation'],
    },
    {
      style: { color: '#00009f' },
      types: ['keyword', 'tag', 'atrule'],
    },
    {
      style: { color: '#777' },
      types: ['operator'],
    },
    {
      style: { color: '#111' },
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
  background-color: var(--color-typo-code);
  border-radius: var(--border-radius);
  color: var(--color-typo-primary);
  font-family: var(--font-family-mono);
  font-size: var(--size-text-code);
  margin: 18px 0 18px;
  max-height: 360px;
  overflow-wrap: normal;
  overflow: auto;
  overflow: scroll;
  padding: var(--space-s) var(--space-l);
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

  // Prism not parse tsx syntax, so we replace to ts.
  const normalizedLanguage = language.replace('tsx', 'ts') as Language

  // TODO: remove style and take colors from css vars.
  return (
    <CodeWrapper>
      <Highlight {...defaultProps} theme={theme} code={value} language={normalizedLanguage}>
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
