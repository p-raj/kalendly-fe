import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

import { Button, Select, Input } from "antd";
const { Option } = Select;

import { renderConfigElements } from "../utils";

const SUPPORTED_FORM_ELEMENTS = [
    { title: "Input", value: "input", render: Input },
];

const InviteeForm = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [formElements, setFormElements] = useState(props.elements);
    const [shouldPrepareNewElement, setPrepareNewElement] = useState(false);
    const [newElement, setNewElement] = useState({ enabled: true });

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    };

    const toggleShouldPrepareNewElement = () => {
        setPrepareNewElement(!shouldPrepareNewElement);
    };

    const saveNewElement = () => {
        setFormElements([...formElements, newElement]);
        setNewElement({ enabled: true });
        toggleEditMode();
        toggleShouldPrepareNewElement();
    };

    const removeFormElement = (event) => {
        const removeThisId = event.target.getAttribute("data-tag");
        setFormElements([
            ...formElements.filter((element) => element.id != removeThisId),
        ]);
    };

    // add a new form element
    // TODO - move to a dedicated module
    const renderAddNewElement = () => {
        return (
            <>
                <Button onClick={toggleEditMode}>{"Add"}</Button>
                {isEditMode ? (
                    <Button onClick={saveNewElement}>{"Save"}</Button>
                ) : null}
            </>
        );
    };

    const renderFormElementOptions = () => {
        return SUPPORTED_FORM_ELEMENTS.map((option, index) => (
            <Option key={index} value={option.value}>
                {option.title}
            </Option>
        ));
    };

    const renderNewElementPlaceholder = () => {
        return (
            <div>
                <Select className={"w-full"} onChange={onSelectNewElement}>
                    {renderFormElementOptions()}
                </Select>
            </div>
        );
    };

    // new element addition
    const onChangeElementDescription = (event, elementProp) => {
        setNewElement({
            ...newElement,
            [elementProp]: event.target.value,
        });
    };

    const onSelectNewElement = (value) => {
        toggleShouldPrepareNewElement();
        setNewElement({ ...newElement, type: value, id: v4() });
    };

    const renderCaptureNewElementProperties = () => {
        return (
            <>
                {"Title"}
                <Input
                    onChange={(e) => onChangeElementDescription(e, "title")}
                    value={newElement["title"]}
                />
                {"Description"}
                <Input
                    onChange={(e) =>
                        onChangeElementDescription(e, "description")
                    }
                    value={newElement["description"]}
                />
            </>
        );
    };
    //
    return (
        <>
            {renderConfigElements(formElements, true, removeFormElement)}
            {renderAddNewElement()}
            {isEditMode ? renderNewElementPlaceholder() : null}
            {shouldPrepareNewElement
                ? renderCaptureNewElementProperties()
                : null}
        </>
    );
};

InviteeForm.propTypes = {
    elements: PropTypes.array,
};

export default InviteeForm;
