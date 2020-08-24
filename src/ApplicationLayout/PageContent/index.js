import React from 'react';
import {motion} from "framer-motion";
import {Layout} from "antd";
import ScrollBar from "react-perfect-scrollbar";

const {Content} = Layout;
export default (props) => {
    const {children, shrink} = props;
    return <motion.div
        initial={{width: `calc(100% - ${260}px)`, x: 260}}
        animate={{
            width: `calc(100% - ${shrink ? 60 : 260}px)`,
            x: shrink ? 60 : 260,
        }}
        transition={{duration: 0.15}}
    >
        <Layout
            style={{
                width: `100%`,
                // left:shrink ? 60 : 260 ,
                position: "relative",
                marginTop: 120,
                padding: "15px 15px 0 15px",
                overflowX: 'hidden'
            }}
        >
        <Layout
            style={{
                width: `100%`,
                // left:shrink ? 60 : 260 ,
                position: "relative",
                overflowX: 'hidden'
            }}
        >
            <Content
                className="site-layout-background"
                style={{
                    // padding: 24,
                    // margin: "0 0 30px 30px",
                    minHeight: "100vh",
                    width: "100%",
                    overflowX: 'hidden',
                }}
            >
                {children}
            </Content>
        </Layout>
        </Layout>
    </motion.div>
};