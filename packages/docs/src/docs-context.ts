import { Context, createContext, useContext } from 'react'

type Location = Record<
  'endBody' | 'endLoc' | 'startBody' | 'startLoc',
  {
    col: number
    line: number
  }
>

export type LocationsMap = Record<string, Location>

export type StorySource = {
  source: string
  locationsMap: LocationsMap
}

export type StoryStore = {
  fromId: (id: string) => DocsContextProps
}

export type DocsContextProps = {
  kind: string
  parameters: {
    docs?: {
      enableNavigation?: boolean
      readme?: string | { default: string }
      placeholders?: Record<string, string>
    }
    storySource: StorySource
  }
  storyStore: StoryStore
}

export const DocsContext: Context<DocsContextProps> = createContext({} as DocsContextProps)
export const DocsContextProvider = DocsContext.Provider
export const useDocsContext = () => {
  return useContext(DocsContext)
}
