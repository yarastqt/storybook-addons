import React, { FC, useCallback } from 'react'
import styled from '@emotion/styled'

const Frame = styled.iframe`
  width: 100%;
  border: none;
`

export type ExampleFrameProps = {
  storyId: boolean
}

export const ExampleFrame: FC<ExampleFrameProps> = ({ storyId }) => {
  // TODO: add event type.
  const onLoad = useCallback((event: any) => {
    const target = event.target
    setTimeout(() => {
      // Fix iframe height after load.
      target.style.height = `${target.contentWindow.document.body.scrollHeight}px`
      target.contentWindow.document.body.style.margin = 0
    }, 32)
  }, [])

  return (
    <Frame
      onLoad={onLoad}
      src={`/iframe.html?id=${storyId}&inline=true`}
    />
  )
}
