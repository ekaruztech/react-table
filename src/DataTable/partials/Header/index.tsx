import React, { Fragment, useState } from 'react'
import { Button, Tooltip } from 'antd'
import DataManagement from './DataManagement'
import TableControls from './Controls'
// eslint-disable-next-line no-unused-vars
import { TableColumnProps, TableQuickFilterProps } from '../../types'
import QuickFilter from './QuickFilter'
import { Align, Padding } from '../../../TableUtility'

type HeaderProps = {
  columns: TableColumnProps
  dataSource: Array<any>
  renderOrder: {
    pageRenderOrder: number
    setPageRenderOrder: React.Dispatch<React.SetStateAction<number>> | null
  }
  quickFilter: TableQuickFilterProps | undefined
  useQuickFilter: boolean
}
export default (props: HeaderProps) => {
  const {
    dataSource,
    columns,
    renderOrder: { pageRenderOrder, setPageRenderOrder },
    useQuickFilter,
    quickFilter
  } = props

  const [filterColumn, setFilterColumn] = useState({ visible: false })
  const handleFilterColumnCancel = () => {
    setFilterColumn((prev) => ({ ...prev, visible: false }))
  }

  return (
    <Fragment>
      <div className='___table-container-header'>
        <div className='___table-container-header-inner-left'>
          <div className='___table-filter-radio-sort'>
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

          <div className='___table-filter-btn-container'>
            <TableControls.ControlActions />
          </div>
        </div>

        <div className='___table-container-header-inner-right'>
          <TableControls.ColumnDensity />
          <TableControls.RenderOrder
            renderOrder={pageRenderOrder}
            setRenderOrder={setPageRenderOrder}
          />
        </div>
      </div>
      <QuickFilter
        columns={columns}
        dataSource={dataSource}
        useQuickFilter={useQuickFilter}
        quickFilterActions={quickFilter}
      />
      <Align
        style={{
          width: '100%',
          borderTop: '1px solid var(--border-color-split)',
          background: 'var(--background-primary)',
          height: 60
        }}
        alignCenter
      >
        <Padding horizontal={20} vertical={10} style={{ height: '100%' }}>
          <Align alignCenter style={{ height: '100%' }}>
            <Button type='link'>
              <Align alignCenter>
                <span>20 selected</span>
              </Align>
            </Button>
            <Padding horizontal={10} style={{ height: '100%' }}>
              <div
                style={{
                  height: '100%',
                  borderLeft: '1px solid var(--border-color-split)'
                }}
              />
            </Padding>

            <Tooltip title='Delete selected'>
              <Button
                danger
                type='text'
                icon={
                  <span className='anticon'>
                    <i className='ri-delete-bin-line' />
                  </span>
                }
              >
                Delete
              </Button>
            </Tooltip>
            <Padding horizontal={10} style={{ height: '100%' }}>
              <div
                style={{
                  height: '100%',
                  borderLeft: '1px solid var(--border-color-split)'
                }}
              />
            </Padding>

            <Tooltip title='Pin selected'>
              <Button
                type='text'
                icon={
                  <span className='anticon'>
                    <i className='ri-pushpin-line' />
                  </span>
                }
              >
                Pin
              </Button>
            </Tooltip>
          </Align>
        </Padding>
      </Align>
    </Fragment>
  )
}
