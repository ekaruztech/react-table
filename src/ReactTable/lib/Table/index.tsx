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
  /* Functions to be called on hover actions */
  hoverActions?: {
    onEdit: (source: any) => void
  }
}
class Table extends React.Component<ITable, any> {
  protected static readonly __DO_NOT_MODIFY_REACT_TABLE_COMPONENT_TYPE: string =
    '$$REACT_TABLE_BODY'

  private scrollComponentRef: HTMLElement

  protected readonly scrollController = (
    scrollComponent: HTMLElement
  ): void => {
    /* Current scroll position */
    const scrollLeft: number = scrollComponent?.scrollLeft || 0
    /* Component total width including hidden elements visible only through scrolling */
    const scrollWidth: number = scrollComponent?.scrollWidth || 0
    /* Total visible width of scroll component, does not include width of hidden elements */
    const clientWidth: number = scrollComponent?.clientWidth || 0

    // used when collapsing shadow to prevent glitches expecially on MAC OS
    const scrollOffset: number = 5

    const fixedTableHeaderCellsLeft: NodeList = document.querySelectorAll(
      '.table-header-cell-fixed-left'
    )
    const fixedTableHeaderCellRight: HTMLElement | null = document.querySelector(
      '.table-header-cell-fixed-right'
    )
    const fixedTableBodyCellsLeft: HTMLElement[] = Array.from(
      document.querySelectorAll('.table-body-cell-fixed-left-apply-shadow')
    )

    const fixedTableBodyCellsRight: HTMLElement[] = Array.from(
      document.querySelectorAll('.table-body-cell-fixed-right')
    )

    if (
      scrollComponent &&
      !!fixedTableHeaderCellsLeft.length &&
      !!fixedTableBodyCellsLeft.length
    ) {
      // You want to select the last td element from the left, if there's a checkbox.
      const shadowedHeaderCellLeft: Node | undefined = last(
        fixedTableHeaderCellsLeft
      )
      // const shadowedBodyCell

      // If the less-than or equal to the scrollLeft of the scroll-component remove shadow.
      if (scrollLeft <= scrollOffset && shadowedHeaderCellLeft) {
        // @ts-ignore
        shadowedHeaderCellLeft.classList.remove('table-cell-fixed-left-shadow')
        for (const cell of fixedTableBodyCellsLeft) {
          cell.classList.remove('table-cell-fixed-left-shadow')
        }
      }

      // If the greater-than the scrollLeft of the scroll-component remove shadow.
      if (scrollLeft > 0 && shadowedHeaderCellLeft) {
        // @ts-ignore
        shadowedHeaderCellLeft.classList.add('table-cell-fixed-left-shadow')
        for (const cell of fixedTableBodyCellsLeft) {
          cell.classList.add('table-cell-fixed-left-shadow')
        }
      }
    }

    if (
      scrollComponent &&
      !!fixedTableBodyCellsRight.length &&
      fixedTableHeaderCellRight
    ) {
      // Removes shadow from the action cell(right)
      // if the current scroll position + the clientWidth is equal or greater-than the scroll component scrollOffset
      if (scrollLeft + clientWidth >= scrollWidth - scrollOffset) {
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
    if (this.scrollComponentRef) {
      this.scrollComponentRef.addEventListener('scroll', () => {
        this.scrollController(this.scrollComponentRef)
      })
    }
  }

  componentDidUpdate(): void {
    if (this.scrollComponentRef) {
      this.scrollComponentRef.addEventListener('scroll', () => {
        this.scrollController(this.scrollComponentRef)
      })
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
      onCellSelect,
      hoverActions
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

                <ScrollBar
                  component='section'
                  style={{ overflow: 'auto hidden' }}
                  className='ReactTable___scroll-wrapper'
                  containerRef={(ref: HTMLElement) => {
                    this.scrollComponentRef = ref
                  }}
                  onXReachEnd={(container) => {
                    this.scrollController(container)
                  }}
                  onXReachStart={(container) => {
                    this.scrollController(container)
                  }}
                >
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
                      hoverActions={hoverActions}
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
            </Fragment>
          )
        }}
      </ReactTableContext.Consumer>
    )
  }
}
export { Table as default, ITable as BodyProps, CellMenu, CellMenuProps }
