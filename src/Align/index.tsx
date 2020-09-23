import React from 'react'

interface AlignProps {
  /** React Elements */
  children: React.ReactNode | React.ReactNode[] | React.ReactElement
  /** Flex Direction property 'column' | 'row' */
  type?: 'column' | 'row'
  alignCenter?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  justifyCenter?: boolean
  justifyBetween?: boolean
  justifyEvenly?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyAround?: boolean
  style?: React.CSSProperties
  className?: string
  id?: string
}
/**
 * JSX wrapper for CSS's alignment style
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Align: React.FC<AlignProps> = (props: AlignProps) => {
  const {
    children,
    type,
    alignCenter,
    alignStart,
    alignEnd,
    justifyCenter,
    justifyBetween,
    justifyEvenly,
    justifyStart,
    justifyEnd,
    justifyAround,
    style,
    className,
    id
  } = props
  return (
    <div
      id={id || ''}
      style={{
        ...style,
        display: 'flex',
        flexFlow: type || 'row',
        ...(alignCenter ? { alignItems: 'center' } : {}),
        ...(alignEnd ? { alignItems: 'flex-end' } : {}),
        ...(alignStart ? { alignItems: 'flex-start' } : {}),
        ...(justifyCenter ? { justifyContent: 'center' } : {}),
        ...(justifyAround ? { justifyContent: 'space-around' } : {}),
        ...(justifyBetween ? { justifyContent: 'space-between' } : {}),
        ...(justifyEnd ? { justifyContent: 'flex-end' } : {}),
        ...(justifyStart ? { justifyContent: 'flex-start' } : {}),
        ...(justifyEvenly ? { justifyContent: 'space-evenly' } : {})
      }}
      className={className || ''}
    >
      {children}
    </div>
  )
}

export { AlignProps }
export default Align
