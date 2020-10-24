import React from 'react'

export type MarginProps = {
  left?: number
  right?: number
  bottom?: number
  top?: number
  style?: React.CSSProperties
  children: React.ReactNode
  className?: string
  vertical?: number
  horizontal?: number
  componentType?: 'span' | 'div' | 'section' | 'main'
} & React.HTMLProps<HTMLSpanElement | HTMLDivElement>
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
    className: _className,
    vertical,
    horizontal,
    componentType = 'div',
    ...rest
  } = props
  const styles = {
    marginLeft: left || horizontal || 0,
    marginRight: right || horizontal || 0,
    marginTop: top || vertical || 0,
    marginBottom: bottom || vertical || 0,
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

export default Margin
