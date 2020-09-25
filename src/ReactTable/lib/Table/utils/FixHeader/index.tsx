import React, { useEffect } from 'react'
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
  useEffect(() => {
    const tableWrapper = document.querySelector('.ReactTable___table-wrapper')
    const fixedTable = document.querySelector(
      '.ReactTable__table-fixed-wrapper'
    )

    if (fixedTable && tableWrapper) {
      const spaceFromTop = tableWrapper?.getBoundingClientRect?.()?.top
      console.log(spaceFromTop, fixedTable)
      // @ts-ignore
      // fixedTable.style.top = `${spaceFromTop}px`
    }
    // if ((spaceFromTop || 0) <= -1 && fixedTable) {
    //   // @ts-ignore
    //   fixedTable.style.display = 'table'
    //   // @ts-ignore
    //   fixedTable.style.top = '0'
    //   // @ts-ignore
    //   fixedTable.style.position = 'fixed'
    // } else {
    //   if (fixedTable) {
    //     // @ts-ignore
    //     fixedTable.style.display = 'none'
    //   }
    // }
  }, [])

  return (
    <div
      className={'ReactTable__table-fixed-wrapper'}
      style={{
        position: 'sticky',
        zIndex: 5,
        top: 0,
        width: dimension.width
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
        style={{ ...(style || {}), width: dimension.width }}
      >
        {children}
      </motion.table>
    </div>
  )
}

export default FixHeader
