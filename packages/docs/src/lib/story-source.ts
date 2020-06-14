import { StorySource, LocationsMap } from '../docs-context'

export const extractStorySource = (storyId: string, storySource: StorySource): string | null => {
  if (storySource === undefined) {
    return null
  }
  if (!storySource.locationsMap) {
    return storySource.source
  }
  const location = storySource.locationsMap[storyId]
  // FIXME: bad locationsMap generated for module export functions whose titles are overridden
  if (!location) return null
  const { startBody: start, endBody: end } = location
  const lines = storySource.source.split('\n')
  if (start.line === end.line && lines[start.line - 1] !== undefined) {
    return lines[start.line - 1].substring(start.col, end.col)
  }
  // NOTE: storysource locations are 1-based not 0-based!
  const startLine = lines[start.line - 1]
  const endLine = lines[end.line - 1]
  if (startLine === undefined || endLine === undefined) {
    return storySource.source
  }
  return [
    // startLine.substring(start.col),
    startLine,
    ...lines.slice(start.line, end.line - 1),
    endLine.substring(0, end.col),
  ].join('\n')
}

function sanitize(string: string): string {
  return (
    string
      .toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  )
}

function toId(kind: string, name: string): string {
  return `${sanitize(kind)}--${sanitize(name)}`
}

export function enhanceLocationsMap(kind: string, locationsMap: LocationsMap): LocationsMap {
  const result: LocationsMap = {}
  // eslint-disable-next-line guard-for-in
  for (const key in locationsMap) {
    result[toId(kind, key)] = locationsMap[key]
  }
  return result
}
