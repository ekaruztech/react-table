import React from 'react'
import { Button, Tooltip } from 'antd'
import { isFunction } from 'lodash'
import DataManagement from './utils/DataManagement'
import { TableRefresh, Export, RenderOrder } from './utils/TableUtilities'
import { ReactTableContext } from '../ReactTableContext'
// eslint-disable-next-line no-unused-vars
import { DataFilterObject } from '../../../types'
import './styles.scss'

interface ReactTableControlsProps {
  onRenderOrderChange: (renderOrder: number) => void
  onRefresh?: () => void
  onFilterApply?: (filters: DataFilterObject[]) => void
  onFilterClear?: () => void
  enableExport?:
    | [boolean, boolean, boolean]
    | [boolean, boolean]
    | [boolean]
    | boolean
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

  handleFilterColumnCancel = () => {
    this.setFilterColumn((prev) => ({ ...prev, visible: false }))
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
    const {
      onRenderOrderChange,
      onRefresh,
      onFilterApply,
      onFilterClear,
      onExport,
      enableExport
    } = this.props

    return (
      <ReactTableContext.Consumer>
        {({ dataSource, columns, model }) => {
          return (
            <div className='ReactTable___table-container-header'>
              <div className='ReactTable___table-container-header-inner-left'>
                <div className='ReactTable___table-filter-radio-sort'>
                  <Tooltip title='Manage data'>
                    <Button
                      icon={
                        <span className='anticon'>
                          <i
                            className='ri-database-2-line'
                            style={{ fontSize: 17 }}
                          />
                        </span>
                      }
                      onClick={() => {
                        this.setFilterColumn((prev) => ({
                          ...prev,
                          visible: true
                        }))
                      }}
                      type='primary'
                    >
                      Data Management
                    </Button>
                  </Tooltip>
                  <DataManagement
                    visible={this.state.filterColumn.visible}
                    handleCancel={this.handleFilterColumnCancel}
                    columns={columns}
                    dataSource={dataSource}
                    model={model}
                    onFilterApply={onFilterApply}
                    onFilterClear={onFilterClear}
                  />
                </div>

                <div className='ReactTable___table-filter-btn-container'>
                  <Export onExport={onExport} enableExport={enableExport} />
                </div>
              </div>

              <div className='ReactTable___table-container-header-inner-right'>
                {isFunction(onRefresh) && (
                  <TableRefresh onRefresh={onRefresh} />
                )}
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
