import React from 'react'
import { motion } from 'framer-motion'
// eslint-disable-next-line no-unused-vars
import { ColumnType } from '../../../../../../../types'

interface IHOC {
  extraColumnsLength: number
  columnKeys: string[]
  columnType: ColumnType | undefined
  key: string
}
const presentationHOC = ({
  extraColumnsLength,
  columnKeys,
  columnType,
  key
}: IHOC) => (Component: React.ReactNode) => (
  <motion.td
    layout
    style={{
      width: `calc(100% / ${columnKeys.length + extraColumnsLength} - 120px)`
    }}
    className='ReactTable___table-row'
    key={key}
  >
    <div
      className='ReactTable___table-row-inner'
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

export default presentationHOC
