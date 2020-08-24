import React from 'react';
import {BackTop, Space, Layout} from "antd";
import DropDowns from "../../Items/DropDowns";
import Btn from "../../Items/Btn";
import Tags from "../../Items/Tags";
import Steps from "../../Items/_Steps";
import Check from "../../Items/Check";
import Radio from "../../Items/Radio";
import DatePicker from "../../Items/DatePicker";
import Forms from "../../Items/Forms";
import Upload from "../../Items/Upload";
import POver from "../../Items/POver";
import Drawer from "../../Items/Drawer";
import Modal from "../../Items/Modal";
import Notify from "../../Items/Notify";
import PopConfirm from "../../Items/PopConfirm";
import Collapsible from "../../Items/Collapsible";

const {Content} = Layout;
export default () => {
    return <Content>
        <Space direction={"vertical"} size={32}>
            <DropDowns/>
            <Btn/>
            <Tags/>
            <Steps/>
            <Check/>
            <Radio/>
            <DatePicker/>
            <Forms/>
            <Upload/>
            <POver/>
            <Drawer/>
            <Modal/>
            <Notify/>
            <PopConfirm/>
            <Collapsible/>
            <BackTop/>
        </Space></Content>
}