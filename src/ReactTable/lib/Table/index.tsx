// eslint-disable-next-line no-unused-vars
import React, { Fragment, ReactNode, ReactElement } from 'react'
import TableHead from './utils/TableHead'
import TableBody from './utils/TableBody'
import TableFooter from './utils/TableFooter'
import CellSelectionHeader from './utils/CellSelectionHeader'
import FixHeader from './utils/FixHeader'
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
class Table extends React.Component<ITable, any> {
  protected static readonly __DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE =
    '$$REACT_TABLE_BODY'

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
      pagination,
      onPaginate,
      loading,
      loader,
      cellMenu,
      expandCell,
      onCellSelect
    } = this.props
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
                <table
                  className='ReactTable___table'
                  id='ReactTable___table_identifier'
                >
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
                <FixHeader>
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
                  <tbody />
                </FixHeader>
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
}
export { Table as default, ITable as BodyProps, CellMenu, CellMenuProps }
