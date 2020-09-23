import React from 'react'

export interface PaddingProps {
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
 * JSX wrapper for CSS's Padding styles
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Padding: React.FC<PaddingProps> = (props) => {
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
        paddingLeft: left || horizontal || 0,
        paddingRight: right || horizontal || 0,
        paddingTop: top || vertical || 0,
        paddingBottom: bottom || vertical || 0,
        ...style
      }}
      className={className || ''}
    >
      {children}
    </div>
  )
}

export default Padding
