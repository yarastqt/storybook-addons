import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

export const SkeletonContent = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 545">
    <g fill="#f5f5f5" fillRule="evenodd">
      <rect width="600" height="113" y="144" rx="3" />
      <rect width="300" height="32" rx="3" />
      <rect width="200" height="32" y="48" rx="3" />
      <rect width="460" height="32" y="96" rx="3" />
      <rect width="300" height="32" y="273" rx="3" />
      <rect width="200" height="32" y="321" rx="3" />
      <rect width="460" height="32" y="369" rx="3" />
      <rect width="300" height="32" y="417" rx="3" />
      <rect width="200" height="32" y="465" rx="3" />
      <rect width="460" height="32" y="513" rx="3" />
      <rect width="200" height="32" x="760" rx="3" />
      <rect width="200" height="32" x="760" y="45" rx="3" />
      <rect width="200" height="32" x="760" y="90" rx="3" />
      <rect width="200" height="32" x="760" y="135" rx="3" />
      <rect width="200" height="32" x="760" y="180" rx="3" />
      <rect width="200" height="32" x="760" y="225" rx="3" />
    </g>
  </Svg>
)

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`

const Svg = styled.svg`
  animation: ${pulse} 1.5s ease-in-out infinite;
`
