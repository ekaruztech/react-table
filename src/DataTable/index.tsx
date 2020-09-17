import React, { useMemo, useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import './styles/override.scss'
import './styles/styles.scss'
import Table from './partials/Table'
import Header from './partials/Header'
import QuickFilter from './partials/Header/QuickFilter'
import { clamp, isArray } from 'lodash'
// eslint-disable-next-line no-unused-vars
import { ColumnProps } from './types'

interface DataTableProps {
  columns: ColumnProps[]
  dataSource: Array<any>
  minColumns?: number
  maxColumns?: number
  useSkeletonLoader?: boolean
  isLoadingContent?: boolean
  pageRenderOrder?: number
  onRenderOrderChange?: (renderOrder: number) => void
  onPaginationChange: (page: number) => void
  pagination: { all: number; currentPage: number }
}

const DataTable = (props: DataTableProps) => {
  const {
    columns: defaultColumns,
    dataSource,
    minColumns: defaultMinCol,
    maxColumns: defaultMaxCol,
    useSkeletonLoader,
    isLoadingContent,
    pageRenderOrder,
    onRenderOrderChange,
    pagination,
    onPaginationChange
  } = props

  if (!defaultColumns || !isArray(defaultColumns))
    throw new Error(
      `DataTable expects column to be of type Array, got ${typeof defaultColumns} instead`
    )
  if (!dataSource || !isArray(dataSource))
    throw new Error(
      `DataTable expects dataSource to be of type Array, got ${typeof dataSource} instead`
    )

  const minColumns = clamp(defaultMinCol || 3, 3, 6)
  const maxColumns = clamp(defaultMaxCol || 3, minColumns, 6)

  const [columns, setColumns] = useState({
    all: defaultColumns || [],
    selected: defaultColumns?.slice?.(0, maxColumns) || [],
    unselected:
      defaultColumns?.length > maxColumns
        ? defaultColumns?.slice?.(maxColumns, defaultColumns.length)
        : []
  })

  const [checkState, setCheckedState] = useState({
    checkedList: [],
    indeterminate: true,
    checkAll: false
  })

  const onCheckedChange = (checkedList: any) => {
    setCheckedState({
      checkedList,
      indeterminate:
        checkedList.length > 0 && checkedList.length !== dataSource.length,
      checkAll: checkedList.length === dataSource.length
    })
  }
  // TODO: Find an optional way to get the total width of the table to enable responsiveness on screens.
  const onCheckAllChange = (e: any) => {
    setCheckedState({
      // @ts-ignore
      checkedList: e.target.checked ? dataSource : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  const columnKeys = useMemo(
    () => columns.selected.map((value) => value?.key),
    [columns.selected]
  )

  const handlePagination = (page: number) => {
    onPaginationChange(page)
  }

  return (
    <div className='___table-container'>
      <Header
        columns={columns}
        dataSource={dataSource}
        renderOrder={{
          pageRenderOrder: pageRenderOrder || 15,
          setPageRenderOrder: onRenderOrderChange || null
        }}
      />
      <QuickFilter columns={columns} dataSource={dataSource} />
      <Table
        setColumns={setColumns}
        handlePagination={handlePagination}
        columns={columns}
        columnKeys={columnKeys}
        checkState={checkState}
        dataSource={dataSource}
        defaultColumns={defaultColumns}
        maxColumns={maxColumns}
        minColumns={minColumns}
        onCheckAllChange={onCheckAllChange}
        onCheckedChange={onCheckedChange}
        tablePages={pagination}
        isLoadingContent={Boolean(isLoadingContent)}
        useSkeletonLoader={Boolean(useSkeletonLoader)}
      />
    </div>
  )
}

export { DataTable }
