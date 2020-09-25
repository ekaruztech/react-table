import React from 'react'
import { motion } from 'framer-motion'
import { useDimension } from '../../../../../hooks'

interface IFixHeader {
  style?: React.CSSProperties
}
const FixHeader: React.FC<IFixHeader> = (props) => {
  const { children, style } = props
  const dimension = useDimension(
    'element',
    'ReactTable___table_wrapper-identifier'
  )

  console.info(dimension)

  return (
    <div
      className={'ReactTable__table-fixed-wrapper'}
      style={{
        position: 'sticky',
        zIndex: 5,
        top: 0,
        width: '100%',
        minWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <motion.table
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 13
        }}
        className='ReactTable___table-fixed'
        style={{ ...(style || {}), width: '100%', minWidth: '100%' }}
      >
        {children}
      </motion.table>
    </div>
  )
}

export default FixHeader
