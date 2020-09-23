// eslint-disable-next-line no-unused-vars
import React, { Fragment, ReactNode, ReactElement } from 'react'
import TableHead from './utils/TableHead'
import TableBody from './utils/TableBody'
import TableFooter from './utils/TableFooter'
import CellSelectionHeader from './utils/CellSelectionHeader'
import { ReactTableContext } from '../ReactTableContext'
// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  OnCellSelect
} from '../../../types'
import CellMenu, { CellMenuProps } from './utils/CellMenu'
import { isEmpty } from 'lodash'

interface ITable {
  pagination: { all: number; currentPage: number }
  onPaginate: (page: number) => void
  loading?: boolean
  loader?: 'skeleton' | 'spinner'
  onCellSelect?: (selectCount: number) => OnCellSelect
  /* JSX element for displaying expanded data for table cell */
  expandCell?: (data: any) => ReactNode
  /* JSX element for displaying menu for table cell */
  cellMenu?: ReactElement<CellMenuProps>
}
const Table: React.FC<ITable> = (props) => {
  const {
    pagination,
    onPaginate,
    loading,
    loader,
    cellMenu,
    expandCell,
    onCellSelect
  } = props
  return (
    <ReactTableContext.Consumer>
      {({
        columns,
        dataSource,
        onSelectAll,
        setColumns,
        defaultColumns,
        maxColumns,
        minColumns,
        columnKeys,
        selectedTableItems
      }) => {
        return (
          <Fragment>
            <CellSelectionHeader onCellSelect={onCellSelect} />
            <div className='ReactTable___table-wrapper'>
              <table className='ReactTable___table'>
                <TableHead
                  columns={columns}
                  columnKeys={columnKeys}
                  onSelectAll={onSelectAll}
                  setColumns={setColumns}
                  selectedTableItems={selectedTableItems}
                  maxColumns={maxColumns}
                  minColumns={minColumns}
                  defaultColumns={defaultColumns}
                  allowCellSelect={!!onCellSelect}
                />
                <TableBody
                  columnKeys={columnKeys}
                  dataSource={dataSource}
                  loading={loading}
                  loader={loader}
                  cellMenu={cellMenu}
                  expandCell={expandCell}
                  allowCellSelect={!!onCellSelect}
                />
              </table>
              {/* <table className={'ReactTable___table-fixed'}> */}
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
                currentPage={pagination?.currentPage || 1}
                handlePagination={onPaginate}
                total={pagination?.all || 0}
                loading={!!loading}
                isAnEmptyContent={isEmpty(dataSource)}
              />
            </div>
          </Fragment>
        )
      }}
    </ReactTableContext.Consumer>
  )
}
export { Table as default, ITable as BodyProps, CellMenu, CellMenuProps }
