import React from 'react'
// eslint-disable-next-line no-unused-vars
import { ReactTableProviderProps } from '../types'

/**
 * Creates a named React context
 * @param name
 */
const createNamedContext = (name: string) => {
  const contextType = React.createContext({} as ReactTableProviderProps)
  contextType.displayName = name
  return contextType
}
export { createNamedContext }
