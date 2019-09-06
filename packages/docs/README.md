# @storybook-addons/docs &middot; [![npm (scoped)](https://img.shields.io/npm/v/@storybook-addons/docs.svg)](https://www.npmjs.com/package/@storybook-addons/docs)

## Install

```bash
npm i -D @storybook-addons/docs
```

## Usage

Register addon in `.storybook/addons.js`:

```js
import '@storybook-addons/docs/register'
```

Add decorator `withDocs` for your stories:

```js
import { withDocs } from '@storybook-addons/docs'

storiesOf('ComponentName', module)
  .addDecorator(withDocs({
    readme: {
      content: 'readme content',
      placeholders: {
        placeholderName: 'value',
      },
    },
  }))
```

## Markdown syntax

### Inline stories

```markdown
<!-- single story -->
{{%story::story-id%}}

<!-- multi stories with tab names -->
{{%story::tabName:story-id|tabName:story-id%}}
```

### Placeholders

```markdown
{{%inject::placeholderName%}}
```

## Similar packages

* [@storybook/addon-notes](https://github.com/storybookjs/storybook/tree/master/addons/notes)
* [@storybook/addon-docs](https://github.com/storybookjs/storybook/tree/next/addons/docs)
* [storybook-readme](https://github.com/tuchk4/storybook-readme)
* [react-storybook-addon-chapters](https://github.com/Checkfront/react-storybook-addon-chapters)

## License

Project is [MIT licensed](https://github.com/yarastqt/mercury/blob/master/LICENSE.md).
