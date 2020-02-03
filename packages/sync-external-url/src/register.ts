import addons from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'

import { ADDON_ID, UPDATE } from './constants'

addons.register(ADDON_ID, (api) => {
  const channel = api.getChannel()
  const onUpdate = () => {
    window.parent.postMessage(
      JSON.stringify({
        method: UPDATE,
        payload: { path: api.getUrlState().path },
      }),
      '*',
    )
  }

  channel.on(STORY_CHANGED, onUpdate)
  channel.on(UPDATE, onUpdate)
})
