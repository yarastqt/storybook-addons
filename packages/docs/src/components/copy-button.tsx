import React, { FC, MouseEventHandler, MouseEvent, useCallback, useState } from 'react'
import styled from '@emotion/styled'

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  transition: opacity 100ms ease-in-out;
  padding: 0;
  height: 40px;
  position: absolute;
  top: 4px;
  right: 16px;

  &:hover {
    opacity: .5;
  }
`

const Text = styled.span`
  color: #fff;
  vertical-align: middle;
  margin-right: 4px;
  font-size: 14px;
`

const Svg = styled.svg`
  vertical-align: middle;
`

export type CopyButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const CopyButton: FC<CopyButtonProps> = ({ onClick }) => {
  const [copyText, setCopyText] = useState('Copy')
  const onInternalClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setCopyText('Copied')
    onClick(event)
    setTimeout(() => {
      setCopyText('Copy')
    }, 2000)
  }, [])

  return (
    <Button tabIndex={-1} onClick={onInternalClick}>
      <Text>{copyText}</Text>
      <Svg width="18px" height="18px" viewBox="0 0 13 15">
        <g fill="#011627" stroke="#fff" fillRule="nonzero" strokeWidth="1">
          <rect x="0.5" y="0.5" width="9" height="11" rx="1.5" />
          <rect x="3.5" y="3.5" width="9" height="11" rx="1.5" />
        </g>
      </Svg>
    </Button>
  )
}
