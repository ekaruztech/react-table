import React from "react";
import {
  Breadcrumb,
  Button,
  Space,
  Badge,
  Avatar,
  Input,
  PageHeader,
  message,
  BackTop,
} from "antd";
import "./App.css";
import "./custom-theme.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import Scrollbar from "react-perfect-scrollbar";
import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  ArrowLeftOutlined,
  NumberOutlined,
  SearchOutlined,
  LogoutOutlined,
  MenuOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import ScrollBar from "react-perfect-scrollbar";
import DropDowns from "./Items/DropDowns";
import Btn from "./Items/Btn";
import Steps from "./Items/_Steps";
import Check from "./Items/Check";
import DatePicker from "./Items/DatePicker";
import Forms from "./Items/Forms";
import Radio from "./Items/Radio";
import Upload from "./Items/Upload";
import POver from "./Items/POver";
import Drawer from "./Items/Drawer";
import Modal from "./Items/Modal";
import Notify from "./Items/Notify";
import PopConfirm from "./Items/PopConfirm";

const { Header, Content, Footer, Sider } = Layout;
class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  success = () => {
    message.success("This is a success message");
  };
  render() {
    return (
      <div className={"App"}>
        <ScrollBar>
          <Layout>
            <Layout style={{ zIndex: 200 }}>
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
                  defaultSelectedKeys={["2"]}
                  style={{
                    height: 60,
                    width: 60,
                  }}
                >
                  <Menu.Item
                    key=""
                    onClick={this.toggle}
                    style={{
                      width: 60,
                      margin: 0,
                      height: 60,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: 0,
                      // borderRight: "1px solid var(--border)",
                      background: "var(--foreground)",
                      borderBottom: "1px solid var(--border)",
                    }}
                    icon={<MenuOutlined className={"sider-icon"} />}
                  >
                    Collapse
                  </Menu.Item>
                </Menu>

                <Menu
                  theme="light"
                  mode="inline"
                  defaultSelectedKeys={["0"]}
                  style={{ border: 0 }}
                >
                  <Menu.Item
                    key="0"
                    style={{ background: "var(--foreground)" }}
                  ></Menu.Item>
                  <Menu.Item
                    key="1"
                    icon={<UserOutlined className={"sider-icon"} />}
                  >
                    nav 1
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<VideoCameraOutlined className={"sider-icon"} />}
                  >
                    nav 2
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<UploadOutlined className={"sider-icon"} />}
                  >
                    nav 3
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    icon={<BarChartOutlined className={"sider-icon"} />}
                  >
                    nav 4
                  </Menu.Item>

                  <Menu.ItemGroup
                    // theme="light"
                    // mode="inline"
                    // defaultSelectedKeys={[]}
                    style={{ position: "absolute", bottom: 0, border: 0 }}
                  >
                    <Menu.Item
                      key="5"
                      icon={<CloudOutlined className={"sider-icon"} />}
                    >
                      nav 5
                    </Menu.Item>
                    <Menu.Item
                      key="6"
                      icon={<AppstoreOutlined className={"sider-icon"} />}
                    >
                      nav 6
                    </Menu.Item>
                    <Menu.Item
                      key="7"
                      icon={<TeamOutlined className={"sider-icon"} />}
                    >
                      nav 7
                    </Menu.Item>
                    <Menu.Item
                      key="8"
                      icon={<ShopOutlined className={"sider-icon"} />}
                    >
                      nav 8
                    </Menu.Item>
                    <Menu.Item
                      key="9"
                      icon={<LogoutOutlined className={"sider-icon"} />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu>
              </Sider>
            </Layout>
            <Header
              className="header"
              style={{
                padding: 0,
                height: 60,
                position: "fixed",
                zIndex: 1,
                width: "calc(100% - 60px)",
                backgroundColor: "var(--foreground)",
                left: 60,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "var(--foreground)",
                  borderBottom: "1px solid var(--border)",
                  // flexFlow: 'column'
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  height: 60,
                }}
              >
                <div className={"logo"} />

                <Space size={15} align={"center"}>
                  <Input
                    placeholder="Search"
                    allowClear={false}
                    autoFocus
                    prefix={
                      <SearchOutlined
                        style={{ color: "var(--accent)", fontSize: 18 }}
                      />
                    }
                    onChange={(value) => console.log(value)}
                    // style={{borderRadius: 5, borderColor: 'var(--accent)'}}
                  />
                  <Button type={"link"}>
                    <Badge dot>
                      <NotificationOutlined style={{ fontSize: 18 }} />
                    </Badge>
                  </Button>

                  <Avatar
                    src="https://i.pravatar.cc/300"
                    style={{ marginTop: -5 }}
                  />
                </Space>
              </div>
            </Header>
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: this.state.collapsed ? -200 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <Layout>
                <Sider
                  trigger={null}
                  collapsible
                  theme={"light"}
                  collapsed={this.state.collapsed}
                  style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 60,
                    top: 60,
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
                      style={{ height: "calc(100vh - 64px)" }}
                    >
                      <Menu.ItemGroup
                        title={
                          <span className={"item-group"}>
                            <NumberOutlined /> <span>First</span>
                          </span>
                        }
                      >
                        <Menu.Item key="10" icon={<UploadOutlined />}>
                          nav 3
                        </Menu.Item>
                        <Menu.Item key="11" icon={<BarChartOutlined />}>
                          nav 4
                        </Menu.Item>
                        <Menu.Item key="12" icon={<CloudOutlined />}>
                          nav 5
                        </Menu.Item>
                        <Menu.Item key="13" icon={<AppstoreOutlined />}>
                          nav 6
                        </Menu.Item>
                        <Menu.Item key="14" icon={<TeamOutlined />}>
                          nav 7
                        </Menu.Item>
                        <Menu.Item key="15" icon={<ShopOutlined />}>
                          nav 8
                        </Menu.Item>
                      </Menu.ItemGroup>
                      <Menu.ItemGroup title={"Second"}>
                        <Menu.SubMenu
                          key="sub1"
                          icon={<UserOutlined />}
                          title="subnav 1"
                        >
                          <Menu.Item key="16">option1</Menu.Item>
                          <Menu.Item key="17">option2</Menu.Item>
                          <Menu.Item key="18">option3</Menu.Item>
                          <Menu.Item key="19">option4</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                          key="sub2"
                          icon={<LaptopOutlined />}
                          title="subnav 2"
                        >
                          <Menu.Item key="20">option5</Menu.Item>
                          <Menu.Item key="21">option6</Menu.Item>
                          <Menu.Item key="22">option7</Menu.Item>
                          <Menu.Item key="23">option8</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                          key="sub3"
                          icon={<NotificationOutlined />}
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

            <motion.div
              initial={{ width: `calc(100% - ${260}px)`, x: 260 }}
              animate={{
                width: `calc(100% - ${this.state.collapsed ? 60 : 260}px)`,
                x: this.state.collapsed ? 60 : 260,
              }}
              transition={{ duration: 0.25 }}
              style={{
                padding: 0,
                height: 60,
                position: "fixed",
                zIndex: 1,
                width: "100%",
                backgroundColor: "red",
                top: 60,
                borderBottom: "10px solid red",
              }}
            >
              <PageHeader
                ghost={false}
                title={
                  <span className={"page-header-back"}>
                    <Button type={"link"} onClick={() => this.success()}>
                      <ArrowLeftOutlined style={{ fontSize: 18 }} />
                    </Button>
                    <h3>Payment</h3>
                  </span>
                }
                // subTitle="This is a subtitle"
                extra={[
                  <Button key="1" type="primary" icon={<PlusOutlined />}>
                    Add Payment
                  </Button>,
                ]}
              />
              {/* </div> */}
            </motion.div>
            <motion.div
              initial={{ width: `calc(100% - ${260}px)`, x: 260 }}
              animate={{
                width: `calc(100% - ${this.state.collapsed ? 60 : 260}px)`,
                x: this.state.collapsed ? 60 : 260,
              }}
              transition={{ duration: 0.25 }}
            >
              <Layout
                style={{
                  width: `100%`,
                  // left:this.state.collapsed ? 60 : 260 ,
                  position: "relative",

                  marginTop: 130,
                }}
              >
                <Layout
                  style={{
                    width: `100%`,
                    // left:this.state.collapsed ? 60 : 260 ,
                    position: "relative",
                    // top: 60,
                    padding: "15px",
                  }}
                >
                  <Content
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      // margin: "0 0 30px 30px",
                      minHeight: "100vh",
                      width: "100%",
                      overflow: "auto",
                    }}
                  >
                    {/* <Scrollbar> */}
                    <Space direction={"vertical"} size={32}>
                      <DropDowns />
                      <Btn />
                      <Steps />
                      <Check />
                      <Radio />
                      <DatePicker />
                      <Forms />
                      <Upload />
                      <POver />
                      <Drawer />
                      <Modal />
                      <Notify />
                      <PopConfirm />
                      <BackTop />
                    </Space>
                    {/* </Scrollbar> */}
                  </Content>
                </Layout>
              </Layout>
            </motion.div>
          </Layout>
        </ScrollBar>
      </div>
    );
  }
}

const App = () => {
  return <SiderDemo />;
};

export default App;
