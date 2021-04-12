import React from 'react'
import { isFunction } from 'lodash'
import { Export, RenderOrder } from './utils/TableUtilities'
import { ReactTableContext } from '../../../_utils/context'

import './styles/index.scss'

interface ReactTableControlsProps {
  onRenderOrderChange: (renderOrder: number) => void
  enableExport?:
    | [boolean, boolean, boolean]
    | [boolean, boolean]
    | [boolean]
    | boolean
    | { csv?: boolean; pdf?: boolean; excel?: boolean }
  onExport?: (exportType: 'csv' | 'pdf' | 'excel') => void
}

interface ReactTableControlsPropsState {
  filterColumn: { visible: boolean }
}

class Controls extends React.Component<
  ReactTableControlsProps,
  ReactTableControlsPropsState
> {
  protected static readonly __DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE =
    '$$REACT_TABLE_CONTROLS'

  state = {
    filterColumn: { visible: false }
  }

  setFilterColumn = (
    state:
      | ((prev: { visible: boolean }) => { visible: boolean })
      | { visible: boolean }
  ) => {
    this.setState((prev) => ({
      ...prev,
      filterColumn: isFunction(state) ? state(prev.filterColumn) : state
    }))
  }

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
    const { onRenderOrderChange, onExport, enableExport } = this.props

    return (
      <ReactTableContext.Consumer>
        {({ model }) => {
          return (
            <div className='ReactTable___table-container-header'>
              <div className='ReactTable___table-container-header-inner-left'>
                <div className='ReactTable___table-filter-btn-container'>
                  <Export onExport={onExport} enableExport={enableExport} />
                </div>
              </div>

              <div className='ReactTable___table-container-header-inner-right'>
                <RenderOrder
                  onRenderOrderChange={onRenderOrderChange}
                  model={model}
                />
              </div>
            </div>
          )
        }}
      </ReactTableContext.Consumer>
    )
  }
}

export { Controls as default, ReactTableControlsProps as ControlsProps }
