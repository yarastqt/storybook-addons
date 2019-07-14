import React, { FC, useEffect, useState } from 'react'
import { API } from '@storybook/api'
import unified from 'unified'
import remark from 'remark-parse'
import remark2react from 'remark-react'

import { ADD_README } from '../constants'

export type DocsPanelProps = {
  active: boolean
  api: API
}

export const DocsPanel: FC<DocsPanelProps> = ({ api, active }) => {
  if (!active) {
    return null
  }

  const [content, setContent] = useState('')

  useEffect(() => {
    const onAddReadme = (markdown: string) => {
      const content = unified()
        .use(remark)
        .use(remark2react, {})
        .processSync(markdown)
        .contents
      setContent(content)
    }
    api.on(ADD_README, onAddReadme)
    return () => {
      api.off(ADD_README, onAddReadme)
    }
  })

  return (
    <div>
      {content}
    </div>
  )
}
