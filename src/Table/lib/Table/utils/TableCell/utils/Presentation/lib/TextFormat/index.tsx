import React from 'react'
import { ColumnTextFormat } from '../../../../../../../../../typings'

type TextFormatProps = {
  textFormat: ColumnTextFormat | undefined
  children: React.ReactNode[] | React.ReactNode
}

const TextFormat = (props: TextFormatProps) => {
  const { children, textFormat } = props

  const {
    wordSpacing,
    wordWrap,
    fontStretch,
    fontStyle,
    fontWeight,
    textAlign,
    textDecorationLine,
    textDecorationStyle,
    textTransform,
    textOverflow = 'ellipsis',
    direction
  } = textFormat ?? {}

  return (
    <span
      style={{
        textTransform,
        textDecorationStyle,
        textDecorationLine,
        textAlign,
        wordWrap,
        wordSpacing,
        fontStyle,
        fontWeight,
        fontStretch,
        direction,
        display: 'block',
        overflow: textOverflow === 'ellipsis' ? 'hidden' : 'unset',
        whiteSpace: textOverflow === 'ellipsis' ? 'nowrap' : 'unset',
        textOverflow
      }}
    >
      {children}
    </span>
  )
}

export default TextFormat
