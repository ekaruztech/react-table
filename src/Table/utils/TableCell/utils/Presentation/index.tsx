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
} from '../../../../../types'
// eslint-disable-next-line no-unused-vars
import moment, { Moment } from 'moment'

interface IPresentation {
  columnType: ColumnType | undefined
  data: string | Moment | Date | number | undefined
  actionPresentationType: ActionPresentationType | undefined
  presentationType: PresentationType | undefined
  presentationColor: PresentationColor | undefined
  actionCallback: undefined | ((source: any) => void)
  bold: boolean | undefined
  actionTitle?: string
  source: any
  dateFormat: string | undefined
}
const Presentation: React.FC<IPresentation> = (props) => {
  const {
    columnType,
    data,
    presentationType,
    actionCallback,
    actionPresentationType,
    actionTitle,
    presentationColor,
    bold,
    source,
    dateFormat
  } = props
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
        currency: 'NGN',
        style: 'currency'
      }).format(Number(data) || 0)
      if (presentationType === 'tag') {
        return (
          <Tag
            color={presentationColor || 'gold'}
            style={{
              fontWeight: bold ? 'bold' : 'normal'
            }}
          >
            {currency}
          </Tag>
        )
      } else
        return (
          <span
            style={{
              fontWeight: bold ? 'bold' : 'normal'
            }}
          >
            {currency}
          </span>
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
            color={presentationColor || 'gold'}
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
              backgroundColor: 'transparent'
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
            color={presentationColor || 'gold'}
            style={{
              fontWeight: bold ? 'bold' : 'normal'
            }}
          >
            {data || '⏤⏤⏤'}
          </Tag>
        )
      } else
        return (
          <Tag
            color={presentationColor || 'default'}
            style={{
              fontWeight: bold ? 'bold' : 'normal',
              borderColor: 'transparent',
              backgroundColor: 'transparent'
            }}
          >
            {data || '⏤⏤⏤'}
          </Tag>
        )
  }
}

export default Presentation
