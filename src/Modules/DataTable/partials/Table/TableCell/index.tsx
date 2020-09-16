import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Menu,
  Popconfirm,
  Tag,
  Tooltip,
  Space,
  Drawer,
} from "antd";
import { isObject } from "lodash";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import CellMenu from "./_partials/CellMenu";
import { ColumnProps } from "../../../types";

type TableCellProps = {
  checked: boolean;
  /** DataSource item.*/
  source: any;
  onCheckedChange: Function;
  checkState: any;
  columnKeys: string[];
  extraColumnsLength: number;
  TableExpandedView: React.FunctionComponent;
  /** columns.selected*/
  columns: ColumnProps[];
};

//TODO: Update TableCells to allow for more presentation types.
export default (props: TableCellProps) => {
  const {
    checked,
    source,
    onCheckedChange,
    checkState,
    columnKeys,
    extraColumnsLength = 1,
    TableExpandedView,
    columns,
  } = props;
  const trRef = useRef();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const showDrawer = () => {
    setDrawerVisible(true);
  };
  const onClose = () => {
    setDrawerVisible(false);
  };

  // @ts-ignore

  return (
    <>
      <motion.tr
        layout
          // @ts-ignore
        ref={trRef}
        className={`${
          checked ? "___table-rows-checked " : "___table-rows"
        } site-collapse-custom-collapse`}
        key={source?.key}
      >
        <td
          className={"___table-row"}
          style={{
            width: "64px",
          }}
        >
          <div className={"___table-row-checkbox-container"}>
            <Checkbox
              key={source?.key}
              onChange={(e) => {
                onCheckedChange(
                  !e.target?.checked
                    ? checkState?.checkedList.filter(
                        (value: any) => value?.key !== source?.key
                      )
                    : checkState?.checkedList.concat(source)
                );
              }}
              checked={checked}
            />
          </div>
        </td>

        {columnKeys.map((value) => {
          const retrieved = columns.find((c) => c?.key === value);
          const retrievedIsAnObject = isObject(retrieved);
          const presentationType = retrieved?.presentationType;
          const presentationColor = retrieved?.presentationColor;
          const data = source[value];
          const tableTD = (Component: React.FunctionComponent) => (
            <motion.td
              layout
              style={{
                width: `calc(100% / ${
                  columnKeys.length + extraColumnsLength
                } - 120px)`,
              }}
              className={"___table-row"}
            >
              <div className={"___table-row-inner"}>
                <Component />
              </div>
            </motion.td>
          );
          if (
            retrievedIsAnObject &&
            (presentationType?.toLowerCase?.() === "tag" ||
              presentationType?.toLowerCase?.() === "date")
          ) {
            return tableTD(() => (
              <Tag color={presentationColor ? presentationColor : "blue"}>
                {data}
              </Tag>
            ));
          }
          return tableTD(() => <span>{data}</span>);
        })}
        <td
          style={{
            width: 64,
          }}
          className={"___table-row"}
        >
          <div className={"___table-utility"}>
            <CellMenu showDrawer={showDrawer} />
          </div>
        </td>
      </motion.tr>

      <Drawer
        title={source[columnKeys[0]]}
        placement={"left"}
        closable={true}
        onClose={onClose}
        visible={drawerVisible}
        key={"Table-View-Drawer"}
        width={"40%"}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
