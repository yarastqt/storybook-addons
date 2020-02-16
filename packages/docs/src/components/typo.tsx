import { css } from '@emotion/core'

export const typo = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: var(--weight-bold);
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: -0.05em;
    line-height: var(--line-height-text-xs);
  }

  h1:hover .anchor::before,
  h2:hover .anchor::before,
  h3:hover .anchor::before,
  h4:hover .anchor::before,
  h5:hover .anchor::before {
    visibility: visible;
  }

  h1 {
    font-size: var(--size-text-3xl);
  }

  h2 {
    font-size: var(--size-text-2xl);
  }

  h3 {
    font-size: var(--size-text-xl);
  }

  h4 {
    font-size: var(--size-text-l);
  }

  h5 {
    font-size: var(--size-text-m);
  }

  .anchor {
    float: left;
    margin-left: -24px;
    opacity: 0.4;
    transition: opacity 50ms ease-in-out;
    color: var(--color-link-minor);

    &:hover {
      opacity: 1;
    }
  }

  .anchor::before {
    content: '#';
  }

  p,
  blockquote,
  ul,
  ol {
    margin-bottom: 2em;
    margin-top: 0;
  }

  ul,
  ol {
    padding-left: 2em;
  }

  ul p,
  ol p {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  ol ol,
  ol ul,
  ul ol,
  ul ul {
    margin-bottom: 0;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
    padding: var(--space-m);
    border-radius: var(--border-radius);
    background: var(--color-bg-warning);
    box-sizing: border-box;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  blockquote > :first-child {
    margin-top: 0;
  }

  code {
    background-color: var(--color-bg-code);
    border-radius: var(--border-radius);
    font-family: var(--font-family-mono);
    color: var(--color-typo-code);
    display: inline;
    vertical-align: baseline;
    font-size: var(--size-text-s);
    padding: 3px 5px;
  }

  a {
    color: var(--color-link-external);
    text-decoration: none;
    transition: color 50ms ease-in-out;

    &:hover {
      color: var(--color-link-hover);
    }
  }

  table {
    background-color: var(--color-bg-default);
    border-collapse: collapse;
    border-spacing: 0;
    display: block;
    margin-bottom: 1em;
    margin-top: 0;
    overflow: auto;
  }

  table td,
  table th {
    border: 1px solid var(--color-bg-border);
    border-width: 1px 0;
    padding: 6px 12px;
    text-align: left;
    vertical-align: baseline;
  }

  table td:first-child,
  table th:first-child {
    border-left-width: 1px;
  }

  table td:last-child,
  table th:last-child {
    border-right-width: 1px;
  }

  table th {
    background-color: var(--color-bg-stripe);
    border-bottom-width: 2px;
    color: var(--color-typo-secondary);
    font-weight: var(--weight-semibold);
  }

  img {
    max-width: 100%;
  }
`
