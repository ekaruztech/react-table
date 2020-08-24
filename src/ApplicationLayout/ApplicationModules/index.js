import React from 'react';
import {Layout, Menu} from "antd";
import {
    ShopOutlined,
    LogoutOutlined,
    TeamOutlined,
    AppstoreOutlined,
    MenuOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    BarChartOutlined,
    BulbOutlined
} from '@ant-design/icons';

const {Sider} = Layout;
export default (props) => {
    const {toggleSubMenu, changeTheme, theme} = props;
    return <Layout style={{zIndex: 200}}>
        <Sider
            trigger={null}
            collapsible
            theme={"light"}
            collapsed={true}
            collapsedWidth={60}
            style={{
                overflow: "hidden",
                height: "100vh",
                position: "fixed",
                left: 0,
                width: 60,
                borderRight: "1px solid var(--border)",
            }}
        >
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{
                    height: 60,
                    width: 60,
                }}
            >
                <Menu.Item
                    key=""
                    onClick={toggleSubMenu}
                    style={{
                        width: 60,
                        margin: 0,
                        height: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: 0,
                        // borderRight: "1px solid var(--border)",
                        background: "var(--background-primary)",
                        borderBottom: "1px solid var(--border)",
                    }}
                    icon={<MenuOutlined className={"sider-icon"}/>}
                >
                    Collapse
                </Menu.Item>
            </Menu>

            <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{border: 0}}
            >
                <Menu.Item
                    key="0"
                    style={{background: "var(--background-primary)", height: 60}}
                />
                <Menu.Item
                    key="1"
                    icon={<UserOutlined className={"sider-icon"}/>}
                >
                    nav 1
                </Menu.Item>
                <Menu.Item
                    key="2"
                    icon={<VideoCameraOutlined className={"sider-icon"}/>}
                >
                    nav 2
                </Menu.Item>
                <Menu.Item
                    key="3"
                    icon={<UploadOutlined className={"sider-icon"}/>}
                >
                    nav 3
                </Menu.Item>
                <Menu.Item
                    key="4"
                    icon={<BarChartOutlined className={"sider-icon"}/>}
                >
                    nav 4
                </Menu.Item>

                <Menu.ItemGroup
                    // theme="light"
                    // mode="inline"
                    // defaultSelectedKeys={[]}
                    style={{position: "absolute", bottom: 0, border: 0}}
                >
                    <Menu.Item
                        key="5"
                        onClick={() => changeTheme(theme)}
                        icon={<BulbOutlined className={"sider-icon"}/>}
                    >
                        nav 5
                    </Menu.Item>
                    <Menu.Item
                        key="6"
                        icon={<AppstoreOutlined className={"sider-icon"}/>}
                    >
                        nav 6
                    </Menu.Item>
                    <Menu.Item
                        key="7"
                        icon={<TeamOutlined className={"sider-icon"}/>}
                    >
                        nav 7
                    </Menu.Item>
                    <Menu.Item
                        key="8"
                        icon={<ShopOutlined className={"sider-icon"}/>}
                    >
                        nav 8
                    </Menu.Item>
                    <Menu.Item
                        key="9"
                        icon={<LogoutOutlined className={"sider-icon"}/>}
                    >
                        Logout
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        </Sider>
    </Layout>

}