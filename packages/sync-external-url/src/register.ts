import addons from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'

import { ADDON_ID, UPDATE } from './constants'

addons.register(ADDON_ID, (api) => {
  const channel = api.getChannel()
  const onUpdate = () => {
    const { path } = api.getUrlState()
    const message = JSON.stringify({
      method: UPDATE,
      payload: { path },
    })
    window.parent.postMessage(message, '*')
  }

  channel.on(STORY_CHANGED, onUpdate)
  channel.on(UPDATE, onUpdate)
})
