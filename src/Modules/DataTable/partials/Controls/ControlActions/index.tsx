import {Button, Dropdown, Menu, Tooltip} from "antd";
import {ReloadOutlined, FileTextOutlined, FileExcelOutlined, FilePdfOutlined, DownloadOutlined} from '@ant-design/icons';
import React from "react";

export default () => {
    const menu = (
        <Menu>
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
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            <Tooltip title={"Export data"}>
                <Button
                    icon={<DownloadOutlined style={{ fontSize: 17 }} />}
                    style={{ width: 160 }}
                >
                    Export data
                </Button>
            </Tooltip>
        </Dropdown>
    );
};