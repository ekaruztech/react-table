import { formatNumber } from '../../../../../../../../../_utils'
import { Tag } from 'antd'
import React from 'react'
import {
  ColumnNumberFormat,
  ColumnTextFormat
} from '../../../../../../../../../typings'
import TextFormat from '../TextFormat'
import { PresetColors } from '../../../../../../../../../_utils/colors'

type NumberPresentationProps = {
  presentationType: 'tag' | undefined
  presentationColor: string | null
  isDisabled: boolean
  data: string | number
  numberFormat: ColumnNumberFormat | undefined
  textFormat: ColumnTextFormat | undefined
}
const NumberPresentation = (props: NumberPresentationProps) => {
  const {
    data,
    isDisabled,
    presentationColor,
    presentationType,
    numberFormat,
    textFormat
  } = props
  const number = formatNumber(Number(data), Object.assign({}, numberFormat))
  if (presentationType === 'tag') {
    return (
      <Tag
        color={presentationColor || 'orange'}
        style={{
          marginRight: 0,
          opacity: isDisabled ? 0.5 : 1
        }}
      >
        <TextFormat textFormat={textFormat}>{data ? number : '--'}</TextFormat>
      </Tag>
    )
  }
  return (
    <div
      style={{
        color: PresetColors[presentationColor || 'default'],
        opacity: isDisabled ? 0.5 : 1,
        overflow: 'hidden'
      }}
    >
      <TextFormat textFormat={textFormat}>{data ? number : '--'}</TextFormat>
    </div>
  )
}

export default NumberPresentation
