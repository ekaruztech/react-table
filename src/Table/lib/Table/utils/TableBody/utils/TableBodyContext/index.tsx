import React from 'react'
// eslint-disable-next-line no-unused-vars
import { TableBodyProviderProps } from '../../../../../../../typings'

const TableBodyContext = React.createContext({} as TableBodyProviderProps)
TableBodyContext.displayName = 'RT__TableBody'

export { TableBodyContext }
