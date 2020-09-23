import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import DataManagement from './utils/DataControls'
import {
  ColumnDensity,
  ControlActions,
  RenderOrder
} from './utils/TableControls'
import { ReactTableContext } from '../ReactTableContext'

interface IReactTableControls {
  renderOrder: number
  onRenderOrderChange: (renderOrder: number) => void
}

const Controls: React.FC<IReactTableControls> = (props) => {
  const { renderOrder: pageRenderOrder, onRenderOrderChange } = props

  const [filterColumn, setFilterColumn] = useState({ visible: false })
  const handleFilterColumnCancel = () => {
    setFilterColumn((prev) => ({ ...prev, visible: false }))
  }

  return (
    <ReactTableContext.Consumer>
      {({ dataSource, columns }) => {
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
                      setFilterColumn((prev) => ({ ...prev, visible: true }))
                    }}
                    type='primary'
                  >
                    Data Management
                  </Button>
                </Tooltip>
                <DataManagement
                  visible={filterColumn.visible}
                  handleCancel={handleFilterColumnCancel}
                  columns={columns}
                  dataSource={dataSource}
                />
              </div>

              <div className='ReactTable___table-filter-btn-container'>
                <ControlActions />
              </div>
            </div>

            <div className='ReactTable___table-container-header-inner-right'>
              <ColumnDensity />
              <RenderOrder
                renderOrder={pageRenderOrder}
                setRenderOrder={onRenderOrderChange}
              />
            </div>
          </div>
        )
      }}
    </ReactTableContext.Consumer>
  )
}

export { Controls as default, IReactTableControls as ControlsProps }
