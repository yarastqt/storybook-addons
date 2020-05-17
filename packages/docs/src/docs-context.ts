import { Context, createContext, useContext } from 'react'

export type StorySource = {
  source: string
  locationsMap: {
    [key: string]: {
      [key in 'endBody' | 'endLoc' | 'startBody' | 'startLoc']: {
        col: number
        line: number
      }
    }
  }
}

export type DocsContextProps = {
  parameters: {
    docs?: {
      enableNavigation?: boolean
      readme?: string | { default: string }
      placeholders?: Record<string, string>
    }
    storySource: StorySource
  }
}

export const DocsContext: Context<DocsContextProps> = createContext({} as DocsContextProps)
export const DocsContextProvider = DocsContext.Provider
export const useDocsContext = () => {
  return useContext(DocsContext)
}
