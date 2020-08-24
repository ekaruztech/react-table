import React from 'react';
import {motion} from "framer-motion";
import {Layout, Menu} from "antd";
import Scrollbar from "react-perfect-scrollbar";
import {
    UserOutlined,
    NumberOutlined,
    UploadOutlined,
    BarChartOutlined,
    AppstoreOutlined,
    NotificationOutlined,
    LaptopOutlined,
    CloudOutlined,
    TeamOutlined,
    ShopOutlined
} from '@ant-design/icons';
import { navigate } from "@reach/router"


const {Sider} = Layout;
export default (props) => {
    const {collapsed} = props;
    return <motion.div
        initial={{x: 0}}
        animate={{x: collapsed ? -200 : 0}}
        transition={{duration: 0.15}}
        style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 60,
            top: 60,
        }}
    >
        <Layout>
            <Sider
                trigger={null}
                collapsible
                theme={"light"}
                collapsed={collapsed}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    borderRight: '1px solid var(--sbmenu-border)'
                    // position: "fixed",
                    // // left: 60,
                    // top: 60,
                }}
            >
                <Scrollbar>
                    <div className={"sub-header"}>
                        <span>Cart</span>
                    </div>
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={["10"]}
                        style={{height: "calc(100vh - 64px)", border: 0}}
                        onSelect={({key}) => {
                            navigate(key);
                        }}
                    >
                        <Menu.ItemGroup
                            title={
                                <span className={"item-group"}>
                            <NumberOutlined/> <span>First</span>
                          </span>
                            }
                        >
                            <Menu.Item key="/table" icon={<UploadOutlined/>}>
                                Table
                            </Menu.Item>
                            <Menu.Item key="/" icon={<BarChartOutlined/>}>
                                Components
                            </Menu.Item>
                            <Menu.Item key="12" icon={<CloudOutlined/>}>
                                nav 5
                            </Menu.Item>
                            <Menu.Item key="13" icon={<AppstoreOutlined/>}>
                                nav 6
                            </Menu.Item>
                            <Menu.Item key="14" icon={<TeamOutlined/>}>
                                nav 7
                            </Menu.Item>
                            <Menu.Item key="15" icon={<ShopOutlined/>}>
                                nav 8
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title={"Second"}>
                            <Menu.SubMenu
                                key="sub1"
                                icon={<UserOutlined/>}
                                title="subnav 1"
                            >
                                <Menu.Item key="16">option1</Menu.Item>
                                <Menu.Item key="17">option2</Menu.Item>
                                <Menu.Item key="18">option3</Menu.Item>
                                <Menu.Item key="19">option4</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="sub2"
                                icon={<LaptopOutlined/>}
                                title="subnav 2"
                            >
                                <Menu.Item key="20">option5</Menu.Item>
                                <Menu.Item key="21">option6</Menu.Item>
                                <Menu.Item key="22">option7</Menu.Item>
                                <Menu.Item key="23">option8</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.SubMenu
                                key="sub3"
                                icon={<NotificationOutlined/>}
                                title="subnav 3"
                            >
                                <Menu.Item key="24">option9</Menu.Item>
                                <Menu.Item key="25">option10</Menu.Item>
                                <Menu.Item key="26">option11</Menu.Item>
                                <Menu.Item key="27">option12</Menu.Item>
                            </Menu.SubMenu>
                        </Menu.ItemGroup>
                    </Menu>
                </Scrollbar>
            </Sider>
        </Layout>
    </motion.div>
}