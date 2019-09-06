import { css } from '@emotion/core'

export const theme = css`
  /* colors */
  --color-bg-default: #fff;
  --color-bg-border: #f2f2f2;
  --color-bg-stripe: #fafafa;
  --color-bg-ghost: #ebebeb;
  --color-bg-code: #f8f8f8;
  --color-bg-warning: #fff7df;

  --color-typo-primary: #000;
  --color-typo-secondary: rgba(0, 0, 0, 0.6);
  --color-typo-code: #c41d7f;

  --color-link-external: #1a0dab;
  --color-link-hover: #d00;
  --color-link-minor: #8589ad;

  /* units */
  --border-radius: 3px;

  /* spaces */
  --space-xs: 8px;
  --space-s: 12px;
  --space-m: 16px;
  --space-l: 20px;
  --space-xl: 24px;

  /* text */
  --size-text-base: 16px;
  --size-text-s: 0.85em;
  --size-text-m: 1em;
  --size-text-l: 1.125em;
  --size-text-xl: 1.25em;
  --size-text-2xl: 1.5em;
  --size-text-3xl: 2em;

  --line-height-text-xs: 1.2em;
  --line-height-text-s: 1.4em;
  --line-height-text-m: 1.5em;

  /* typography */
  --font-family-mono: Menlo, Monaco, monospace;

  --weight-semibold: 500;
  --weight-bold: 600;
`
