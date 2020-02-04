# @storybook-addons/sync-external-url &middot; [![npm (scoped)](https://img.shields.io/npm/v/@storybook-addons/sync-external-url.svg)](https://www.npmjs.com/package/@storybook-addons/sync-external-url)

Sometimes we need to embed storybook on the site and here we face the problem of syncing links between the external site and storybook iframe.

## Install

```bash
npm i -D @storybook-addons/sync-external-url
```

## Usage

Firstly we need register addon in your storybook:

```js
import '@storybook-addons/sync-external-url/register'
```

### Trigger event from change custom tab

If you have addon with custom tab you can wrap Panel with `withFireEvents` for triggering event after tab changed:

```js
import React from 'react'
import addons, { types } from '@storybook/addons'
import { withFireEvents } from '@storybook-addons/sync-external-url'

const Panel = withFireEvents(() => <div>Panel content</div>)

addons.register('addon-id', (api) => {
  addons.add('panel-id', {
    type: types.TAB,
    title: 'Tab title',
    route: ({ storyId }) => `/tab/${storyId}`,
    match: ({ viewMode }) => viewMode === 'tab',
    render: ({ active }) => <Panel api={api} active={active} />,
  })
})
```

### Embeded storybook with iframe

After iframe loading we listen post-mesages and update external url also wee load storybook with current query params:

```js
import React from 'react'
import { IframeLoader } from '@storybook-addons/sync-external-url'

export const App = () => (
  <IframeLoader queryPrefix="storybook" frameBorder={0} src="https://your-storyboook.com" />
)
```

## License

Project is [MIT licensed](https://github.com/yarastqt/mercury/blob/master/LICENSE.md).
