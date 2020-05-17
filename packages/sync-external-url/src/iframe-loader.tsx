import React, { FC, IframeHTMLAttributes, useMemo, useCallback, useEffect } from 'react'
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

export const IframeLoader: FC<IframeLoaderProps> = ({ queryPrefix = 'path', src, onLoad: htmlOnLoad, ...props }) => {
  const source = useMemo(() => {
    const queryData = qs.parse(window.location.search)
    const urlData = qs.parseUrl(src)
    const query = qs.stringify({
      ...urlData.query,
      path: queryData[queryPrefix] || urlData.query.path,
    })
    return `${urlData.url}?${query}`
  }, [queryPrefix, src])

  // prettier-ignore
  const onMessage = useCallback((message: any) => {
    if (message.data === '') {
      return
    }
    const data = JSON.parse(message.data)
    if (data.method === UPDATE) {
      const urlData = qs.parseUrl(window.location.href)
      urlData.query[queryPrefix] = data.payload.path
      const nextQuery = qs.stringify(urlData.query)
      const nextUrl = `${urlData.url}?${nextQuery}`
      window.history.replaceState(null, '', nextUrl)
    }
  }, [queryPrefix])

  useEffect(() => {
    return () => {
      window.removeEventListener('message', onMessage)
    }
  })

  // prettier-ignore
  const onLoad = useCallback((event) => {
    if (htmlOnLoad !== undefined) {
      htmlOnLoad(event as any)
    }

    window.addEventListener('message', onMessage)
  }, [htmlOnLoad])

  // eslint-disable-next-line jsx-a11y/iframe-has-title
  return <iframe {...props} src={source} onLoad={onLoad} />
}
