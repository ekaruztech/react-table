import React from 'react'

import { Table as ReactTable } from '@voomsway/react-table'
import '@voomsway/react-table/dist/index.css'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { Menu } from 'antd'

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
      return 'volcano'
    default:
      return 'default'
  }
}
const db = {
  dataSource: [
    {
      key: '1',
      name: 'Simeon Akpanudo',
      cost: 3200000000,
      address: '10 Downing Street',
      hobby: 'coding',

      food_type: 'Vegan',
      id: '#9iopp785der0011',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '2',
      name: 'John Smith',
      cost: 62100,
      address: '30 Downing Avenue',
      hobby: 'hunting',

      food_type: 'Meaty',
      id: '#990uiopcfe11',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '3',
      name: 'Elia Jones',
      cost: 22001,
      address: '40 Floor Street',
      hobby: 'baking',
      food_type: 'Vegan',
      id: '#99vvgty88031',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '5',
      name: 'Nathan Philips',
      cost: 30,
      address: '4 14th Avenue',
      hobby: 'Biking',
      food_type: 'Vegan',
      id: '#9x70tyu31',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '6',
      name: 'John McCally',
      cost: 27,
      address: '45 Boston Avenue',
      hobby: 'Gymnastics',
      food_type: 'Vegan',
      id: '#99bg831',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '9',
      name: 'Masi klones',
      cost: 42,
      address: '1 Main Street',
      hobby: 'teaching',
      food_type: 'Vegan',
      id: '#90bgg431',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '8',
      name: 'Joseph Xi Lee',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#999nhh31',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '10',
      name: 'Mikel Leeland',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#99@6770111',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '11',
      name: 'Hanna Klose',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '12',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '13',
      name: 'Hanna Um',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#4599r931',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '14',
      name: 'Josh Butland',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#9s99vbb31',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '15',
      name: 'Gideon Morning',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#9vb993f1',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '16',
      name: 'James Levi',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#99f931',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '17',
      name: 'Priah Singh',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#9d99g31',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '18',
      name: 'Johanna Lee',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#99d931',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '19',
      name: 'Emerald Lalong',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#99h931',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '20',
      name: 'Lulu Oyetola',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan ',
      id: '#99v931',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '21',
      name: 'Matthew Lee',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#9993100',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    },
    {
      key: '22',
      name: 'Gretchen Spears',
      cost: 6,
      address: '40 Houstin Street',
      hobby: 'Running',

      food_type: 'Vegan',
      id: '#9vbb99u31',
      id2: 'World',
      dob: moment([
        Math.floor(Math.random() * 50) + 1955,
        Math.floor(Math.random() * 11),
        Math.floor(Math.random() + 28)
      ]),
      id5: 'World',
      id6: 'Hello',
      id10: 'Finally'
    }
  ],
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      type: 'text',
      autoComplete: true
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
      type: 'date',
      presentationType: 'date',
      presentationColor: 'processing',
      dateFormat: 'lll'
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      type: 'currency',
      currency: 'USD',
      presentationColor: 'gold'
    },
    {
      title: 'Hobby',
      dataIndex: 'hobby',
      key: 'hobby',
      type: 'list',
      presentationType: 'tag',
      presentationColor: (value: string) => evalStatusColor(value),
      multiple: true,
      listMenu: [
        { label: 'Swimming', value: 'swimming' },
        { label: 'Skipping', value: 'skipping' },
        { label: 'Skiing', value: 'skiing' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'Movies', value: 'movies' }
      ]
    }
    // {
    //   title: 'Food type',
    //   dataIndex: 'food_type',
    //   key: 'food_type',
    //   type: 'boolean',
    //
    // },
    // {
    //   title: 'ID-1',
    //   dataIndex: 'id',
    //   key: 'id',
    //   type: 'action',
    //   actionPresentationType: 'default',
    //   actionCallback: (source: any) => console.log('action clicked id', source),
    //   actionTitle: 'Print ID'
    // },
    //
    // {
    //   title: 'ID-2',
    //   dataIndex: 'id',
    //   key: 'id2',
    //   type: 'action',
    //   actionPresentationType: 'primary',
    //   actionCallback: (source: any) =>
    //     console.log('action clicked id2', source),
    //   actionTitle: 'Print ID-2'
    // },
    // {
    //   title: 'ID-5',
    //   dataIndex: 'id',
    //   key: 'id5',
    //   type: 'text',
    //   bold: true
    // },
    // {
    //   title: 'ID-6',
    //   dataIndex: 'id',
    //   key: 'id6',
    //   type: 'text'
    // },
    // {
    //   title: 'ID-10',
    //   dataIndex: 'id',
    //   key: 'id10',
    //   type: 'text'
    // }
  ],
  maxColumns: 8,
  minColumns: 4
}

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingContent, setIsLoadingContent] = useState(true)

  useEffect(() => {
    setIsLoadingContent(true)
    const a = setTimeout(() => {
      setDataSource((prev) => ({
        ...prev,
        data: db.dataSource.slice(0, 15)
      }))
      setIsLoadingContent(false)
    }, 5000)

    return () => clearTimeout(a)
  }, [])

  const [dataSource, setDataSource] = useState<{
    data: Array<any>
    range: { from: number; to: number }
  }>({ data: [], range: { from: 0, to: 15 } })

  const [pageRenderOrder, setPageRenderOrder] = useState(15)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pagination, setPagination] = useState({
    all: db.dataSource.length,
    currentPage: 1
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
          <i className='ri-focus-line'></i>
        </span>
      )
    },
    {
      title: 'Deactivate',
      onClick: (value: any) => console.log(value),
      icon: (
        <span className='anticon'>
          <i className='ri-switch-line'></i>
        </span>
      )
    }
  ]
  // TODO: add a confirmation to the select delete.
  // TODO: add a cancel button to close the cell selection.
  // TODO: put borderBottom in quick filter and in controls instead of borderTop in table-head.
  console.log(pageRenderOrder, onRenderOrderChange, selectMenu)
  return (
    <div style={{ padding: 20, background: '#f7f8fa' }}>
      <ReactTable
        name={'TestTable'}
        columns={db.columns}
        dataSource={dataSource.data}
        maxColumns={db.maxColumns}
        minColumns={db.minColumns}
      >
        <ReactTable.Controls
          renderOrder={pageRenderOrder}
          onRenderOrderChange={onRenderOrderChange}
        />
        <ReactTable.QuickFilter
          onApply={(value: any) => console.log(value)}
          onClear={() => console.log('cleared')}
        />

        <ReactTable.Body
          pagination={pagination}
          onPaginate={onPaginate}
          loader={'skeleton'}
          loading={isLoadingContent}
          onCellSelect={(selectCount: number) => ({
            onDelete: (source: any[]) => console.log(source, selectCount),
            onPin: (source: any[]) => console.log(source, selectCount)
          })}
          expandedView={(source: any) => {
            console.log(source)
            return (
              <div>
                <span>Hello world</span>
              </div>
            )
          }}
          cellMenu={
            <ReactTable.CellMenu
              onDelete={() => null}
              onDuplicate={() => null}
              onEdit={() => null}
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
  )
}

export default App
