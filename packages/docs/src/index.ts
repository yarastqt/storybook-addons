import addons, { StoryGetter, StoryContext, makeDecorator } from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'

import { injectMarkdownPlaceholders } from './lib/inject-markdown-placeholders'
import { unescapeMarkdownSpecific } from './lib/unescape-markdown-specific'
import { ADD_README } from './constants'
import { PARAM_ID } from './params'

export type WithDocsOptions = {
  readme?: {
    content: string
    placeholders?: Record<string, string>
  }
}

let isFirstLoad = true
let nextContent: string | undefined

export const withDocs = ({ readme }: WithDocsOptions) =>
  makeDecorator({
    name: 'withDocs',
    parameterName: PARAM_ID,
    wrapper: (getStory: StoryGetter, context: StoryContext) => {
      const isCanvasView = window.location.href.match(/&embeded=true/) === null
      const api = addons.getChannel()

      if (isCanvasView) {
        if (readme !== undefined) {
          nextContent = unescapeMarkdownSpecific(readme.content)
          nextContent = injectMarkdownPlaceholders(nextContent, readme.placeholders)
        }

        if (isFirstLoad) {
          api.on(STORY_CHANGED, () => {
            requestAnimationFrame(() => {
              api.emit(ADD_README, { content: nextContent })
            })
            nextContent = undefined
          })
          api.emit(ADD_README, { content: nextContent })
          isFirstLoad = false
        }
      }

      return getStory(context)
    },
  })
