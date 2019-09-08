import React from 'react'

import { storiesOf } from '@storybook/react'
import { withDocs } from '@storybook-addons/docs'

storiesOf('Button', module)
  .addDecorator(
    withDocs({
      readme: {
        content: require('./documentation.md').default,
      },
    }),
  )
  .add('exapmple-1', () => <button>Click me (example 1)</button>)
  .add('exapmple-2', () => <button>Click me (example 2)</button>)

storiesOf('Link', module).add('exapmple-3', () => <a href="#">Click me (example 3)</a>)
