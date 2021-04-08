import { Tag } from 'antd'
import React from 'react'
import { ColumnTextFormat } from '../../../../../../../../../types'
import TextFormat from '../TextFormat'
import { presetColors } from '../../../../../../../../../_utils/colors'

type TextPresentationProps = {
  presentationType: 'tag' | undefined
  presentationColor: string | null
  isDisabled: boolean
  data: string | number
  textFormat: ColumnTextFormat | undefined
}
const TextPresentation = (props: TextPresentationProps) => {
  const {
    presentationColor,
    presentationType,
    data,
    isDisabled,
    textFormat
  } = props
  if (presentationType === 'tag') {
    return (
      <Tag
        color={presentationColor || 'orange'}
        style={{
          marginRight: 0,
          opacity: isDisabled ? 0.5 : 1
        }}
      >
        <TextFormat textFormat={textFormat}>{data ?? '--'}</TextFormat>
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
        <TextFormat textFormat={textFormat}>{data ?? '--'}</TextFormat>
      </div>
    )
}

export default TextPresentation
