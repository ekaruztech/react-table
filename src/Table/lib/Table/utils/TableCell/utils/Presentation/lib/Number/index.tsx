import { formatNumber } from '../../../../../../../../../_utils'
import { Tag } from 'antd'
import React from 'react'
import {
  ColumnNumberFormat,
  ColumnTextFormat
} from '../../../../../../../../../typings'
import TextFormat from '../TextFormat'
import { PresetColors } from '../../../../../../../../../_utils/colors'
import { isFunction, isPlainObject } from 'lodash'

type NumberPresentationProps = {
  presentationType: 'tag' | undefined
  presentationColor: string | null
  isDisabled: boolean
  data: string | number
  numberFormat: ColumnNumberFormat | undefined
  textFormat: ColumnTextFormat | undefined
  source: any
}
const NumberPresentation = (props: NumberPresentationProps) => {
  const {
    data,
    isDisabled,
    presentationColor,
    presentationType,
    numberFormat: _NumberFormat,
    textFormat,
    source
  } = props

  const numberFormat = isFunction(_NumberFormat)
    ? _NumberFormat(data, source)
    : _NumberFormat

  const number = formatNumber(
    Number(data),
    Object.assign({}, isPlainObject(numberFormat) ? numberFormat : {})
  )

  if (presentationType === 'tag') {
    return (
      <Tag
        color={presentationColor || 'orange'}
        style={{
          marginRight: 0,
          opacity: isDisabled ? 0.5 : 1
        }}
      >
        <TextFormat textFormat={isPlainObject(textFormat) ? textFormat : {}}>
          {data ? number : '--'}
        </TextFormat>
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
      <TextFormat textFormat={isPlainObject(textFormat) ? textFormat : {}}>
        {data ? number : '--'}
      </TextFormat>
    </div>
  )
}

export default NumberPresentation
