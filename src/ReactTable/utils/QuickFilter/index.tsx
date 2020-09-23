import React from 'react'
import { ReactTableContext } from '../ReactTableContext'
import FilterController from './utils/FilterController'

type QuickFilterApplyFn = (
  value: {
    property: string
    value: string[] | number | number[] | string
  }[]
) => void
interface IQuickFilter {
  onApply: QuickFilterApplyFn
  onClear: () => void
}

const QuickFilter: React.FC<IQuickFilter> = (props) => {
  const { onApply, onClear } = props

  return (
    <ReactTableContext.Consumer>
      {({ dataSource, columns }) => {
        return (
          <FilterController
            dataSource={dataSource}
            columns={columns}
            onClear={onClear}
            onApply={onApply}
          />
        )
      }}
    </ReactTableContext.Consumer>
  )
}

export {
  QuickFilter as default,
  IQuickFilter as QuickFilterProps,
  QuickFilterApplyFn
}
