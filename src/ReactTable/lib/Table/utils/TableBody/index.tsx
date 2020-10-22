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
import './styles.scss'
import { useDimension } from '../../../../../hooks'

interface ITableBody {
  columnKeys: string[]
  dataSource: Array<{}>
  loading?: boolean
  loader?: 'skeleton' | 'spinner'
  cellMenu?: React.ReactElement<CellMenuProps>
  expandedView?: (source: any) => React.ReactNode
  allowCellSelect: boolean
  allowCellMenu: boolean
  /* Functions to be called on hover actions */
  hoverActions?: {
    onEdit: (source: any) => void
  }
  enableHoverActions?: [boolean, boolean] | [boolean] | boolean
}
const TableBody: React.FC<ITableBody> = (props) => {
  const {
    columnKeys,
    dataSource,
    loader = 'skeleton',
    loading,
    cellMenu,
    expandedView,
    allowCellSelect,
    allowCellMenu,
    hoverActions,
    enableHoverActions = [true]
  } = props

  const dimensions = useDimension('element', 'ReactTable___table-container')

  return (
    <motion.tbody className='ReactTable___table-body'>
      {loading && (
        <motion.tr
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ width: '100%', padding: 10 }}
        >
          <motion.td
            className={'ReactTable___table-body-td'}
            style={{
              maxWidth: dimensions.width,
              width: dimensions.width,
              minWidth: dimensions.width
            }}
          >
            {loader === 'skeleton' && (
              <div className={'ReactTable___table-body-loader'}>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
            )}
            {loader === 'spinner' && (
              <Align
                alignCenter
                justifyCenter
                className={'ReactTable___table-body-loader'}
                children={[
                  <LoadingOutlined
                    key='loading-0'
                    style={{ fontSize: 40, color: 'var(--accent)' }}
                    spin
                  />
                ]}
              />
            )}
          </motion.td>
        </motion.tr>
      )}
      {!loading && isEmpty(dataSource) && (
        <motion.td
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          colSpan={columnKeys.length + 2}
          className={'ReactTable___table-body-td'}
          style={{
            maxWidth: dimensions.width,
            width: dimensions.width,
            minWidth: dimensions.width
          }}
        >
          <Align
            className={'ReactTable___table-body-empty'}
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
        value={{
          cellMenu,
          allowCellSelect,
          expandedView,
          allowCellMenu,
          hoverActions,
          enableHoverActions
        }}
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
