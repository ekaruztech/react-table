import React, { useRef, useEffect, useState } from 'react';
import { Button, Checkbox, Dropdown, Menu, Popconfirm, Tag, Tooltip, Space, Drawer } from 'antd';
import { isObject } from 'lodash';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import {
  FilterOutlined,
  ReloadOutlined,
  PlusOutlined,
  DownloadOutlined,
  FullscreenOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';

const CellMenu = (props) => {
  const { showDrawer } = props;
  const menu = (
    <Menu style={ {
      border: 0,
      background: 'var(--background-secondary)'
    } }>
      <Menu style={ {
        padding: '0 10px 0 10px',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 240,
        border: 0,
        background: 'var(--background-secondary)'
      } } direction={ 'horizontal' }>
        <Menu.Item key={ 'expand' }>
          <motion.div initial={ { color: 'var(--text-color)', cursor: 'pointer' } }
                      whileHover={ { scale: 1.25 } }>
            <Tooltip title={ 'Expand column' }>
              <Button type={ 'text' }
                      onClick={ showDrawer }
                      style={ { color: 'var(--accent35)', width: 40, padding: 0 } }><FullscreenOutlined
              /></Button>

            </Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key={ 'filter' }>
          <motion.div initial={ { color: 'var(--text-color)', cursor: 'pointer' } }
                      whileHover={ { scale: 1.25 } }>
            <Tooltip title={ 'Edit' }><Button type={ 'text' }
                                              style={ {
                                                color: 'var(--accent35)',
                                                width: 40,
                                                padding: 0
                                              } }><EditOutlined
            /></Button></Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key={ 'edit' }>
          <motion.div initial={ { color: 'var(--text-color)', cursor: 'pointer' } }
                      whileHover={ { scale: 1.25 } }>
            <Tooltip title={ 'Filter data by value' }><Button type={ 'text' }
                                                              style={ {
                                                                color: 'var(--accent35)',
                                                                width: 40, padding: 0
                                                              } }><FilterOutlined
            /></Button></Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key={ 'delete' }>
          <motion.div initial={ { color: 'var(--text-color)', cursor: 'pointer' } }
                      whileHover={ { scale: 1.25 } }>
            <Tooltip title={ 'Delete' }>
              <Button danger type={ 'text' }
                      style={ { width: 40, padding: 0 } }><DeleteOutlined/></Button>
            </Tooltip>
          </motion.div>
        </Menu.Item>
      </Menu>
      <Menu style={ {
        border: 0,
        background: 'var(--background-secondary)'
      } }>
        <Menu.Divider/>
        <Menu.Item key="0" icon={ <ReloadOutlined style={ { color: 'var(--accent)', paddingRight: 10 } }/> }>
          Refresh
        </Menu.Item>
        <Menu.Item key="1" icon={ <FileTextOutlined style={ { color: 'var(--accent)', paddingRight: 10 } }/> }>
          Export as CSV
        </Menu.Item>
        <Menu.Item key="3" icon={ <FileExcelOutlined style={ { color: 'var(--accent)', paddingRight: 10 } }/> }>Export
          as
          Excel</Menu.Item>
        <Menu.Item key="4" icon={ <FilePdfOutlined style={ { color: 'var(--accent)', paddingRight: 10 } }/> }>Export
          as
          PDF</Menu.Item>
      </Menu>
    </Menu>
  );


  return <Dropdown overlay={ menu } trigger={ ['click'] }>
    <Tooltip title={ 'Actions' }>
      <motion.div whileHover={ { scale: 1.2 } }>
        <Button
          shape={ 'circle' }
          type={ 'text' }
          icon={ <EllipsisOutlined style={ { fontSize: 17 } }/> }
        />
      </motion.div>
    </Tooltip>
  </Dropdown>;
};
export default (props) => {
  const {
    onExpandColumnClick,
    checked,
    source,
    onCheckedChange,
    checkState,
    columnKeys,
    extraColumnsLength = 1,
    TableExpandedView,
    columns,
    maxColumns,
  } = props;
  const trRef = useRef();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <motion.tr
        layout
        ref={ trRef }
        className={ `${
          checked ? 'vmw-table-rows-checked ' : 'vmw-table-rows'
        } site-collapse-custom-collapse` }
        key={ source?.key }
      >
        <td
          className={ 'vmw-table-row' }
          style={ {
            width: '64px',
          } }
        >
          <div className={ 'vmw-table-row-checkbox-container' }>
            <Checkbox
              key={ source?.key }
              onChange={ e => {
                onCheckedChange(
                  !e.target?.checked
                    ? checkState?.checkedList.filter(
                    value => value?.key !== source?.key
                    )
                    : checkState?.checkedList.concat(source)
                );
              } }
              checked={ checked }
            />
          </div>
        </td>

        { columnKeys.map((value, index) => {
          const retrieved = columns.find(c => c?.key === value);
          const retrievedIsAnObject = isObject(retrieved);
          const presentationType = retrieved?.presentationType;
          const presentationColor = retrieved?.presentationColor;
          const data = source[value];
          const tableTD = Component => (
            <motion.td
              layout
              style={ {
                width: `calc(100% / ${ columnKeys.length + extraColumnsLength } - 120px)`,
              } }
              className={ 'vmw-table-row' }
            >
              <div className={ 'vmw-table-row-inner' }>
                <Component/>
              </div>
            </motion.td>
          );
          if (
            retrievedIsAnObject &&
            (presentationType?.toLowerCase?.() === 'tag' ||
              presentationType?.toLowerCase?.() === 'date')
          ) {
            return tableTD(() => (
              <Tag color={ presentationColor ? presentationColor : 'blue' }>
                { data }
              </Tag>
            ));
          }
          return tableTD(() => <span>{ data }</span>);
        }) }
        <td
          style={ {
            width: 64,
          } }
          className={ 'vmw-table-row' }
        >
          <div className={ 'vmw-table-utility' }>
            <CellMenu showDrawer={ showDrawer }/>
          </div>
        </td>
      </motion.tr>

      <tr className={ 'vmw-table-collapsible vmw-table-collapsible-inactive' }>
        <td
          className={ 'vmw-table-collapsible-column' }
          colSpan={ columnKeys.length + extraColumnsLength + 1 }
          style={ {
            width: '100%',
          } }
        >
          <div
            className={
              'vmw-table-collapsible-inner vmw-table-collapsible-inactive'
            }
          >
            { TableExpandedView ? <TableExpandedView/> : null }
          </div>
        </td>
      </tr>

      <Drawer
        title={ source[columnKeys[0]] }
        placement={ 'left' }
        closable={ true }
        onClose={ onClose }
        visible={ drawerVisible }
        key={ 'Table-View-Drawer' }
        width={ '40%' }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
