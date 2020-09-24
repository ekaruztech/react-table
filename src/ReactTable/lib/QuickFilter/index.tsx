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

class QuickFilter extends React.Component<IQuickFilter> {
  protected static readonly __DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE =
    '$$REACT_TABLE_QUICK_FILTER'

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    const { onApply, onClear } = this.props

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
}

export {
  QuickFilter as default,
  IQuickFilter as QuickFilterProps,
  QuickFilterApplyFn
}
