import React from 'react'
import { API } from '@storybook/api'
import addons, { types } from '@storybook/addons'

import { ADDON_ID, PANEL_ID } from './constants'
import { DocsPanel } from './components/docs-panel'

addons.register(ADDON_ID, (api: API) => {
  // TODO: Add guidelines panel.
  addons.add(PANEL_ID, {
    type: types.TAB,
    // TODO: Get from config.
    title: 'Documentation',
    route: ({ storyId }) => `/docsx/${storyId}`,
    match: ({ viewMode }) => viewMode === 'docsx',
    render: ({ active }) => <DocsPanel api={api} active={active} />,
  })
})
