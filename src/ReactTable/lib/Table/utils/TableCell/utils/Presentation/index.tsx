import React from 'react'
import { Tag, Button } from 'antd'
import {
  // eslint-disable-next-line no-unused-vars
  ColumnType,
  // eslint-disable-next-line no-unused-vars
  PresentationType,
  // eslint-disable-next-line no-unused-vars
  ActionPresentationType,
  // eslint-disable-next-line no-unused-vars
  PresentationColor
} from '../../../../../../../types'
// eslint-disable-next-line no-unused-vars
import moment, { Moment } from 'moment'
import { isFunction } from 'lodash'

interface IPresentation {
  columnType: ColumnType | undefined
  data: string | Moment | Date | number | undefined
  actionPresentationType: ActionPresentationType | undefined
  presentationType: PresentationType | undefined
  presentationColor:
    | PresentationColor
    | ((value: string) => PresentationColor)
    | undefined
  actionCallback: undefined | ((source: any) => void)
  bold: boolean | undefined
  actionTitle?: string
  source: any
  dateFormat: string | undefined
  currency: string | undefined
}
const Presentation: React.FC<IPresentation> = (props) => {
  const {
    columnType,
    data,
    presentationType,
    actionCallback,
    actionPresentationType,
    actionTitle,
    presentationColor: pColor,
    bold,
    source,
    dateFormat,
    currency: currencyType
  } = props

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
        >
          {actionTitle || ''}
        </Button>
      )
    case 'currency': {
      const currency = Intl.NumberFormat('en-NG', {
        currency: currencyType || 'NGN',
        style: 'currency'
      }).format(Number(data) || 0)
      if (presentationType === 'tag') {
        return (
          <Tag
            color={presentationColor || 'gold'}
            style={{
              fontWeight: bold ? 'bold' : 'normal',
              marginRight: 0
            }}
          >
            {currency}
          </Tag>
        )
      } else
        return (
          <Tag
            color={presentationColor || 'default'}
            style={{
              fontWeight: bold ? 'bold' : 'normal',
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              marginRight: 0,
              paddingLeft: 0
            }}
          >
            {currency}
          </Tag>
        )
    }
    case 'date':
    case 'datetime': {
      const format = dateFormat === 'datetime' ? 'lll LT' : 'lll'
      const date =
        moment(data).format(dateFormat || format) || moment(data).format(format)
      if (presentationType === 'tag') {
        return (
          <Tag
            color={presentationColor || 'default'}
            style={{
              fontWeight: bold ? 'bold' : 'normal'
            }}
          >
            {date}
          </Tag>
        )
      } else
        return (
          <Tag
            color={presentationColor || 'default'}
            style={{
              fontWeight: bold ? 'bold' : 'normal',
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              paddingLeft: 0
            }}
          >
            {date}
          </Tag>
        )
    }
    default:
      if (presentationType === 'tag') {
        return (
          <Tag
            color={presentationColor || 'orange'}
            style={{
              fontWeight: bold ? 'bold' : 'normal',
              marginRight: 0
            }}
          >
            {data || '...........'}
          </Tag>
        )
      } else
        return (
          <Tag
            color={presentationColor || 'default'}
            style={{
              fontWeight: bold ? 'bold' : 'normal',
              borderColor: 'transparent',
              backgroundColor: 'transparent',
              marginRight: 0,
              paddingLeft: 0
            }}
          >
            {data || '...........'}
          </Tag>
        )
  }
}

export default Presentation
