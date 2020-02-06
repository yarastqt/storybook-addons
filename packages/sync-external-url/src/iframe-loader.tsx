import React, { FC, IframeHTMLAttributes, useMemo, useCallback } from 'react'
import qs from 'query-string'

import { UPDATE } from './constants'

type IframeProps = IframeHTMLAttributes<HTMLIFrameElement>
type IframeLoaderProps = IframeProps & {
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
    return qs.stringifyUrl({
      url: urlData.url,
      query: {
        ...urlData.query,
        path: queryData[queryPrefix] || urlData.query.path,
      },
    })
  }, [queryPrefix, src])

  const onLoad = useCallback(() => {
    window.addEventListener('message', (message) => {
      if (message.data === '') {
        return
      }
      const data = JSON.parse(message.data)
      if (data.method === UPDATE) {
        const urlData = qs.parseUrl(window.location.href)
        urlData.query[queryPrefix] = data.payload.path
        const nextUrl = qs.stringifyUrl(urlData)
        window.history.replaceState(null, '', nextUrl)
      }
    })
  }, [queryPrefix])

  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return <iframe {...props} src={source} onLoad={onLoad} />
}
