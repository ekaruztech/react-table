import {
  formatNumber,
  FormatNumberOptionStyle
} from '../../../../../../../../../_utils'
import { PresetColors } from '../../../../../../../../../_utils/colors'
import { Tag } from 'antd'
import React from 'react'
import {
  ColumnCurrencyFormat,
  ColumnTextFormat
} from '../../../../../../../../../typings'
import TextFormat from '../TextFormat'
import { isFunction, isNumber, isPlainObject, isString } from 'lodash'

type CurrencyPresentationProps = {
  source: any
  presentationType: 'tag' | undefined
  presentationColor: string | null
  isDisabled: boolean
  data: string | number
  currencyFormat: ColumnCurrencyFormat | undefined
  textFormat: ColumnTextFormat | undefined
}
const CurrencyPresentation = (props: CurrencyPresentationProps) => {
  const {
    data,
    presentationColor,
    presentationType,
    currencyFormat: _CurrencyFormat,
    textFormat,
    isDisabled,
    source
  } = props

  const currencyFormat = isFunction(_CurrencyFormat)
    ? _CurrencyFormat(data, source)
    : _CurrencyFormat

  const currency = formatNumber(
    Number(data ?? 0),
    Object.assign({}, isPlainObject(currencyFormat) ? currencyFormat : {}, {
      style: 'currency' as FormatNumberOptionStyle
    })
  )

  if (presentationType === 'tag') {
    return (
      <Tag
        color={presentationColor || 'default'}
        style={{
          marginRight: 0,
          opacity: isDisabled ? 0.5 : 1
        }}
      >
        <TextFormat textFormat={isPlainObject(textFormat) ? textFormat : {}}>
          {isString(data) || isNumber(data) ? currency : '--'}
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
        {isString(data) || isNumber(data) ? currency : '--'}
      </TextFormat>
    </div>
  )
}

export default CurrencyPresentation
