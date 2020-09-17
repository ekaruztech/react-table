import React, { useRef, useState } from "react";
import { Checkbox, Tag, Drawer, Button } from "antd";

import { motion } from "framer-motion";
import CellMenu from "./_partials/CellMenu";
import {
  ColumnProps,
  ColumnType,
  PresentationType,
  ActionPresentationType,
  PresentationColor,
} from "../../../types";
import moment, { Moment } from "moment";

const presentationHOC = ({
  extraColumnsLength,
  columnKeys,
  columnType,
}: {
  extraColumnsLength: number;
  columnKeys: string[];
  columnType: ColumnType | undefined;
}) => (Component: React.ReactNode) => (
  <motion.td
    layout
    style={{
      width: `calc(100% / ${columnKeys.length + extraColumnsLength} - 120px)`,
    }}
    className={"___table-row"}
  >
    <div
      className={"___table-row-inner"}
      style={{
        textAlign:
          columnType === "number" || columnType === "currency"
            ? "right"
            : "left",
      }}
    >
      {Component}
    </div>
  </motion.td>
);

type PresentationProps = {
  columnType: ColumnType | undefined;
  data: string | Moment | Date | number | undefined;
  actionPresentationType: ActionPresentationType | undefined;
  presentationType: PresentationType | undefined;
  presentationColor: PresentationColor | undefined;
  actionCallback: undefined | ((source: any) => void);
  bold: boolean | undefined;
  actionTitle?: string;
  source: any;
  dateFormat: string | undefined;
};
const Presentation = (props: PresentationProps) => {
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
    dateFormat,
  } = props;
  switch (columnType) {
    case "action":
      return (
        <Button
          type={actionPresentationType ?? "default"}
          onClick={() => (actionCallback ? actionCallback(source) : null)}
          size={"small"}
          style={{ fontSize: 12 }}
        >
          {actionTitle ?? ""}
        </Button>
      );

    case "currency":
      const currency = Intl.NumberFormat("en-NG", {
        currency: "NGN",
        style: "currency",
      }).format(Number(data) ?? 0);
      if (presentationType === "tag") {
        return (
          <Tag
            color={presentationColor ?? "gold"}
            style={{
              fontWeight: bold ? "bold" : "normal",
            }}
          >
            {currency}
          </Tag>
        );
      } else
        return (
          <span
            style={{
              fontWeight: bold ? "bold" : "normal",
            }}
          >
            {currency}
          </span>
        );
    case "date":
    case "datetime":
      const format = dateFormat === "datetime" ? "lll LT" : "lll";
      const date =
        moment(data).format(dateFormat ?? format) ??
        moment(data).format(format);
      if (presentationType === "tag") {
        return (
          <Tag
            color={presentationColor ?? "gold"}
            style={{
              fontWeight: bold ? "bold" : "normal",
            }}
          >
            {date}
          </Tag>
        );
      } else
        return (
          <Tag
            color={presentationColor ?? "default"}
            style={{
              fontWeight: bold ? "bold" : "normal",
              borderColor: "transparent",
              background: "transparent",
            }}
          >
            {date}
          </Tag>
        );
    default:
      if (presentationType === "tag") {
        return (
          <Tag
            color={presentationColor ?? "gold"}
            style={{
              fontWeight: bold ? "bold" : "normal",
            }}
          >
            {data ?? "⏤⏤⏤"}
          </Tag>
        );
      } else
        return (
          <Tag
            color={presentationColor ?? "default"}
            style={{
              fontWeight: bold ? "bold" : "normal",
              borderColor: "transparent",
              background: "transparent",
            }}
          >
            {data ?? "⏤⏤⏤"}
          </Tag>
        );
  }
};

type TableCellProps = {
  checked: boolean;
  /** DataSource item.*/
  source: any;
  onCheckedChange: Function;
  checkState: any;
  columnKeys: string[];
  extraColumnsLength: number;
  /** columns.selected*/
  columns: ColumnProps[];
  index?: number
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
    columns,
    index
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
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        transition={{
          type: 'spring',
          delay: (index ?? 1) * 0.02 ,
          stiffness: 100,
          damping: 13,
        }}
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
          // const retrievedIsAnObject = isObject(retrieved);
          const presentationType = retrieved?.presentationType;
          const presentationColor = retrieved?.presentationColor;
          /**Value is mapped to the key of the column */
          const data = source[value];

          return presentationHOC({
            extraColumnsLength,
            columnKeys,
            columnType: retrieved?.type,
          })(
            <Presentation
              data={data}
              presentationColor={presentationColor}
              presentationType={presentationType}
              actionCallback={retrieved?.actionCallback}
              actionPresentationType={retrieved?.actionPresentationType}
              columnType={retrieved?.type}
              bold={retrieved?.bold}
              actionTitle={retrieved?.actionTitle}
              source={source}
              dateFormat={retrieved?.dateFormat}
            />
          );
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
