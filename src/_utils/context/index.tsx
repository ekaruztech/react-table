import React from 'react'
import { ReactTableProviderProps } from '../../typings'

const ReactTableContext = React.createContext({} as ReactTableProviderProps)
ReactTableContext.displayName = 'React-Table'

export { ReactTableContext }
