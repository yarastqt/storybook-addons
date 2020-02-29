# @storybook-addons/docs &middot; [![npm (scoped)](https://img.shields.io/npm/v/@storybook-addons/docs.svg)](https://www.npmjs.com/package/@storybook-addons/docs)

Storybook addon for collect your documentation from project and components with the ability to embed [examples](#inline-stories) or [placeholders](#placeholders) in documentation (live [example](https://storybook-addons.now.sh/docs)).

<p align="center">
  <img height="500" src="https://user-images.githubusercontent.com/7934638/75613474-3183a600-5b3f-11ea-9fc4-021463781803.png">
</p>

## Install

```bash
npm i -D @storybook-addons/docs
```

## Usage

1. Register this addon in `.storybook/addons.js`:

```js
// With default configuration.
import '@storybook-addons/docs/register'

// With custom configuration.
import { registerWithConfigure } from '@storybook-addons/docs/register-with-configure'

registerWithConfigure({
  tabTitle: 'Custom tab ttitle',
})
```

2. Add decorator `withDocs` for your stories:

```js
import { withDocs } from '@storybook-addons/docs'

storiesOf('ComponentName', module).addDecorator(
  withDocs({
    readme: {
      content: 'readme content',
      placeholders: {
        placeholderName: 'value',
      },
    },
  }),
)
```

### Register options

| Option   | Description | Default           |
| -------- | ----------- | ----------------- |
| tabTitle | Tab title.  | `'Documentation'` |

## Configuration

- Global configuration:

```js
import { addParameters } from '@storybook/react'

addParameters({
  docsx: {
    ...
  },
})
```

- Story configuration:

```js
storiesOf('ComponentName', module)
  .add('story-id', () => ..., {
    docsx: {
      ...
    },
  })
```

### Configuration options

| Option           | Description                       | Default |
| ---------------- | --------------------------------- | ------- |
| enableNavigation | Show navigation at right sidebar. | `true`  |

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

## Similar packages

- [@storybook/addon-notes](https://github.com/storybookjs/storybook/tree/master/addons/notes)
- [@storybook/addon-docs](https://github.com/storybookjs/storybook/tree/next/addons/docs)
- [storybook-readme](https://github.com/tuchk4/storybook-readme)
- [react-storybook-addon-chapters](https://github.com/Checkfront/react-storybook-addon-chapters)

## License

Project is [MIT licensed](https://github.com/yarastqt/mercury/blob/master/LICENSE.md).
