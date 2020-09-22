import React from 'react'
// eslint-disable-next-line no-unused-vars
import { TableBodyProviderProps } from '../../../../../types'

const TableBodyContext = React.createContext({} as TableBodyProviderProps)
TableBodyContext.displayName = 'RT__TableBody'

export { TableBodyContext }
