import { isNull, isUndefined } from 'lodash'
import React from 'react'

type AlignProps = {
  /** React Elements */
  children: React.ReactNode
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
const Align = (props: AlignProps) => {
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

type PaddingProps = {
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
const Padding = (props: PaddingProps) => {
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

type MarginProps = {
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
const Margin = (props: MarginProps) => {
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

type PositionProps = {
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
const Position = (props: PositionProps) => {
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

export { AlignProps, PositionProps, PaddingProps, MarginProps }
export { Align, Padding, Position, Margin }
// @ts-ignore
