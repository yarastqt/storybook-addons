import { StorySource } from '../docs-context'

function storyIdToSanitizedStoryName(id: string): string {
  return id.replace(/^.*?--/, '')
}

export const extractStorySource = (storyId: string, storySource: StorySource): string | null => {
  const targetId = storyIdToSanitizedStoryName(storyId)
  if (storySource === undefined) {
    return null
  }
  if (!storySource.locationsMap) {
    return storySource.source
  }
  const location = storySource.locationsMap[targetId]
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
