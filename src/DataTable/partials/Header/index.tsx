import React, { Fragment, useState } from 'react'
import { Button, Tooltip } from 'antd'
import DataManagement from './DataManagement'
import TableControls from './Controls'

import {
  // eslint-disable-next-line no-unused-vars
  TableColumnProps,
  // eslint-disable-next-line no-unused-vars
  TableQuickFilterProps,
  // eslint-disable-next-line no-unused-vars
  TableColumnControls
} from '../../types'
import QuickFilter from './QuickFilter'
import MultipleSelect from './Controls/MultipleSelect'

type HeaderProps = {
  columns: TableColumnProps
  dataSource: Array<any>
  renderOrder: {
    pageRenderOrder: number
    setPageRenderOrder: React.Dispatch<React.SetStateAction<number>> | null
  }
  quickFilter: TableQuickFilterProps | undefined
  useQuickFilter: boolean
  multipleSelectList?: any
  controls: TableColumnControls
}
export default (props: HeaderProps) => {
  const {
    dataSource,
    columns,
    renderOrder: { pageRenderOrder, setPageRenderOrder },
    useQuickFilter,
    quickFilter,
    multipleSelectList,
    controls
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
      <MultipleSelect
        multipleSelectList={multipleSelectList}
        controls={controls}
      />
    </Fragment>
  )
}
