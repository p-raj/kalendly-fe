import React, { useState } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";

import { Button, Select, Input, Row, Col } from "antd";
const { Option } = Select;

import { renderConfigElements } from "../utils";

const SUPPORTED_FORM_ELEMENTS = [
    { title: "Single Line Short Answers", value: "input" },
    { title: "Multi Line Descriptive Answers", value: "textarea" },
];

const InviteeForm = (props) => {
    const [isEditMode, setEditMode] = useState(false);
    const [formElements, setFormElements] = useState(props.elements);
    const [shouldPrepareNewElement, setPrepareNewElement] = useState(false);
    const [newElement, setNewElement] = useState({
        enabled: true,
        type: "input",
    });

    const toggleEditMode = () => {
        setEditMode(!isEditMode);
    };

    const saveNewElement = () => {
        setFormElements([...formElements, newElement]);
        setNewElement({ enabled: true, type: "input" });
    };

    const removeFormElement = (event) => {
        const removeThisId = event.currentTarget.getAttribute("data-tag");
        setFormElements([
            ...formElements.filter((element) => element.id != removeThisId),
        ]);
    };

    // add a new form element
    // TODO - move to a dedicated module
    const renderAddNewElement = () => {
        return (
            <div className={"grid grid-cols-2 gap-8"}>
                <Button onClick={toggleEditMode}>
                    {isEditMode ? "Done" : "Add"}
                </Button>
                {isEditMode ? (
                    <Button onClick={saveNewElement}>{"Save"}</Button>
                ) : null}
            </div>
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
            <div className={"mt-4"}>
                {"Select Form Input Type"}
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
        setPrepareNewElement(true);
        setNewElement({ ...newElement, type: value, id: v4() });
    };

    const renderCaptureNewElementProperties = () => {
        return (
            <div className={"p-4 bg-gray-50"}>
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
            </div>
        );
    };
    //
    return (
        <>
            {renderConfigElements(formElements, true, removeFormElement)}
            {renderAddNewElement()}
            <Row>
                <Col span={24}>
                    {isEditMode ? renderNewElementPlaceholder() : null}
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {shouldPrepareNewElement && isEditMode
                        ? renderCaptureNewElementProperties()
                        : null}
                </Col>
            </Row>
        </>
    );
};

InviteeForm.propTypes = {
    elements: PropTypes.array,
};

export default InviteeForm;
