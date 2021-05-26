import React from "react";

import { Divider } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

import chooseElement from "components/form";

export const renderConfigElements = (
    elements,
    editMode = false,
    onDelete = null
) => {
    return elements.map((element, index) => (
        <div key={index}>
            <div className={"flex gap-2"}>
                <div className={"flex-grow order-2"}>{element.title}</div>
                {editMode ? (
                    <div
                        className={
                            "flex-grow-0 cursor-pointer fill-current text-red-400"
                        }
                        data-tag={element.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDelete(e);
                        }}>
                        <DeleteOutlined />
                    </div>
                ) : null}
            </div>
            {chooseElement(element.type, element)}
            <Divider />
        </div>
    ));
};
