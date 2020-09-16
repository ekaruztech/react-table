import { Button, Dropdown, Menu, Tooltip } from "antd";
import { motion } from "framer-motion";
import React from "react";
import {
  FilterOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "./_styles.scss";

type CellMenuProps = {
  showDrawer:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
};

export default (props: CellMenuProps) => {
  const { showDrawer } = props;
  const menu = (
    <Menu
      style={{
        border: 0,
        background: "var(--background-secondary)",
      }}
    >
      <Menu className={"CellMenu__menu"}>
        <Menu.Item key={"expand"}>
          <motion.div
            initial={{ color: "var(--text-color)", cursor: "pointer" }}
            whileHover={{ scale: 1.25 }}
          >
            <Tooltip title={"Expand column"}>
              <Button
                type={"text"}
                onClick={showDrawer}
                style={{ color: "var(--accent35)", width: 40, padding: 0 }}
              >
                <FullscreenOutlined />
              </Button>
            </Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key={"filter"}>
          <motion.div
            initial={{ color: "var(--text-color)", cursor: "pointer" }}
            whileHover={{ scale: 1.25 }}
          >
            <Tooltip title={"Edit"}>
              <Button
                type={"text"}
                style={{
                  color: "var(--accent35)",
                  width: 40,
                  padding: 0,
                }}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key={"edit"}>
          <motion.div
            initial={{ color: "var(--text-color)", cursor: "pointer" }}
            whileHover={{ scale: 1.25 }}
          >
            <Tooltip title={"Filter data by value"}>
              <Button
                type={"text"}
                style={{
                  color: "var(--accent35)",
                  width: 40,
                  padding: 0,
                }}
              >
                <FilterOutlined />
              </Button>
            </Tooltip>
          </motion.div>
        </Menu.Item>
        <Menu.Item key={"delete"}>
          <motion.div
            initial={{ color: "var(--text-color)", cursor: "pointer" }}
            whileHover={{ scale: 1.25 }}
          >
            <Tooltip title={"Delete"}>
              <Button danger type={"text"} style={{ width: 40, padding: 0 }}>
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </motion.div>
        </Menu.Item>
      </Menu>
      <Menu
        style={{
          border: 0,
          background: "var(--background-secondary)",
        }}
      >
        <Menu.Divider />
        <Menu.Item
          key="0"
          icon={
            <ReloadOutlined
              style={{ color: "var(--accent)", paddingRight: 10 }}
            />
          }
        >
          Refresh
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={
            <FileTextOutlined
              style={{ color: "var(--accent)", paddingRight: 10 }}
            />
          }
        >
          Export as CSV
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={
            <FileExcelOutlined
              style={{ color: "var(--accent)", paddingRight: 10 }}
            />
          }
        >
          Export as Excel
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={
            <FilePdfOutlined
              style={{ color: "var(--accent)", paddingRight: 10 }}
            />
          }
        >
          Export as PDF
        </Menu.Item>
      </Menu>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Tooltip title={"Actions"}>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Button
            shape={"circle"}
            type={"text"}
            icon={<EllipsisOutlined style={{ fontSize: 17 }} />}
          />
        </motion.div>
      </Tooltip>
    </Dropdown>
  );
};
