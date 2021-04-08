import React from 'react'
import { isNull, isUndefined } from 'lodash'

export type PositionProps = {
  left?: number
  right?: number
  bottom?: number
  top?: number
  style?: React.CSSProperties
  children: React.ReactNode
  /** CSS position attribute */
  type?: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static'
  componentType?: 'span' | 'div' | 'section' | 'main'
} & React.HTMLProps<HTMLSpanElement | HTMLDivElement>
/**
 * JSX wrapper for CSS position property
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Position: React.FC<PositionProps> = (props) => {
  const {
    children,
    type,
    top,
    bottom,
    left,
    right,
    style,
    componentType = 'div',
    ...rest
  } = props
  const styles = {
    ...style,
    position: type || 'relative',
    top: !isUndefined(top) && !isNull(top) ? top : 'auto',
    bottom: !isUndefined(bottom) && !isNull(bottom) ? bottom : 'auto',
    right: !isUndefined(right) && !isNull(right) ? right : 'auto',
    left: !isUndefined(left) && !isNull(left) ? left : 'auto'
  }
  switch (componentType) {
    case 'main':
      return (
        <main style={styles} {...rest}>
          {children}
        </main>
      )
    case 'span':
      return (
        <span style={styles} {...rest}>
          {children}
        </span>
      )
    case 'section':
      return (
        <section style={styles} {...rest}>
          {children}
        </section>
      )
    default: {
      const divProps = rest as React.HTMLProps<HTMLDivElement>
      return (
        <div style={styles} {...divProps}>
          {children}
        </div>
      )
    }
  }
}

export default Position
