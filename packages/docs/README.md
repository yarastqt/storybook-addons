# @storybook-addons/docs &middot; [![npm (scoped)](https://img.shields.io/npm/v/@storybook-addons/docs.svg)](https://www.npmjs.com/package/@storybook-addons/docs)

Documentation layout for official [@storybook/addon-docs](https://github.com/storybookjs/storybook/tree/next/addons/docs) with the ability to embed [examples](#inline-stories) and [placeholders](#placeholders).

<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/7934638/75613474-3183a600-5b3f-11ea-9fc4-021463781803.png">
</p>

## Install

```bash
npm i -D @storybook-addons/docs @storybook/addon-docs
```

## Usage

1. Add `@storybook/addon-docs` into addons in `main.js` file:

```js
module.exports = {
  addons: ['@storybook/addon-docs'],
}
```

2. Set `DocsPanel` in `preview.js` file:

```js
import { addParameters } from '@storybook/react'
import { DocsPanel } from '@storybook-addons/docs/dist/components/docs-panel'

addParameters({
  docs: {
    container: DocsPanel,
  },
})
```

3. Add documentation for your story:

```js
import documentation from './Component.md'

export default {
  title: 'Controls/Component',
  parameters: {
    docs: {
      readme: documentation,
    },
  },
}
```

### Params

| Option           | Description                                      | Default |
| ---------------- | ------------------------------------------------ | ------- |
| enableNavigation | Show navigation at right sidebar                 | `true`  |
| readme           | Documentation content                            |         |
| placeholders     | Object with placeholder which should be replaced |         |

## Markdown syntax

### Inline stories

Your can embeded single or multipile stories (with tabs) in documentation:

```markdown
<!-- single story -->

{{%story::story-id%}}

<!-- multi stories with tab names -->

{{%story::tabName:story-id|tabName:story-id%}}
```

### Placeholders

If necessary you can embedded placeholder for example other part of documentation:

```markdown
{{%inject::placeholderName%}}
```

## License

Project is [MIT licensed](https://github.com/yarastqt/mercury/blob/master/LICENSE.md).
