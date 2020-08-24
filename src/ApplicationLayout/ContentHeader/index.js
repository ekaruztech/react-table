import React from 'react';
import {motion} from "framer-motion";
import {Button, Layout, PageHeader} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';

export default (props) => {
    const {pageTitle, shrink, enableBackArrow, headerActions} = props;
    return <motion.div
        initial={{width: `calc(100% - ${260}px)`, x: 260}}
        animate={{
            width: `calc(100% - ${shrink ? 60 : 260}px)`,
            x: shrink ? 60 : 260,
        }}
        transition={{duration: 0.15}}
        style={{
            padding: 0,
            height: 60,
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "red",
            top: 60,
            // borderBottom: "10px solid red",
        }}
    >
        <PageHeader
            ghost={false}
            title={
                <span className={"page-header-back"}>
                   {enableBackArrow && <ArrowLeftOutlined
                       onClick={() => null}
                       style={{fontSize: 18, paddingRight: 15}}
                   />}

                    <h3>{pageTitle || 'Home'}</h3>
                  </span>
            }
            // subTitle="This is a subtitle"
            extra={headerActions}
        />
        {/* </div> */}
    </motion.div>
}