import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDimension } from '../../../../../hooks'

interface IFixHeader {
  style?: React.CSSProperties
}
const FixHeader: React.FC<IFixHeader> = (props) => {
  const { children, style } = props
  const dimension = useDimension('element', 'ReactTable___table_identifier')
  useEffect(() => {
    const scrollEffect = () => {
      const tableWrapper = document.querySelector('.ReactTable___table-wrapper')
      const fixedTable = document.querySelector('.ReactTable___table-fixed')

      const spaceFromTop = tableWrapper?.getBoundingClientRect?.()?.top
      if ((spaceFromTop || 0) <= -1 && fixedTable) {
        // @ts-ignore
        fixedTable.style.display = 'table'
        // @ts-ignore
        fixedTable.style.top = '0'
        // @ts-ignore
        fixedTable.style.position = 'fixed'
      } else {
        if (fixedTable) {
          // @ts-ignore
          fixedTable.style.display = 'none'
        }
      }
    }
    window.addEventListener('scroll', scrollEffect)

    return () => window.removeEventListener('scroll', scrollEffect)
  })

  return (
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
      style={{ ...(style || {}), width: dimension.width }}
    >
      {children}
    </motion.table>
  )
}

export default FixHeader
