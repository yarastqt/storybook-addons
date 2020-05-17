import { StorySource } from '../docs-context'

export const extractStorySource = (
  storyId: string,
  { source, locationsMap }: StorySource,
): string | null => {
  if (!locationsMap) {
    return source
  }
  const location = locationsMap[storyId]
  // FIXME: bad locationsMap generated for module export functions whose titles are overridden
  if (!location) return null
  const { startBody: start, endBody: end } = location
  const lines = source.split('\n')
  if (start.line === end.line && lines[start.line - 1] !== undefined) {
    return lines[start.line - 1].substring(start.col, end.col)
  }
  // NOTE: storysource locations are 1-based not 0-based!
  const startLine = lines[start.line - 1]
  const endLine = lines[end.line - 1]
  if (startLine === undefined || endLine === undefined) {
    return source
  }
  return [
    // startLine.substring(start.col),
    startLine,
    ...lines.slice(start.line, end.line - 1),
    endLine.substring(0, end.col),
  ].join('\n')
}
