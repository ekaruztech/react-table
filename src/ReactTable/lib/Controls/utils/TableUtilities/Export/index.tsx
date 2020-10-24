import { Button, Dropdown, Menu, Tooltip } from 'antd'
import React from 'react'
import { first, last, isFunction, isBoolean } from 'lodash'
import './styles.scss'

interface ExportProps {
  enableExport?:
    | [boolean, boolean, boolean]
    | [boolean, boolean]
    | [boolean]
    | boolean
  onExport?: (exportType: 'csv' | 'pdf' | 'excel') => void
}
const Export: React.FC<ExportProps> = (props) => {
  const { enableExport, onExport } = props

  const enableCsv =
    (Array.isArray(enableExport) &&
      enableExport?.length >= 1 &&
      !!first(enableExport)) ||
    (isBoolean(enableExport) && enableExport)

  const enableExcel =
    (Array.isArray(enableExport) &&
      enableExport?.length >= 2 &&
      enableExport[1]) ||
    (isBoolean(enableExport) && enableExport)

  const enablePdf =
    (Array.isArray(enableExport) &&
      enableExport?.length === 3 &&
      !!last(enableExport)) ||
    (isBoolean(enableExport) && enableExport)

  const menu = (
    <Menu
      className='ReactTable___export-menu'
      onSelect={(selectInfo) => {
        const key = selectInfo.key as 'pdf' | 'excel' | 'csv'
        if (isFunction(onExport)) {
          onExport(key)
        }
      }}
    >
      {enableCsv && (
        <Menu.Item
          key='csv'
          icon={
            <span className='anticon'>
              <i className='ri-file-line export-menu-icon' />
            </span>
          }
        >
          Export as CSV
        </Menu.Item>
      )}
      {enableExcel && (
        <Menu.Item
          key='excel'
          icon={
            <span className='anticon'>
              <i className='ri-file-excel-2-line export-menu-icon' />
            </span>
          }
        >
          Export as Excel
        </Menu.Item>
      )}
      {enablePdf && (
        <Menu.Item
          key='pdf'
          icon={
            <span className='anticon'>
              <i className='ri-file-pdf-line export-menu-icon' />
            </span>
          }
        >
          Export as PDF
        </Menu.Item>
      )}
    </Menu>
  )

  return enableExcel || enableCsv || enablePdf ? (
    <Dropdown overlay={menu} trigger={['click']}>
      <Tooltip title='Export data'>
        <Button
          icon={
            <span className='anticon'>
              <i
                className='ri-download-cloud-2-line'
                style={{ fontSize: 17 }}
              />
            </span>
          }
          style={{ width: 160 }}
        >
          Export data
        </Button>
      </Tooltip>
    </Dropdown>
  ) : null
}

export default Export
