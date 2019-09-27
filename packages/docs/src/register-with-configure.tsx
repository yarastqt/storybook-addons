import React, { useEffect } from 'react'
import { API } from '@storybook/api'
import addons, { types } from '@storybook/addons'

import { ADDON_ID, PANEL_ID } from './constants'
import { DocsPanel } from './components/docs-panel'

type ConfigureOptions = {
  /**
   * Tab title.
   *
   * @default 'Documentation'
   */
  tabTitle?: string
}

export const registerWithConfigure = ({ tabTitle = 'Documentation' }: ConfigureOptions = {}) => {
  addons.register(ADDON_ID, (api: API) => {
    addons.add(PANEL_ID, {
      type: types.TAB,
      title: tabTitle,
      route: ({ storyId }) => `/docsx/${storyId}`,
      match: ({ viewMode }) => viewMode === 'docsx',
      render: ({ active }) => {
        useEffect(() => {
          document.dispatchEvent(new Event('updateUrl', { bubbles: true }));
        }, [active]);
        return (<DocsPanel api={api} active={active} />);
      },
    })
  })
}
