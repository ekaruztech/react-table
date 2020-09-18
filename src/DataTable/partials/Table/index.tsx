import React from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
// eslint-disable-next-line no-unused-vars
import { TableColumnProps, ColumnProps, TableColumnControls, ColumnMenuItems } from '../../types'
import { isEmpty } from 'lodash'

type TableProps = {
  columnKeys: string[]
  columns: TableColumnProps
  setColumns: React.Dispatch<React.SetStateAction<TableColumnProps>>
  maxColumns: number
  minColumns: number
  defaultColumns: Array<ColumnProps>
  dataSource: Array<any>
  checkState: {
    checkedList: Array<any>
    indeterminate: boolean
    checkAll: boolean
  }
  onCheckAllChange: (e: any) => void
  onCheckedChange: (checkedList: Array<any>) => void
  tablePages: { all: number; currentPage: number }
  handlePagination: (page: number) => void
  isLoadingContent: boolean
  useSkeletonLoader: boolean
  controls: TableColumnControls
  columnMenuItems: ColumnMenuItems | undefined
}
export default (props: TableProps) => {
  const {
    columnKeys,
    maxColumns,
    minColumns,
    checkState,
    columns,
    dataSource,
    defaultColumns,
    onCheckAllChange,
    setColumns,
    onCheckedChange,
    tablePages,
    handlePagination,
    isLoadingContent,
    useSkeletonLoader,
    controls,
    columnMenuItems
  } = props
  return (
    <div className='___table-wrapper'>
      <table className='___table'>
        <TableHead
          columns={columns}
          columnKeys={columnKeys}
          onCheckAllChange={onCheckAllChange}
          setColumns={setColumns}
          checkState={checkState}
          maxColumns={maxColumns}
          minColumns={minColumns}
          defaultColumns={defaultColumns}
        />
        <TableBody
          columns={columns}
          columnKeys={columnKeys}
          checkState={checkState}
          onCheckedChange={onCheckedChange}
          dataSource={dataSource}
          isLoadingContent={isLoadingContent}
          useSkeletonLoader={useSkeletonLoader}
          controls={controls}
          columnMenuItems={columnMenuItems}
        />
      </table>
      {/* <table className={'___table-fixed'}> */}
      {/*    <TableHead */}
      {/*        columns={columns} */}
      {/*        columnKeys={columnKeys} */}
      {/*        onCheckAllChange={onCheckAllChange} */}
      {/*        setColumns={setColumns} */}
      {/*        checkState={checkState} */}
      {/*        maxColumns={maxColumns} */}
      {/*        minColumns={minColumns} */}
      {/*        defaultColumns={defaultColumns} */}
      {/*    /> */}
      {/*    <tbody/> */}
      {/* </table> */}
      <TableFooter
        currentPage={tablePages.currentPage}
        handlePagination={handlePagination}
        total={tablePages.all}
        isLoadingContent={isLoadingContent}
        isAnEmptyContent={isEmpty(dataSource)}
      />
    </div>
  )
}
