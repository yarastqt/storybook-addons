import React, { FC, IframeHTMLAttributes, useMemo, useEffect } from 'react'
import qs from 'query-string'

import { UPDATE } from './constants'

type IframeHtmlProps = IframeHTMLAttributes<HTMLIFrameElement>
type IframeLoaderProps = IframeHtmlProps & {
  /**
   * Prefix used for query search.
   *
   * @default 'path'
   */
  queryPrefix?: string

  /**
   * Iframe source.
   */
  src: string
}

export const IframeLoader: FC<IframeLoaderProps> = ({ queryPrefix = 'path', src, ...props }) => {
  const source = useMemo(() => {
    const queryData = qs.parse(window.location.search)
    const urlData = qs.parseUrl(src)
    const query = qs.stringify({
      ...urlData.query,
      path: queryData[queryPrefix] || urlData.query.path,
    })
    return `${urlData.url}?${query}`
  }, [queryPrefix, src])

  useEffect(() => {
    const onMessage = (message: { data: string }) => {
      if (message.data === '') {
        return
      }
      try {
        const data = JSON.parse(message.data)
        if (data.method === UPDATE) {
          const urlData = qs.parseUrl(window.location.href)
          urlData.query[queryPrefix] = data.payload.path
          const nextQuery = qs.stringify(urlData.query)
          const nextUrl = `${urlData.url}?${nextQuery}`
          window.history.replaceState(null, '', nextUrl)
        }
      } catch (error) {
        // Suppress error while parsing.
      }
    }

    window.addEventListener('message', onMessage)

    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [])

  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return <iframe {...props} src={source} />
}
