// import React from 'react'

import {
  Table as ReactTable,
  Model,
  Align,
  Padding,
  SupportedDateLocales
} from '@voomsway/react-table'
import '@voomsway/react-table/dist/index.css'
import { useState, useEffect } from 'react'
import { Menu, Tooltip, Button } from 'antd'

export const evalStatusColor = (status: string) => {
  switch (status) {
    case 'baking':
      return 'geekblue'
    case 'coding':
      return 'gold'
    case 'biking':
    case 'gymnastics':
      return 'green'
    case 'movies':
    case 'comedy':
      return 'volcano'
    case 'writing':
      return 'blue'
    case 'photography':
      return 'lime'
    case 'arguing':
      return 'red'
    case 'landscaping':
      return 'volcano'
    case 'teaching':
      return 'orange'
    case 'poetry':
      return 'yellow'
    default:
      return 'default'
  }
}
const db = {
  dataSource: Array(40)
    .fill(0)
    .map((_: number, index: number) => {
      return {
        key: index.toString(),
        name: 'Simeon Akpanudo ' + index,
        percentageChange: Math.random() * 100 * 3e3,
        netWorth: Math.random() * 10000 * 3e5,
        address: '10 Downing Street',
        hobby: 'coding',
        food_choice: 'Vegan',
        id2: 'World',
        timeOfLog: new Date().setHours(
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() + 60)
        ),
        dob: new Date(
          Math.floor(Math.random() * 10) + 1950,
          Math.floor(Math.random() * 11),
          Math.floor(Math.random() + 28)
        ),
        id5: 'World',
        id6: 'Hello',
        id10: 'Finally'
      }
    }),
  columns: (menu: { label: string; value: string }[] | Array<{}>) => [
    {
      title: 'Request',
      dataIndex: 'id',
      key: 'id',
      type: 'action',
      actionPresentationType: 'default',
      actionCallback: (source: any) => console.log('action clicked id', source),
      actionTitle: 'Request details',
      noQuickFilter: true
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      type: 'text',
      textFormat: {
        fontWeight: 400,
        fontStyle: 'normal',
        // textAlign: 'right',
        fontStretch: 'expanded',
        // textDecorationLine: 'overline',
        // textDecorationStyle: 'wavy',
        // wordSpacing: 30,
        textOverflow: 'ellipsis',
        textTransform: 'uppercase'
      }
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      type: 'datetime',
      presentationType: 'date',
      presentationColor: 'processing',
      columnSpan: 1,
      dateFormat: () => {
        // console.count(text)
        return {
          locale: SupportedDateLocales.JA
        }
      },
      filterOptions: {
        allowRange: true,
        datePickerType: 'date'
      }
    },
    {
      title: 'Time of Log',
      dataIndex: 'timeOfLog',
      key: 'timeOfLog',
      type: 'time',
      presentationColor: 'volcano',
      columnSpan: 1,
      dateFormat: () => {
        // console.count(text)
        return {
          locale: SupportedDateLocales.JA
        }
      },
      filterOptions: {
        allowRange: true,
        timePickerOptions: {
          use12Hours: true,
          format: 'HH:mm:ss',
          hourStep: 2
        }
      }
    },
    {
      title: 'Net worth',
      dataIndex: 'netWorth',
      key: 'netWorth',
      type: 'currency',
      // presentationColor: 'purple',
      columnSpan: 1,
      currencyFormat: {
        locale: 'ja',
        notation: 'compact',
        currency: 'usd',
        maximumSignificantDigits: 4
        // style: 'currency'
      },
      textFormat: {
        textAlign: 'right'
        // fontWeight: 500
      },
      filterOptions: {}
    },
    {
      title: 'Percentage change',
      dataIndex: 'percentageChange',
      key: 'percentageChange',
      type: 'number',
      // presentationColor: 'volcano',
      columnSpan: 1.3,
      numberFormat: () => ({
        locale: 'ar',
        notation: 'compact',
        maximumSignificantDigits: 4,
        style: 'percent'
        // currency: 'usd',
        // style: 'currency'
      }),
      textFormat: {
        textAlign: 'right'
        // fontWeight: 500
      },
      filterOptions: {
        allowRange: true,
        sliderOptions: {
          marks: {
            '-100': '-100%',
            '-50': '-50%',
            0: '0%',
            50: '50%',
            100: '100%'
          },
          tipFormatter: (value: any) => `${value}%`,
          autoFocus: true
        },
        min: -100,
        max: 100,
        step: 0.5
      }
    },
    {
      title: 'Hobby',
      dataIndex: 'hobby',
      key: 'hobby',
      type: 'list',
      presentationType: 'tag',
      presentationColor: (value: string) => evalStatusColor(value),
      multiple: true,
      listMenu: menu
    },
    {
      title: 'Food choice',
      dataIndex: 'food_choice',
      key: 'food_choice',
      type: 'boolean'
    },

    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
      type: 'text',
      quickFilterOnly: true
    },
    {
      title: 'Leverage',
      dataIndex: 'leverage',
      key: 'leverage',
      type: 'text',
      quickFilterOnly: true
    },
    {
      title: 'Bond',
      dataIndex: 'bond',
      key: 'bond',
      type: 'text',
      quickFilterOnly: true
    }
  ],
  maxColumns: 10,
  minColumns: 4
}

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingContent, setIsLoadingContent] = useState(true)
  const [menu, setMenu] = useState<
    { label: string; value: string }[] | Array<{}>
  >([])
  // const [show, setShow] = useState(true)
  const model = Model.instantiate('TestTable')

  useEffect(() => {
    setIsLoadingContent(true)
    const a = setTimeout(() => {
      setDataSource((prev) => ({
        ...prev,
        data: db.dataSource.slice(0, model?.renderOrder)
      }))
      setIsLoadingContent(false)
    }, 2000)

    const b = setTimeout(() => {
      setMenu([
        { label: 'Swimming', value: 'swimming' },
        { label: 'Skipping', value: 'skipping' },
        { label: 'Skiing', value: 'skiing' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'Movies', value: 'movies' }
      ])
    }, 2000)

    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [])

  const [dataSource, setDataSource] = useState<{
    data: Array<any>
    range: { from: number; to: number }
  }>({ data: [], range: { from: 0, to: 15 } })

  const [pageRenderOrder, setPageRenderOrder] = useState(
    model?.renderOrder || 15
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pagination, setPagination] = useState({
    all: db.dataSource.length,
    currentPage: model?.pagination?.page || 1
  })
  // console.log(() setPagination, pagination)

  const onPaginate = (page: number) => {
    setDataSource(() => {
      const to = pageRenderOrder * page
      const from = to - pageRenderOrder
      const range = { from, to }
      const data = db.dataSource.slice(from, to)
      return { range, data }
    })
    setPagination((prev) => ({ ...prev, currentPage: page }))
  }

  const onRenderOrderChange = (renderOrder: number) => {
    setDataSource(() => {
      const to = renderOrder * pagination.currentPage
      const from = to - renderOrder
      const range = { from, to }
      const data = db.dataSource.slice(from, to)
      return { range, data }
    })
    setPageRenderOrder(renderOrder)
  }
  const selectMenu = [
    {
      title: 'Summary',
      onClick: (value: any) => console.log(value),
      icon: (
        <span className='anticon'>
          <i className='ri-focus-line' />
        </span>
      )
    },
    {
      title: 'Deactivate',
      onClick: (value: any) => console.log(value),
      icon: (
        <span className='anticon'>
          <i className='ri-switch-line' />
        </span>
      )
    }
  ]
  const onApply = (
    value: {
      property: string
      value: string[] | number | number[] | string
    }[]
  ): void => {
    console.log(
      '%c ' + model?.hasAppliedQuickFilter,
      'font-size: 25px; color: orange;',
      value
    )
  }
  // TODO: add a cancel button to close the cell selection.
  // TODO: put borderBottom in quick filter and in controls instead of borderTop in table-head.
  console.log({
    pageRenderOrder,
    onRenderOrderChange,
    selectMenu,
    dataSource,
    onApply
  })
  return (
    <Align
      style={{
        padding: 20,
        background: '#f7f8fa',
        overflow: 'hidden',
        width: '100%'
      }}
      type={'column'}
    >
      <Padding vertical={20} style={{ width: '100%' }}>
        <Align style={{ width: '100%' }} alignCenter justifyAround>
          <Button
            onClick={() => {
              model?.updateField('pagination', { page: 2 }, { override: true })
            }}
          >
            Update Pagination
          </Button>
          <Button
            onClick={() => {
              model?.resetField?.('quickFilter')
            }}
          >
            Reset quick filter
          </Button>
          <Button
            onClick={() => {
              model?.resetFields?.()
            }}
          >
            Reset all
          </Button>
          <Button
            onClick={() => {
              model?.resetFields?.(['pagination', 'quickFilter'])
            }}
          >
            Reset pagination and quickFilter
          </Button>
        </Align>
      </Padding>
      <div style={{ width: `100%` }}>
        <ReactTable
          name={'TestTable'}
          columns={db.columns(menu)}
          dataSource={dataSource.data}
          maxColumns={db.maxColumns}
          minColumns={db.minColumns}
          onRefresh={() => console.log('refreshing')}
        >
          <ReactTable.Controls
            onRenderOrderChange={onRenderOrderChange}
            enableExport
            onExport={(key) => console.log(key)}
            onSortApply={(sort: any) => console.log(sort)}
            onSortClear={() => console.log('sort cleared')}
            onFilterApply={(filter: any) => console.log(filter)}
            onFilterClear={() => console.log('sort cleared')}
            enableDataManagement={true}
          />
          <ReactTable.QuickFilter
            onApply={onApply}
            onClear={() => console.log('cleared')}
            onFieldsRemove={(o, l) => {
              console.log(o)
              console.table(l)
            }}
            onFieldsChange={(d) => {
              console.log(d)
            }}
          />

          <ReactTable.Body
            pagination={pagination}
            onPaginate={onPaginate}
            loader={'skeleton'}
            loading={isLoadingContent}
            disableCell={(source: any) => source.hobby === 'Teaching'}
            expandedView={(source: any) => {
              return (
                <div>
                  <span>Hello {source?.name}</span>
                </div>
              )
            }}
            expandedViewWidth={'80%'}
            expandedViewPlacement={'left'}
            expandedViewTitle={'My View'}
            onExpandedViewClose={() =>
              console.log('%cClosed', 'font-size: 25px; color: crimson')
            }
            onExpandedViewOpen={() =>
              console.log('%cOpened', 'font-size: 25px; color: teal')
            }
            expandedViewFooter={[
              <Button key={'Hello-world'}>Hello World</Button>
            ]}
            hoverActions={{
              onExpandedView: (source: any) => alert(source?.name ?? 'No name'),
              onEdit: () => console.log('Hover Actions On Edit'),
              onDelete: () =>
                console.log(
                  '%cHover Actions On Delete',
                  'font-size: 20px; color: goldenrod'
                )
            }}
            enableHoverActions={[true, true, true]}
            cellSelectionMenu={Array(4).fill(
              // <Padding horizontal={10} style={{ height: '100%' }}>
              //   <div
              //     style={{
              //       height: '100%',
              //       borderLeft: '1px solid var(--border-color-split)'
              //     }}
              //   />
              // </Padding>
              <Tooltip title='Pin selected'>
                <Button
                  type='text'
                  onClick={() => null}
                  icon={
                    <span className='anticon'>
                      <i className='ri-pushpin-line' />
                    </span>
                  }
                >
                  Pin
                </Button>
              </Tooltip>
            )}
            cellMenu={
              <ReactTable.CellMenu
                onDelete={() => null}
                onDuplicate={() => null}
                onEdit={() => null}
                onExpandedView={(source: any) =>
                  alert(source?.name ?? 'No name')
                }
                enabledMenu={[true, false, true, true]}
              >
                {({ source }: { source: any }) => {
                  return (
                    <Menu
                      style={{
                        border: 0,
                        background: 'var(--background-primary)'
                      }}
                    >
                      <Menu.Divider />
                      {selectMenu.map(
                        ({ onClick, icon, title }, index: number) => (
                          <Menu.Item
                            onClick={() => onClick(source)}
                            icon={icon}
                            key={title + index}
                          >
                            {title}
                          </Menu.Item>
                        )
                      )}
                    </Menu>
                  )
                }}
              </ReactTable.CellMenu>
            }
          />
        </ReactTable>
      </div>
    </Align>
  )
}

export default App
