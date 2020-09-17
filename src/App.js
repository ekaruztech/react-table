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
} from "antd";
import "./App.css";
import "./custom-theme.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import 'remixicon/fonts/remixicon.css';
import Scrollbar from "react-perfect-scrollbar";
import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import ScrollBar from "react-perfect-scrollbar";
import {ambientTheme, defaultTheme} from "./themes";
import ApplicationModules from './ApplicationLayout/ApplicationModules';
import ApplicationSubModules from './ApplicationLayout/ApplicationSubModules';
import ContentHeader from './ApplicationLayout/ContentHeader';
import PageContent from './ApplicationLayout/PageContent';
import Modules from './Modules';
// import './example.less';

const { Header, Content, Footer, Sider } = Layout;
class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    theme: 'light'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  success = () => {
    message.success("This is a success message");
  };
  setCSSVariables = theme => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  };

  changeTheme = themeName => {

    switch (themeName) {
      case 'light':
        this.setCSSVariables(ambientTheme);
        this.setState((prev) => ({...prev, theme: 'ambient'}));
        break;
      case 'ambient':
        this.setCSSVariables(defaultTheme);
        this.setState((prev) => ({...prev, theme: 'light'}));
        break;
      default:
        this.setCSSVariables(defaultTheme);
        break;
    }
  }
  render() {
    return (
      <div className={"App"}>
        <ScrollBar>
          <Layout>
            <ApplicationModules changeTheme={this.changeTheme} theme={this.state.theme} toggleSubMenu={this.toggle} />
            <Header
              className="header"
              style={{
                padding: 0,
                height: 60,
                position: "fixed",
                zIndex: 1,
                width: "calc(100% - 60px)",
                backgroundColor: "var(--background-primary)",
                left: 60,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "var(--background-primary)",
                  borderBottom: "1px solid var(--border)",
                  // flexFlow: 'column'
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  height: 60,
                }}
              >
                <div className={"logo"}>Transit</div>

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
            <ApplicationSubModules collasped={this.state.collapsed}/>
            <ContentHeader shrink={this.state.collapsed} headerTitle={'Home'} enableBackArrow headerActions={[
              <Button key="1" type="primary" icon={<PlusOutlined />}>
                Add Payment
              </Button>,
            ]} />
            <PageContent shrink={this.state.collapsed}>
              <Modules />
            </PageContent>
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
