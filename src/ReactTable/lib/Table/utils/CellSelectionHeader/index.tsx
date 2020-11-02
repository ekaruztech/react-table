import { Button, Row, Col } from 'antd'
import Align from '../../../../../Align'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { isEmpty, clamp } from 'lodash'
import { motion } from 'framer-motion'
import { ReactTableContext } from '../../../ReactTableContext'
import './styles.scss'

interface ICellSelectionHeader {
  cellSelectionMenu?: React.ReactNode[]
  cellSelectionSpacing?: number[] | number
}
const CellSelectionHeader: React.FC<ICellSelectionHeader> = (props) => {
  const { cellSelectionMenu, cellSelectionSpacing = 4 } = props

  // TODO: moved inline styles to css file

  return !isEmpty(cellSelectionMenu) ? (
    <ReactTableContext.Consumer>
      {({ selectedTableItems, onSelectedItemChange }) => {
        return !isEmpty(selectedTableItems.itemList) ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              delay: 0.1,
              damping: 13
            }}
          >
            <Align className='ReactTable___CellSelection' alignCenter>
              <Row gutter={[10, 20]} className='ReactTable___CellSelection-row'>
                <Col
                  span={4}
                  className={`ReactTable___CellSelection-col ${
                    !((cellSelectionMenu || []).length < 1)
                      ? 'CellSelection-border'
                      : ''
                  }`}
                >
                  <Button
                    type='text'
                    icon={
                      <span className={'anticon'}>
                        <i className={'ri-close-line'} />
                      </span>
                    }
                    onClick={() => onSelectedItemChange([])}
                  >
                    {selectedTableItems?.itemList?.length || 0} selected
                  </Button>
                </Col>
                {(cellSelectionMenu || []).map(
                  (
                    menu: React.ReactNode,
                    index: number,
                    array: typeof cellSelectionMenu
                  ) => {
                    const spacing = Array.isArray(cellSelectionSpacing)
                      ? cellSelectionSpacing[index] || 4
                      : clamp(cellSelectionSpacing || 2, 2, 24)
                    const isLastElement = (array || []).length - 1 === index
                    return (
                      <Col
                        span={spacing}
                        className={`ReactTable___CellSelection-col ${
                          !isLastElement ? 'CellSelection-border' : ''
                        }`}
                      >
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 100,
                            delay: 0.1 * (index || 1),
                            damping: 13
                          }}
                        >
                          {menu}
                        </motion.span>
                      </Col>
                    )
                  }
                )}
              </Row>
            </Align>
          </motion.div>
        ) : null
      }}
    </ReactTableContext.Consumer>
  ) : null
}

export default CellSelectionHeader
