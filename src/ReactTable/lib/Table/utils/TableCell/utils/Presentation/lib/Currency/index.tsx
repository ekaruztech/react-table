import { formatNumber } from '../../../../../../../../../_utils'
import { presetColors } from '../../../../../../../../../_utils/colors'
import { Tag } from 'antd'
import React from 'react'
import {
  ColumnCurrencyFormat,
  ColumnTextFormat
} from '../../../../../../../../../types'
import TextFormat from '../TextFormat'

type CurrencyPresentationProps = {
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
    currencyFormat,
    textFormat,
    isDisabled
  } = props
  const currency = formatNumber(Number(data ?? 0), {
    ...currencyFormat,
    style: 'currency'
  })
  if (presentationType === 'tag') {
    return (
      <Tag
        color={presentationColor || 'default'}
        style={{
          marginRight: 0,
          opacity: isDisabled ? 0.5 : 1
        }}
      >
        <TextFormat textFormat={textFormat}>
          {data ? currency : '--'}
        </TextFormat>
      </Tag>
    )
  } else
    return (
      <div
        style={{
          color: presetColors[presentationColor || 'default'],
          opacity: isDisabled ? 0.5 : 1,
          overflow: 'hidden'
        }}
      >
        <TextFormat textFormat={textFormat}>
          {data ? currency : '--'}
        </TextFormat>
      </div>
    )
}

export default CurrencyPresentation
