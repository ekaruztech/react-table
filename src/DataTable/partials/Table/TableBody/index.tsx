import { find, isEmpty } from 'lodash'
import TableCell from '../TableCell'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { TableColumnProps } from '../../../types'
import { motion } from 'framer-motion'
import { Skeleton, Empty } from 'antd'
import { Align } from '../../../../TableUtility'
import { LoadingOutlined } from '@ant-design/icons'

type TableBodyProps = {
  columns: TableColumnProps
  columnKeys: string[]
  dataSource: Array<{}>
  checkState: any
  onCheckedChange: Function
  isLoadingContent: boolean
  useSkeletonLoader: boolean
}
export default (props: TableBodyProps) => {
  const {
    columns,
    columnKeys,
    dataSource,
    checkState,
    onCheckedChange,
    isLoadingContent,
    useSkeletonLoader
  } = props

  return (
    <motion.tbody className='___table-body'>
      {isLoadingContent && (
        <motion.tr
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ width: '100%', padding: 10 }}
        >
          <motion.td colSpan={columnKeys.length + 1} style={{ padding: 10 }}>
            {useSkeletonLoader ? (
              <div style={{ height: 450 }}>
                {' '}
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
            ) : (
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
          </motion.td>
        </motion.tr>
      )}
      {!isLoadingContent && isEmpty(dataSource) && (
        <motion.td
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          style={{ width: '100%', padding: 10 }}
          colSpan={columnKeys.length + 1}
        >
          <Align
            style={{ height: 450 }}
            alignCenter
            justifyCenter
            children={[
              <Empty key='empty-0' image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ]}
          />
        </motion.td>
      )}
      {!isLoadingContent &&
        !isEmpty(dataSource) &&
        dataSource.map((source: any, index) => {
          const checked =
            find(checkState?.checkedList, ['key', source?.key]) !== undefined
          return (
            <TableCell
              columns={columns.selected}
              checked={checked}
              onCheckedChange={onCheckedChange}
              checkState={checkState}
              columnKeys={columnKeys}
              extraColumnsLength={1}
              source={source}
              key={`table_cell_${source?.key}`}
              index={index}
            />
          )
        })}
    </motion.tbody>
  )
}
