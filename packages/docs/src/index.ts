import addons, { StoryGetter, StoryContext, makeDecorator } from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'

import { injectMarkdownPlaceholders } from './lib/inject-markdown-placeholders'
import { unescapeMarkdownSpecific } from './lib/unescape-markdown-specific'
import { ADD_README } from './constants'
import { PARAM_KEY } from './params'

export type WithDocsOptions = {
  readme?: {
    content: string | { default: string }
    placeholders?: Record<string, string>
  }
}

let isFirstLoad = true
let nextContent: string | undefined

export const withDocs = ({ readme }: WithDocsOptions) =>
  makeDecorator({
    name: 'withDocs',
    parameterName: PARAM_KEY,
    wrapper: (getStory: StoryGetter, context: StoryContext) => {
      const isCanvasView = window.location.href.match(/&embeded=true/) === null
      const api = addons.getChannel()

      if (isCanvasView) {
        if (readme !== undefined) {
          nextContent = typeof readme.content === 'string' ? readme.content : readme.content.default
          nextContent = unescapeMarkdownSpecific(nextContent)
          nextContent = injectMarkdownPlaceholders(nextContent, readme.placeholders)
        }

        if (isFirstLoad) {
          api.on(STORY_CHANGED, () => {
            setTimeout(() => {
              api.emit(ADD_README, { content: nextContent })
            }, 0)
            nextContent = undefined
          })
          api.emit(ADD_README, { content: nextContent })
          isFirstLoad = false
        }
      }

      return getStory(context)
    },
  })
