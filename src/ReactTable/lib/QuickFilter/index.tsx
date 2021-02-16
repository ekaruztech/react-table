import React from 'react'
import { ReactTableContext } from '../ReactTableContext'
import FilterController from './utils/FilterController'

export type QuickFilterReturnType = {
  property: string
  value: string[] | number | number[] | string
}
export type QuickFilterApplyFn = (value: QuickFilterReturnType[]) => void

export type QuickFilterOnFieldsChangeFn = (
  allFields: QuickFilterReturnType[]
) => void

export type QuickFilterOnFieldsRemoveFn = (
  removedField: string | undefined,
  allFields: QuickFilterReturnType[]
) => void

interface IQuickFilter {
  onApply: QuickFilterApplyFn
  onClear: () => void
  onFieldsChange?: QuickFilterApplyFn
  onFieldsRemove?: QuickFilterOnFieldsRemoveFn
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
    const { onApply, onClear, onFieldsChange, onFieldsRemove } = this.props

    return (
      <ReactTableContext.Consumer>
        {({ dataSource, columns, model }) => {
          return (
            <FilterController
              dataSource={dataSource}
              columns={columns}
              onClear={onClear}
              onApply={onApply}
              onFieldsChange={onFieldsChange}
              onFieldsRemove={onFieldsRemove}
              model={model}
            />
          )
        }}
      </ReactTableContext.Consumer>
    )
  }
}

export { QuickFilter as default, IQuickFilter as QuickFilterProps }
