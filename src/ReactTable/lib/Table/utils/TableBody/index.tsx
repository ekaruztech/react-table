import { isEmpty } from 'lodash'
import TableCell from '../TableCell'
import React from 'react'
import { motion } from 'framer-motion'
import { Skeleton, Empty, Typography } from 'antd'
import Align from '../../../../../Align'
import Padding from '../../../../../Padding'
import { TableBodyContext } from './utils/TableBodyContext'
import { LoadingOutlined } from '@ant-design/icons'
import { CellMenuProps } from '../CellMenu'

interface ITableBody {
  columnKeys: string[]
  dataSource: Array<{}>
  loading?: boolean
  loader?: 'skeleton' | 'spinner'
  cellMenu?: React.ReactElement<CellMenuProps>
  expandCell?: (data: any) => React.ReactNode
  allowCellSelect: boolean
}
const TableBody: React.FC<ITableBody> = (props) => {
  const {
    columnKeys,
    dataSource,
    loader = 'skeleton',
    loading,
    cellMenu,
    expandCell,
    allowCellSelect
  } = props

  return (
    <motion.tbody className='ReactTable___table-body'>
      {loading && (
        <motion.tr
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ width: '100%', padding: 10 }}
        >
          <motion.td colSpan={columnKeys.length + 2}>
            <Padding horizontal={10} top={10} bottom={30}>
              {loader === 'skeleton' && (
                <div style={{ height: 450 }}>
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                </div>
              )}
              {loader === 'spinner' && (
                <Align
                  alignCenter
                  justifyCenter
                  style={{ height: 450 }}
                  children={[
                    <LoadingOutlined
                      key='loading-0'
                      style={{ fontSize: 40, color: 'var(--accent)' }}
                      spin
                    />
                  ]}
                />
              )}
            </Padding>
          </motion.td>
        </motion.tr>
      )}
      {!loading && isEmpty(dataSource) && (
        <motion.td
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ width: '100%', padding: 10 }}
          colSpan={columnKeys.length + 2}
        >
          <Align
            style={{ height: 450 }}
            alignCenter
            justifyCenter
            children={[
              <Empty
                key='empty-0'
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <Padding top={15}>
                    <Typography.Text>No data to display here!.</Typography.Text>
                  </Padding>
                }
              />
            ]}
          />
        </motion.td>
      )}
      <TableBodyContext.Provider
        value={{ cellMenu, allowCellSelect, expandCell }}
      >
        {!loading &&
          !isEmpty(dataSource) &&
          dataSource.map((source: any, index) => {
            return (
              <TableCell
                extraColumnsLength={1}
                source={source}
                key={`table_cell_${source?.key}`}
                index={index}
              />
            )
          })}
      </TableBodyContext.Provider>
    </motion.tbody>
  )
}

export default TableBody
