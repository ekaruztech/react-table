import { format } from 'date-fns'
import { Tag } from 'antd'
import React from 'react'
import {
  ColumnDateFormat,
  ColumnTextFormat
} from '../../../../../../../../../typings'
import TextFormat from '../TextFormat'
import { PresetColors } from '../../../../../../../../../_utils/colors'
import {
  SupportedDateLocales,
  throwUnsupportedDateLocaleError
} from '../../../../../../../../../_utils/locales'
import { isDate } from '../../../../../../../../../_utils'
import { isFunction, isEqual } from 'lodash'

let locale = require('date-fns/locale/en-GB')

type DatePresentationProps = {
  presentationType: 'tag' | undefined
  presentationColor: string | null
  columnType: string
  isDisabled: boolean
  data: Date | undefined
  dateFormat: ColumnDateFormat | undefined
  textFormat: ColumnTextFormat | undefined
  source: any
}

const DatePresentation = (props: DatePresentationProps) => {
  const {
    data,
    isDisabled,
    presentationColor,
    presentationType,
    dateFormat: _DateFormatSettings,
    textFormat: _TextFormat,
    source,
    columnType
  } = props

  const dateFormatSettings =
    (isFunction(_DateFormatSettings)
      ? _DateFormatSettings(data, source)
      : _DateFormatSettings) ?? {}

  const dateFormat = {
    formatString:
      dateFormatSettings?.formatString ??
      (columnType === 'time' ? 'HH:mm:ss' : 'MMM dd, yyyy HH:mm:ss'),
    locale: dateFormatSettings?.locale ?? SupportedDateLocales.enGB
  }

  throwUnsupportedDateLocaleError(dateFormat.locale)

  const textFormat = isFunction(_TextFormat)
    ? _TextFormat(new Date(data as string | Date).toString(), source)
    : _TextFormat

  const getLocaleFormattedDate = (data: Date | undefined) => {
    if (data) {
      if (!isEqual(locale?.code, dateFormat.locale)) {
        try {
          locale = require(`date-fns/locale/${dateFormat.locale}`)
        } catch (e) {
          console.error(`React Table: could not retrieve date locale`)
        }
      }

      const date = new Date(data as string | Date)
      const formatString = dateFormat.formatString
      if (isDate(date)) {
        return format(date, formatString, {
          locale: locale
        })
      }
      return '--'
    }

    return '--'
  }

  const formattedDate = getLocaleFormattedDate(data)

  if (presentationType === 'tag') {
    return (
      <Tag
        color={presentationColor || 'default'}
        style={{
          opacity: isDisabled ? 0.5 : 1
        }}
      >
        <TextFormat textFormat={textFormat}>{formattedDate}</TextFormat>
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
      <TextFormat textFormat={textFormat}>{formattedDate}</TextFormat>
    </div>
  )
}

export default DatePresentation
