import addons, { StoryGetter, StoryContext, makeDecorator } from '@storybook/addons'

import { ADD_README } from './constants'

export type WithDocsOptions = {
  readme?: {
    content: string
    placeholders?: Record<string, string>
  }
}

const registerCacheMap = new Map<string, boolean>()

const injectMarkdownPlaceholders = (content: string, placeholders: Record<string, string> = {}) => {
  return content.replace(/{{%inject:(.+.)%}}/g, (match: string, key: string) => {
    if (placeholders[key] !== undefined) {
      return placeholders[key]
    }
    return ''
  })
}

export const withDocs = ({ readme }: WithDocsOptions) => makeDecorator({
  name: 'withDocs',
  parameterName: 'docs',
  wrapper: (getStory: StoryGetter, context: StoryContext) => {
    if (!registerCacheMap.has(context.kind)) {
      if (readme !== undefined) {
        addons.getChannel().emit(
          ADD_README,
          injectMarkdownPlaceholders(readme.content, readme.placeholders),
        )
        registerCacheMap.set(context.kind, true)
      }
    }
    return getStory(context)
  },
})
