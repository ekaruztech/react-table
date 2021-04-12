import { Tag } from 'antd'
import React from 'react'
import { ColumnTextFormat } from '../../../../../../../../../typings'
import TextFormat from '../TextFormat'
import { PresetColors } from '../../../../../../../../../_utils/colors'
import { isPlainObject } from 'lodash'

type TextPresentationProps = {
  presentationType: 'tag' | undefined
  presentationColor: string | null
  isDisabled: boolean
  data: string | number
  textFormat: ColumnTextFormat | undefined
  source: any
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
        <TextFormat textFormat={isPlainObject(textFormat) ? textFormat : {}}>
          {data ?? '--'}
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
        {data ?? '--'}
      </TextFormat>
    </div>
  )
}

export default TextPresentation
