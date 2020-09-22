import React from 'react'
import { ReactTableContext } from '../ReactTableContext'
import FilterController from './utils/FilterController'

interface IQuickFilter {
  onApply: (
    value: {
      property: string
      value: string[] | number | number[] | string
    }[]
  ) => void
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

export { QuickFilter as default, IQuickFilter as QuickFilterProps }
