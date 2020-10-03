import React from 'react'

export interface MarginProps {
  left?: number
  right?: number
  bottom?: number
  top?: number
  style?: React.CSSProperties
  children: React.ReactNode
  className?: string
  vertical?: number
  horizontal?: number
}
/**
 * JSX wrapper for CSS's Margin
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Margin: React.FC<MarginProps> = (props) => {
  const {
    left,
    right,
    top,
    bottom,
    children,
    style = {},
    className,
    vertical,
    horizontal
  } = props
  return (
    <div
      style={{
        marginLeft: left || horizontal || 0,
        marginRight: right || horizontal || 0,
        marginTop: top || vertical || 0,
        marginBottom: bottom || vertical || 0,
        ...style
      }}
      className={className || ''}
    >
      {children}
    </div>
  )
}

export default Margin
