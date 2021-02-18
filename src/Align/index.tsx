import React from 'react'

type AlignProps = {
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
  componentType?: 'span' | 'div' | 'section' | 'main'
} & React.HTMLProps<HTMLSpanElement | HTMLDivElement>
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

    componentType = 'div',
    ...rest
  } = props

  const styles = {
    ...style,
    display: 'flex',
    flexDirection: type || 'row',
    ...(alignCenter ? { alignItems: 'center' } : {}),
    ...(alignEnd ? { alignItems: 'flex-end' } : {}),
    ...(alignStart ? { alignItems: 'flex-start' } : {}),
    ...(justifyCenter ? { justifyContent: 'center' } : {}),
    ...(justifyAround ? { justifyContent: 'space-around' } : {}),
    ...(justifyBetween ? { justifyContent: 'space-between' } : {}),
    ...(justifyEnd ? { justifyContent: 'flex-end' } : {}),
    ...(justifyStart ? { justifyContent: 'flex-start' } : {}),
    ...(justifyEvenly ? { justifyContent: 'space-evenly' } : {})
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

export { AlignProps }
export default Align
