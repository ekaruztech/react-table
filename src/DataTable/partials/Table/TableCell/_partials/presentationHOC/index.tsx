import React from 'react'
import { motion } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { ColumnType } from '../../../../../types'

export default ({
  extraColumnsLength,
  columnKeys,
  columnType,
  key
}: {
  extraColumnsLength: number
  columnKeys: string[]
  columnType: ColumnType | undefined
  key: string
}) => (Component: React.ReactNode) => (
  <motion.td
    layout
    style={{
      width: `calc(100% / ${columnKeys.length + extraColumnsLength} - 120px)`
    }}
    className='___table-row'
    key={key}
  >
    <div
      className='___table-row-inner'
      style={{
        textAlign:
          columnType === 'number' || columnType === 'currency'
            ? 'right'
            : 'left'
      }}
    >
      {Component}
    </div>
  </motion.td>
)
