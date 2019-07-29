import { css } from '@emotion/core'

export const typo = css`
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 26px;
    margin-top: 24px;
  }

  h1:hover .anchor::before,
  h2:hover .anchor::before,
  h3:hover .anchor::before,
  h4:hover .anchor::before,
  h5:hover .anchor::before,
  h6:hover .anchor::before {
    visibility: visible;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  .anchor {
    float: left;
    line-height: 1;
    margin-left: -20px;
    padding-right: 4px;
  }

  .anchor::before {
    content: '';
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' %3E%3Cpath fill-rule='evenodd' d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'%3E%3C/path%3E%3C/svg%3E");
    width: 16px;
    height: 16px;
    display: inline-block;
    visibility: hidden;
  }

  p {
    margin-bottom: 26px;
    margin-top: 0;
    font-size: var(--text-size);
    line-height: var(--text-line-height);
  }

  ul, ol {
    margin-top: 0;
    margin-bottom: 26px;
    padding-left: 30px;
  }

  li {
    font-size: var(--text-size);
    line-height: var(--text-line-height);
  }

  pre {
    padding: 16px;
    font-family: var(--code-font);
    font-size: var(--code-size);
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 0;
    margin-bottom: 26px;
  }

  blockquote {
    margin: 20px 0;
    padding: 16px;
    border-radius: 4px;
    background: rgba(255,204,0,.15);
    box-sizing: border-box;
  }

  code {
    background-color: rgba(27, 31, 35, .05);
    border-radius: 4px;
    font-family: var(--code-font);
    display: inline;
    vertical-align: baseline;
    font-size: 85%;
    padding: 4px 8px;
  }

  a {
    color: #1a0dab;
    text-decoration: none;

    &:hover {
      color: #d00;
    }
  }
`
