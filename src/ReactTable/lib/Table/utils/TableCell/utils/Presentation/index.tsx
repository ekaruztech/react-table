import React from 'react'
import { Button } from 'antd'
import { ColumnProps } from '../../../../../../../typings'
import { isFunction } from 'lodash'
import NumberPresentation from './lib/Number'
import DatePresentation from './lib/Date'
import CurrencyPresentation from './lib/Currency'
import TextPresentation from './lib/Text'

interface PresentationProps {
  data: string | Date | number | undefined
  source: any
  isDisabled: boolean
  columnProps: ColumnProps
}
const Presentation: React.FC<PresentationProps> = (props) => {
  const { data, source, isDisabled, columnProps } = props
  const {
    type: columnType,
    presentationType,
    actionCallback,
    actionPresentationType,
    actionTitle,
    presentationColor: pColor,
    dateFormat,
    currencyFormat,
    numberFormat,
    textFormat
  } = columnProps

  const fnPresentationColor =
    pColor && isFunction(pColor) ? pColor(String(data).toLowerCase()) : pColor
  const presentationColor =
    typeof fnPresentationColor === 'string'
      ? fnPresentationColor.toLowerCase()
      : null

  switch (columnType) {
    case 'action':
      return (
        <Button
          type={actionPresentationType || 'default'}
          onClick={() => (actionCallback ? actionCallback(source) : null)}
          size='small'
          style={{ fontSize: 12 }}
          disabled={isDisabled}
        >
          {actionTitle || ''}
        </Button>
      )
    case 'currency': {
      return (
        <CurrencyPresentation
          presentationType={presentationType}
          presentationColor={presentationColor}
          isDisabled={isDisabled}
          data={data as number | string}
          currencyFormat={currencyFormat}
          textFormat={textFormat}
        />
      )
    }
    case 'date':
    case 'datetime': {
      return (
        <DatePresentation
          presentationType={presentationType}
          presentationColor={presentationColor}
          isDisabled={isDisabled}
          data={data as Date | undefined}
          dateFormat={dateFormat}
          textFormat={textFormat}
        />
      )
    }
    case 'number': {
      return (
        <NumberPresentation
          presentationType={presentationType}
          presentationColor={presentationColor}
          isDisabled={isDisabled}
          data={data as string | number}
          numberFormat={numberFormat}
          textFormat={textFormat}
        />
      )
    }
    default:
      return (
        <TextPresentation
          presentationType={presentationType}
          presentationColor={presentationColor}
          isDisabled={isDisabled}
          data={data as string | number}
          textFormat={textFormat}
        />
      )
  }
}

export default Presentation
