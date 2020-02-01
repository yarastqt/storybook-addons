// import { createElement } from 'react'
import addons, { StoryGetter, StoryContext, makeDecorator } from '@storybook/addons'
import { STORY_CHANGED } from '@storybook/core-events'
// @ts-ignore
import jsxToString from 'react-element-to-jsx-string'
// @ts-ignore
// import renderer from 'react-test-renderer'
// import pf from 'pretty-format'
// const { ReactTestComponent, ReactElement } = pf.plugins
import { injectMarkdownPlaceholders } from './lib/inject-markdown-placeholders'
import { unescapeMarkdownSpecific } from './lib/unescape-markdown-specific'
import { ADD_README } from './constants'
import { PARAM_KEY } from './params'

export type WithDocsOptions = {
  readme?: {
    content: string
    placeholders?: Record<string, string>
  }
}

let isFirstLoad = true
let nextContent: string | undefined

// TODO: подумать можно ли как-то лучше использовать аддон, например добавлять описание через параметр, а регестрировать аддон один раз - глобально:
// .addParameters({ foo: 'param' })
export const withDocs = ({ readme }: WithDocsOptions) =>
  makeDecorator({
    name: 'withDocs',
    parameterName: PARAM_KEY,
    wrapper: (getStory: StoryGetter, context: StoryContext, settings) => {
      const isCanvasView = window.location.href.match(/&embeded=true/) === null
      const api = addons.getChannel()

      // TODO: нужно уметь провиливаться внутрь на какое-то кол-во уровней и настраивать это в каждой стори

      // TODO:  если type является функцией, то вызыаваем её, если нет - то ренедрим as is

      // console.log(getStory(context).type())
      // console.log(jsxToString(getStory(context)))
      // console.log(renderer.create(getStory(context)).toTree())
      // const q = pf(createElement('div', null, 'haa'), {
      //   plugins: [ReactTestComponent, ReactElement],
      //   printFunctionName: true,
      // })

      // console.log(context, getStory(context))


      const story = getStory(context)
// console.log(context)

      // TODO: тут вообщем надо подумать как заоптимизровать несколько вызовво и переключение между локальными вкладами примеров
      // возможно когда kind (Lego|Button/@desktop) меняется, то обнуляем все сорсы???



      if (!isCanvasView) {


        // TODO: все таки вложенность делать настраиваемой

        // console.log(story, settings.parameters.previewLevel)

        let source = story

        // TODO: Возможно стоит попробовать другую стратегию,
        // к примеру вызываем type в try-catch, если получается - то показываем этот результат, в противном слчае отдаем оригинал.
        // Нужно посмотреть различные кейсы, может быть такой вариант не будет работать везде.
        if (settings.parameters.previewLevel === 1) {
          if (typeof story.type === 'function') {
            source = story.type()
          }
        }

        api.emit('fake', {
          // @ts-ignore (нету ID, но возможно нам подойдет name, т.к. он уникален в рамках kind'a)
          id: context.id,
          // вот тут тоже бы не хотелось каждый раз вызывать эту шоблуеблу, а только по требованию, надо понять почему не работает
          source: jsxToString(source),
        })
        // console.log('yay')
      }

      if (isCanvasView) {
        // console.log('a')

        // console.log(jsxToString(getStory(context)))

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

      return story
    },
  })

// Кажется, что нужно добавить во все модули, сделать отдельной задачей.
if (module && module.hot && module.hot.decline) {
  module.hot.decline()
}
