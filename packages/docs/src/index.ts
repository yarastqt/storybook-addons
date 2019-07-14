import addons, { StoryGetter, StoryContext, makeDecorator } from '@storybook/addons'

import { ADD_README } from './constants'

export type WithDocsOptions = {
  readme?: string
}

const registerCacheMap = new Map<string, boolean>()

export const withDocs = (options: WithDocsOptions) => makeDecorator({
  name: 'withDocs',
  parameterName: 'docs',
  wrapper: (getStory: StoryGetter, context: StoryContext) => {
    if (!registerCacheMap.has(context.kind)) {
      const api = addons.getChannel()
      api.emit(ADD_README, options.readme)
      registerCacheMap.set(context.kind, true)
    }
    return getStory(context)
  },
})
