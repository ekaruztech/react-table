import React from 'react'
// eslint-disable-next-line no-unused-vars
import { ReactTableProviderProps } from '../../../types'

const ReactTableContext = React.createContext({} as ReactTableProviderProps)
ReactTableContext.displayName = 'React-Table'

export { ReactTableContext }
