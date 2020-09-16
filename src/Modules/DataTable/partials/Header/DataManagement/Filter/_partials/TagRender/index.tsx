import {Tag} from "antd";
import React from "react";

type TagRenderProps = {
    label: string,
    closable: boolean,
    onClose: Function
}
export default (props: Required<TagRenderProps |  any>) => {
    const { label, closable, onClose } = props;

    return (
        <Tag
            color={"magenta"}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    );
};