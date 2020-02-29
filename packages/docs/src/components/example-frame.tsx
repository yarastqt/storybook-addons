import React, { FC, SyntheticEvent, useCallback } from 'react'
import styled from '@emotion/styled'

const Frame = styled.iframe`
  width: 100%;
  border: none;
  display: block;
`

export type ExampleFrameProps = {
  storyId: string
  visible: boolean
}

const FRAME_TICK = 32

export const ExampleFrame: FC<ExampleFrameProps> = ({ storyId, visible }) => {
  if (!visible) {
    return null
  }

  const onLoad = useCallback((event: SyntheticEvent<HTMLIFrameElement>) => {
    const target = event.target as HTMLIFrameElement
    setTimeout(() => {
      if (target.contentWindow !== null) {
        // Fix iframe height after load.
        target.style.height = `${target.contentWindow.document.body.scrollHeight + 20}px`
        target.contentWindow.document.body.style.margin = '0'
        target.contentWindow.document.body.style.padding = '30px 20px'
      }
    }, FRAME_TICK)
  }, [])

  return <Frame tabIndex={-1} onLoad={onLoad} src={`iframe.html?id=${storyId}&embeded=true`} />
}
