import React from "react";

import { Divider } from "antd";

import chooseElement from "components/form";

export const renderConfigElements = (
    elements,
    editMode = false,
    onDelete = null
) => {
    return elements.map((element, index) => (
        <div key={index}>
            <div>
                {element.title}
                {editMode ? (
                    <span
                        className={"cursor-pointer"}
                        data-tag={element.id}
                        onClick={(e) => {
                            onDelete(e);
                        }}>
                        {"delete"}
                    </span>
                ) : null}
            </div>
            {chooseElement(element.type, element)}
            <Divider />
        </div>
    ));
};
