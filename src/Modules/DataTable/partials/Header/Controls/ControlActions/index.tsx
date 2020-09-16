import { Button, Dropdown, Menu, Tooltip } from "antd";
import React from "react";
import "./_styles.scss";

export default () => {
  const menu = (
    <Menu className={"CtrlActions__menu"}>
      <Menu.Item
        key="0"
        icon={
          <span className={"anticon"}>
            <i
              className={"ri-refresh-line"}
              style={{ color: "var(--accent)", paddingRight: 10, fontSize: 17 }}
            />
          </span>
        }
      >
        Refresh
      </Menu.Item>
      <Menu.Item
        key="1"
        icon={
          <span className={"anticon"}>
            <i
              className={"ri-file-line"}
              style={{ color: "var(--accent)", paddingRight: 10, fontSize: 17 }}
            ></i>
          </span>
        }
      >
        Export as CSV
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={
          <span className={"anticon"}>
            <i
              className={"ri-file-excel-2-line"}
              style={{ color: "var(--accent)", paddingRight: 10, fontSize: 17 }}
            ></i>
          </span>
        }
      >
        Export as Excel
      </Menu.Item>
      <Menu.Item
        key="4"
        icon={
          <span className={"anticon"}>
            <i
              className={"ri-file-pdf-line"}
              style={{ color: "var(--accent)", paddingRight: 10, fontSize: 17 }}
            ></i>
          </span>
        }
      >
        Export as PDF
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Tooltip title={"Export data"}>
        <Button
          icon={
            <span className={"anticon"}>
              <i
                className="ri-download-cloud-2-line"
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
  );
};
