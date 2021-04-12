// eslint-disable-next-line no-unused-vars
import React, { Fragment, ReactElement } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import TableHead from './utils/TableHead'
import TableBody from './utils/TableBody'
import TableFooter from './utils/TableFooter'
import CellSelectionHeader from './utils/CellSelectionHeader'
// import FixHeader from './utils/FixHeader'
import { ReactTableContext } from '../../../_utils/context'
import CellMenu, { CellMenuProps } from './utils/CellMenu'
import { isEmpty, last } from 'lodash'
import CellExpanseSetter from './utils/CellExpanseSetter'

// TODO: Find a reasonable way to make a sticky header for table
interface TableProps {
  pagination: { all: number; currentPage: number }
  onPaginate: (page: number) => void
  loading?: boolean
  loader?: 'skeleton' | 'spinner'
  cellSelectionSpacing?: number[] | number
  cellSelectionMenu?: React.ReactNode[]
  /* JSX element for displaying expanded data for table cell */
  expandedView?: (source: any) => React.ReactNode
  /* Width of JSX element for displaying expanded data for table cell */
  expandedViewWidth?: string | number
  expandedViewTitle?: string
  expandedViewPlacement?: 'top' | 'right' | 'bottom' | 'left'
  expandedViewFooter?: null | React.ReactNode[]
  onExpandedViewClose?: () => void
  onExpandedViewOpen?: () => void
  /* JSX element for displaying menu for table cell */
  cellMenu?: ReactElement<CellMenuProps>
  /* Functions to be called on hover actions */
  hoverActions?: {
    onExpandedView?: (source: any) => void
    onEdit?: (source: any) => void
    onDelete?: (key: string) => void
  }
  enableHoverActions?:
    | [boolean, boolean, boolean]
    | [boolean, boolean]
    | [boolean]
    | boolean
    | ((
        source: Array<{}>
      ) =>
        | [boolean, boolean, boolean]
        | [boolean, boolean]
        | [boolean]
        | boolean)
  disableCell?: (source: any) => boolean
}
class Table extends React.Component<TableProps, any> {
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

  resizeFunction = (): void => {
    this.scrollController(this.scrollComponentRef)
  }

  componentDidMount(): void {
    if (this.scrollComponentRef) {
      this.scrollComponentRef.addEventListener('scroll', () => {
        this.scrollController(this.scrollComponentRef)
      })
      window.addEventListener('resize', this.resizeFunction)
    }
  }

  componentDidUpdate(): void {
    if (this.scrollComponentRef) {
      this.scrollComponentRef.addEventListener('scroll', () => {
        this.scrollController(this.scrollComponentRef)
      })
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.resizeFunction)
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
      cellSelectionSpacing,
      hoverActions,
      enableHoverActions,
      disableCell,
      cellSelectionMenu,
      expandedViewWidth,
      expandedViewPlacement,
      expandedViewTitle,
      expandedViewFooter,
      onExpandedViewClose,
      onExpandedViewOpen
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
          selectedTableItems,
          model,
          onRefresh
        }) => {
          return (
            <Fragment>
              <CellSelectionHeader
                cellSelectionSpacing={cellSelectionSpacing}
                cellSelectionMenu={cellSelectionMenu}
              />
              <div
                className='ReactTable___table-wrapper'
                id='ReactTable___table_wrapper-identifier'
                style={{
                  overflow: isEmpty(dataSource) || loading ? 'hidden' : 'unset'
                }}
              >
                <ScrollBar
                  component='section'
                  className={`ReactTable___scroll-wrapper ${
                    isEmpty(dataSource) || loading
                      ? 'ReactTable___scroll-wrapper-unset'
                      : ''
                  }`}
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
                      allowCellSelect={!isEmpty(cellSelectionMenu)}
                      allowCellMenu={!!cellMenu}
                      enableHoverActions={enableHoverActions}
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
                      allowCellSelect={!isEmpty(cellSelectionMenu)}
                      loading={!!loading}
                      onRefresh={onRefresh}
                    />
                    <TableBody
                      columnKeys={columnKeys}
                      dataSource={dataSource}
                      loading={loading}
                      loader={loader}
                      cellMenu={cellMenu}
                      expandedView={expandedView}
                      expandedViewWidth={expandedViewWidth}
                      expandedViewPlacement={expandedViewPlacement}
                      expandedViewFooter={expandedViewFooter}
                      expandedViewTitle={expandedViewTitle}
                      onExpandedViewClose={onExpandedViewClose}
                      onExpandedViewOpen={onExpandedViewOpen}
                      allowCellSelect={!isEmpty(cellSelectionMenu)}
                      allowCellMenu={!!cellMenu}
                      hoverActions={hoverActions}
                      enableHoverActions={enableHoverActions}
                      scrollComponentRef={this.scrollComponentRef}
                      disableCell={disableCell}
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
                model={model}
              />
            </Fragment>
          )
        }}
      </ReactTableContext.Consumer>
    )
  }
}
export { Table as default, TableProps as BodyProps, CellMenu, CellMenuProps }
