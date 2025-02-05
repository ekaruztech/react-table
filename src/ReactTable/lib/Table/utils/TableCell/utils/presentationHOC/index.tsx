import React from 'react'
import { motion } from 'framer-motion'

interface IHOC {
  extraColumnsLength: number
  columnKeys: string[]
  key: string
  cellIndex: number
}
const presentationHOC = ({
  extraColumnsLength,
  columnKeys,
  key,
  cellIndex
}: IHOC) => (Component: React.ReactNode) => (
  <motion.td
    className={`ReactTable___table-body-cell ${
      cellIndex === 0 ? 'table-body-cell-fixed-left table-body-cell-fixed-left-apply-shadow' : ''
    }`}
    key={key}
  >
    <div
      key={columnKeys.length + extraColumnsLength + Math.random()}
      className='ReactTable___table-body-cell-inner'
    >
      {Component}
    </div>
  </motion.td>
)

export default presentationHOC
