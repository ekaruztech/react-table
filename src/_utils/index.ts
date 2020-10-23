import React from 'react'
// eslint-disable-next-line no-unused-vars
import { ColumnProps, ReactTableProviderProps } from '../types'
// eslint-disable-next-line no-unused-vars
import Model from './model'

/**
 * Creates a named React context
 * @param name
 */
const createNamedContext = (name: string) => {
  const contextType = React.createContext({} as ReactTableProviderProps)
  contextType.displayName = name
  return contextType
}

const enumeratePresets = (
  model: Model,
  columns: ColumnProps[],
  maxColumns: number,
  minColumns: number
): { selected: ColumnProps[]; unselected: ColumnProps[] } => {
  if (
    model?.columnReorder?.presets &&
    !!model?.columnReorder?.presets?.length
  ) {
    const presets = model.columnReorder.presets
    // Checks if the preset length with the range of the minColumns and maxColumns
    // Checks if the properties in the presets still exists in the provided columns
    const presetIsUsable =
      model.columnReorder.presets.length <= maxColumns &&
      model.columnReorder.presets.length >= minColumns &&
      maxColumns &&
      presets.every((preset: string) => {
        if (Array.isArray(columns)) {
          const stillExist = columns.find((column: ColumnProps) => {
            return column.key === preset
          })
          return !!stillExist
        }
        return false
      })

    if (presetIsUsable) {
      const presetColumns: ColumnProps[] = columns.filter(
        (column: ColumnProps) => {
          return model.columnReorder.presets.includes(column.key)
        }
      )
      const unselectedColumns: ColumnProps[] = columns.filter(
        (column: ColumnProps) => {
          return !model.columnReorder.presets.includes(column.key)
        }
      )

      return { selected: presetColumns, unselected: unselectedColumns }
    } else {
      model.store('columnReorder', { presets: [] })
    }
    return {
      selected: columns?.slice?.(0, maxColumns) || [],
      unselected:
        columns?.length > maxColumns
          ? columns?.slice?.(maxColumns, columns.length)
          : []
    }
  }

  return {
    selected: columns?.slice?.(0, maxColumns) || [],
    unselected:
      columns?.length > maxColumns
        ? columns?.slice?.(maxColumns, columns.length)
        : []
  }
}
export { createNamedContext, enumeratePresets }
