import React, { FC } from 'react'
import { API } from '@storybook/api'

export type DocsPanelProps = {
  active: boolean
  api: API
}

export const DocsPanel: FC<DocsPanelProps> = (props) => {
  return (
    <div>
      docs panel
    </div>
  )
}
