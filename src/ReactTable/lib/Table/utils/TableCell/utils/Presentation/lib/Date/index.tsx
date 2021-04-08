import { format } from 'date-fns'
import { Tag } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
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

type DatePresentationProps = {
  presentationType: 'tag' | undefined
  presentationColor: string | null
  isDisabled: boolean
  data: Date | undefined
  dateFormat: ColumnDateFormat | undefined
  textFormat: ColumnTextFormat | undefined
}

const DatePresentation = (props: DatePresentationProps) => {
  const {
    data,
    isDisabled,
    presentationColor,
    presentationType,
    dateFormat: _DateFormat,
    textFormat
  } = props

  const dateFormat = {
    formatString: _DateFormat?.formatString ?? 'MMM dd, yyyy hh:mm aaa',
    locale: _DateFormat?.locale ?? SupportedDateLocales.enGB
  }

  throwUnsupportedDateLocaleError(dateFormat.locale)

  const locale = useRef(require('date-fns/locale/en-GB'))
  const [formattedDate, setFormattedDate] = useState('--')

  const onFormattedDateChange = (date: Date) => {
    const formatString = dateFormat.formatString
    if (data && isDate(date)) {
      setFormattedDate(
        format(date, formatString, {
          locale: locale.current
        })
      )
      return
    }
    setFormattedDate('--')
  }

  useEffect(() => {
    if (data) {
      try {
        locale.current = require(`date-fns/locale/${dateFormat.locale}`)
      } catch (e) {
        console.error(`React Table: could not retrieve date locale`)
      }
    }
  }, [dateFormat])

  useEffect(() => {
    const date = new Date(data as string | Date)
    onFormattedDateChange(date)
  }, [locale.current, data])

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
