import React from 'react'
import { isNull, isUndefined } from 'lodash'

export interface PositionProps {
  left?: number
  right?: number
  bottom?: number
  top?: number
  style?: React.CSSProperties
  children: React.ReactNode
  className?: string
  /** CSS postion attribute */
  type?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static'
}
/**
 * JSX wrapper for CSS position property
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Position: React.FC<PositionProps> = (props) => {
  const { children, type, top, bottom, left, right, style, className } = props
  return (
    <div
      style={{
        ...style,
        position: type || 'relative',
        top: !isUndefined(top) && !isNull(top) ? top : 'auto',
        bottom: !isUndefined(bottom) && !isNull(bottom) ? bottom : 'auto',
        right: !isUndefined(right) && !isNull(right) ? right : 'auto',
        left: !isUndefined(left) && !isNull(left) ? left : 'auto'
      }}
      className={className || ''}
    >
      {children}
    </div>
  )
}

export default Position
