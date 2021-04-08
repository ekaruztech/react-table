import React from 'react'

export type PaddingProps = {
  left?: number
  right?: number
  bottom?: number
  top?: number
  style?: React.CSSProperties
  children: React.ReactNode
  vertical?: number
  horizontal?: number
  componentType?: 'span' | 'div' | 'section' | 'main'
} & React.HTMLProps<HTMLSpanElement | HTMLDivElement>
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
    vertical,
    horizontal,
    componentType = 'div',
    ...rest
  } = props
  const styles = {
    paddingLeft: left || horizontal || 0,
    paddingRight: right || horizontal || 0,
    paddingTop: top || vertical || 0,
    paddingBottom: bottom || vertical || 0,
    display:
      componentType === 'span'
        ? vertical || top || bottom
          ? 'block'
          : 'inline'
        : 'block',
    ...style
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

export default Padding
