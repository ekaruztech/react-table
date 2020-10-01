// eslint-disable-next-line no-unused-vars
import React, { Fragment, ReactElement } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import TableHead from './utils/TableHead'
import TableBody from './utils/TableBody'
import TableFooter from './utils/TableFooter'
import CellSelectionHeader from './utils/CellSelectionHeader'
// import FixHeader from './utils/FixHeader'
import { ReactTableContext } from '../ReactTableContext'
// eslint-disable-next-line no-unused-vars
import {
  // eslint-disable-next-line no-unused-vars
  OnCellSelect
} from '../../../types'
import CellMenu, { CellMenuProps } from './utils/CellMenu'
import { isEmpty, last } from 'lodash'
import CellExpanseSetter from './utils/CellExpanseSetter'

// TODO: Find a reasonable way to make a sticky header for table
interface ITable {
  pagination: { all: number; currentPage: number }
  onPaginate: (page: number) => void
  loading?: boolean
  loader?: 'skeleton' | 'spinner'
  onCellSelect?: (selectCount: number) => OnCellSelect
  /* JSX element for displaying expanded data for table cell */
  expandedView?: (source: any) => React.ReactNode
  /* JSX element for displaying menu for table cell */
  cellMenu?: ReactElement<CellMenuProps>
}
class Table extends React.Component<ITable, any> {
  protected static readonly __DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE =
    '$$REACT_TABLE_BODY'

  scrollController = () => {
    const tableScrollComponent = document.querySelector(
      '.ReactTable___scroll-wrapper'
    )

    const scrollLeft = tableScrollComponent?.scrollLeft || 0
    const scrollWidth = tableScrollComponent?.scrollWidth || 0
    const clientWidth = tableScrollComponent?.clientWidth || 0

    const fixedTableHeaderCellsLeft = document.querySelectorAll(
      '.table-header-cell-fixed-left'
    )
    const fixedTableHeaderCellRight = document.querySelector(
      '.table-header-cell-fixed-right'
    )
    const fixedTableBodyCellsLeft = Array.from(
      document.querySelectorAll('.table-body-cell-fixed-left-apply-shadow')
    )

    const fixedTableBodyCellsRight = Array.from(
      document.querySelectorAll('.table-body-cell-fixed-right')
    )

    if (
      tableScrollComponent &&
      !!fixedTableHeaderCellsLeft.length &&
      !!fixedTableBodyCellsLeft.length
    ) {
      const shadowedHeaderCellLeft = last(fixedTableHeaderCellsLeft)
      // const shadowedBodyCell

      if (scrollLeft <= 0 && shadowedHeaderCellLeft) {
        // @ts-ignore
        shadowedHeaderCellLeft.classList.remove('table-cell-fixed-left-shadow')
        for (const cell of fixedTableBodyCellsLeft) {
          cell.classList.remove('table-cell-fixed-left-shadow')
        }
      }
      if (scrollLeft > 0 && shadowedHeaderCellLeft) {
        // @ts-ignore
        shadowedHeaderCellLeft.classList.add('table-cell-fixed-left-shadow')
        for (const cell of fixedTableBodyCellsLeft) {
          cell.classList.add('table-cell-fixed-left-shadow')
        }
      }
    }

    if (
      tableScrollComponent &&
      !!fixedTableBodyCellsRight.length &&
      fixedTableHeaderCellRight
    ) {
      if (scrollLeft + clientWidth >= scrollWidth) {
        for (const cell of fixedTableBodyCellsRight) {
          cell.classList.remove('table-cell-fixed-right-shadow')
        }
        fixedTableHeaderCellRight.classList.remove(
          'table-cell-fixed-right-shadow'
        )
      } else {
        for (const cell of fixedTableBodyCellsRight) {
          cell.classList.add('table-cell-fixed-right-shadow')
        }
        fixedTableHeaderCellRight.classList.add('table-cell-fixed-right-shadow')
      }
    }
  }

  componentDidMount(): void {
    const tableScrollComponent = document.querySelector(
      '.ReactTable___scroll-wrapper'
    )
    if (tableScrollComponent) {
      tableScrollComponent.addEventListener('scroll', this.scrollController)
    }
  }

  componentWillMount(): void {
    const tableScrollComponent = document.querySelector(
      '.ReactTable___scroll-wrapper'
    )
    if (tableScrollComponent) {
      tableScrollComponent.removeEventListener('scroll', this.scrollController)
    }
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
      pagination,
      onPaginate,
      loading,
      loader,
      cellMenu,
      expandedView,
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
              <div
                className='ReactTable___table-wrapper'
                id='ReactTable___table_wrapper-identifier'
              >
                {/* <FixHeader> */}
                {/*  <CellExpanseSetter columns={columns} /> */}
                {/*  <TableHead */}
                {/*    columns={columns} */}
                {/*    columnKeys={columnKeys} */}
                {/*    onSelectAll={onSelectAll} */}
                {/*    setColumns={setColumns} */}
                {/*    selectedTableItems={selectedTableItems} */}
                {/*    maxColumns={maxColumns} */}
                {/*    minColumns={minColumns} */}
                {/*    defaultColumns={defaultColumns} */}
                {/*    allowCellSelect={!!onCellSelect} */}
                {/*  /> */}
                {/*  <tbody /> */}
                {/* </FixHeader> */}
                <div
                  style={{ overflow: 'auto hidden' }}
                  className='ReactTable___scroll-wrapper'
                >
                  <ScrollBar>
                    <table className='ReactTable___table'>
                      <CellExpanseSetter
                        columns={columns}
                        allowCellSelect={!!onCellSelect}
                        allowCellMenu={!!cellMenu}
                      />
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
                        expandedView={expandedView}
                        allowCellSelect={!!onCellSelect}
                        allowCellMenu={!!cellMenu}
                      />
                    </table>
                  </ScrollBar>
                </div>
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
