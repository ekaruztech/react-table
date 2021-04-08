import { format } from 'date-fns'
import { Tag } from 'antd'
import React from 'react'
import { ColumnTextFormat } from '../../../../../../../../../types'
import TextFormat from '../TextFormat'
import { presetColors } from '../../../../../../../../../_utils/colors'

type DatePresentationProps = {
  presentationType: 'tag' | undefined
  presentationColor: string | null
  isDisabled: boolean
  data: Date | undefined
  dateFormat: string | undefined
  textFormat: ColumnTextFormat | undefined
}
const DatePresentation = (props: DatePresentationProps) => {
  const {
    data,
    isDisabled,
    presentationColor,
    presentationType,
    dateFormat,
    textFormat
  } = props
  const _dateFormat = dateFormat || 'MMM dd, yyyy hh:mm aaa'
  const date = data ? format(new Date(data || Date.now()), _dateFormat) : '--'
  if (presentationType === 'tag') {
    return (
      <Tag
        color={presentationColor || 'default'}
        style={{
          opacity: isDisabled ? 0.5 : 1
        }}
      >
        <TextFormat textFormat={textFormat}>{date}</TextFormat>
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
        <TextFormat textFormat={textFormat}>{date}</TextFormat>
      </div>
    )
}

export default DatePresentation
