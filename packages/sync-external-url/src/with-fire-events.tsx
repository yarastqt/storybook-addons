import React, { FC, useEffect } from 'react'
import { API } from '@storybook/api'

import { UPDATE } from './constants'

type WithFireEventsProps = {
  active: boolean
  api: API
}

// TODO: Fix any type.
export const withFireEvents: any = (WrappedComponent: FC<any>) => ({
  active,
  api,
  ...props
}: WithFireEventsProps) => {
  useEffect(() => {
    api.emit(UPDATE)
  }, [active])
  return <WrappedComponent api={api} active={active} {...props} />
}
