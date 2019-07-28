import React, { FC } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'

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

// TODO: Add line highlight.
export const CodeHighlighter: FC<CodeHighlighterType> = ({ value, language }) => (
  <Highlight {...defaultProps} theme={theme} code={value} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
