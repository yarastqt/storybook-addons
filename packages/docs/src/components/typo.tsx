import { css } from '@emotion/core'

export const typo = css`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: var(--weight-bold);

    &:hover .anchor {
      opacity: 1;
    }

    img {
      margin: 0;
    }
  }

  h1 {
    font-size: var(--size-text-xl);
    line-height: var(--line-height-text-s);
    margin-bottom: 18px;
  }

  h2 {
    font-size: var(--size-text-xl);
    line-height: var(--line-height-text-xs);
    padding-top: 36px;
    margin: 36px 0 18px;
    border-top: 1px solid var(--color-bg-border);
  }

  h3 {
    font-size: var(--size-text-l);
    margin: 52px 0 6px;
  }

  h4,
  h5 {
    font-size: var(--size-text-m);
    line-height: var(--line-height-text-xxs);
    margin-top: 36px;
  }

  .anchor {
    float: left;
    margin-left: -36px;
    padding: 0 10px;
    opacity: 0;
    transition: opacity 100ms ease-in-out;

    &::before {
      content: '';
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.075 8.449a1 1 0 0 1-1.63 1.158 4 4 0 0 1 .434-5.142L8.886 1.46a4 4 0 0 1 5.657 5.657l-.707.707A1 1 0 0 1 12.42 6.41l.707-.707A2 2 0 1 0 10.3 2.874L7.294 5.88a2 2 0 0 0-.22 2.57zm1.848-.901a1 1 0 1 1 1.627-1.164 4 4 0 0 1-.428 5.152l-3.005 3.005A4 4 0 1 1 1.46 8.886l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a2 2 0 1 0 2.829 2.828l3.005-3.005a2 2 0 0 0 .215-2.574z' fill='%23000000'%3E%3C/path%3E%3C/svg%3E");
      display: inline-block;
      height: 16px;
      width: 16px;
      opacity: 0.5;
      transition: opacity 100ms ease-in-out;
      vertical-align: middle;
    }

    &:focus,
    &:focus::before,
    &:hover::before {
      opacity: 1;
    }
  }

  p,
  blockquote,
  ul,
  ol {
    margin: 9px 0;
  }

  ul,
  ol {
    padding-left: 32px;
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
    display: inline;
    font-family: var(--font-family-mono);
    font-size: 90%;
    padding: 2px 4px;
  }

  a {
    color: var(--color-link-external);
    text-decoration: underline;
    transition: color 100ms ease-in-out;

    &:hover {
      color: var(--color-link-external-hover);
    }

    &:focus {
      outline: 2px solid var(--color-typo-primary);
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid var(--color-bg-border);
    margin: 18px 0;
  }

  table td,
  table th {
    text-align: left;
    vertical-align: top;
    padding: 6px;
    border: 1px solid var(--color-bg-border);
  }

  table th {
    border-bottom-width: 2px;
  }

  img {
    max-width: 100%;
    margin: 9px 0;
  }
`
