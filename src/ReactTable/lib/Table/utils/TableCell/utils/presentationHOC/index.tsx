import React from 'react'
import { motion } from 'framer-motion'

interface IHOC {
  extraColumnsLength: number
  columnKeys: string[]
  key: string
  cellIndex: number
  isDisabled: boolean
}
const presentationHOC = ({
  extraColumnsLength,
  columnKeys,
  key,
  cellIndex,
  isDisabled
}: IHOC) => (Component: React.ReactNode) => (
  <motion.td
    className={`ReactTable___table-body-cell ${
      cellIndex === 0 ? 'table-body-cell-fixed-left table-body-cell-fixed-left-apply-shadow' : ''
    }`}
    key={key}
    style={{ opacity: isDisabled ? 0.5 : 1 }}
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
