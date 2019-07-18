import addons, { StoryGetter, StoryContext, makeDecorator } from '@storybook/addons'

import { ADD_README } from './constants'

export type WithDocsOptions = {
  readme?: {
    content: string
    placeholders?: Record<string, string>
  }
}

const injectMarkdownPlaceholders = (content: string, placeholders: Record<string, string> = {}) => {
  return content.replace(/{{%inject::(.+.)%}}/g, (match: string, key: string) => {
    if (placeholders[key] !== undefined) {
      return placeholders[key]
    }
    return ''
  })
}

let prevKind = ''

const shouldUpdateRender = (kind: string) => {
  if (kind !== prevKind) {
    prevKind = kind
    return true
  }
  return false
}

export const withDocs = ({ readme }: WithDocsOptions) => makeDecorator({
  name: 'withDocs',
  parameterName: 'docs',
  wrapper: (getStory: StoryGetter, context: StoryContext) => {
    const isCanvasView = location.href.match(/&embeded=true/) === null
    const api = addons.getChannel()

    if (isCanvasView && shouldUpdateRender(context.kind)) {
      if (readme !== undefined) {
        const content = injectMarkdownPlaceholders(readme.content, readme.placeholders)
        // FIXME: context not have id property.
        api.emit(ADD_README, { content })
      }
    }

    return getStory(context)
  },
})
