import React from 'react'
import { motion } from 'framer-motion'

interface IHOC {
  extraColumnsLength: number
  columnKeys: string[]
  key: string
}
const presentationHOC = ({
  extraColumnsLength,
  columnKeys,
  key
}: IHOC) => (Component: React.ReactNode) => (
  <motion.td
    className='ReactTable___table-row'
    key={key}
  >
    <div
      key={columnKeys.length + extraColumnsLength + Math.random()}
      className='ReactTable___table-row-inner'
    >
      {Component}
    </div>
  </motion.td>
)

export default presentationHOC
