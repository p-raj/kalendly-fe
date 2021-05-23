import React from "react";

import PropTypes from "prop-types";

import { Input, Radio, Row, Col } from "antd";
const { TextArea } = Input;

import Select from "./select";

const chooseElement = (elementType, elementOptions) => {
    const {
        id,
        value,
        description,
        status,
        options,
        validations,
    } = elementOptions;

    let returnElement = <></>;

    switch (elementType) {
        case "input":
            returnElement = (
                <Input
                    allowClear
                    placeholder={description}
                    defaultValue={value}
                    id={id}
                />
            );
            break;
        case "textarea":
            returnElement = (
                <TextArea
                    allowClear
                    placeholder={description}
                    defaultValue={value}
                    id={id}
                />
            );
            break;
        case "radio":
            returnElement = <Radio.Group optionType="button" />;
            break;
        case "select":
            console.log("CHOOSE | SELECT | ", options);
            returnElement = (
                <Select
                    status={status}
                    id={id}
                    options={options}
                    value={value}
                    validations={validations}
                />
            );
            break;
        default:
            returnElement = <>{"Not Supported"}</>;
            break;
    }

    return (
        <Row>
            <Col xs={{ span: 24, order: 3 }} md={{ span: 10, order: 1 }}>
                {returnElement}
            </Col>
            <Col
                xs={{ span: 24, order: 2 }}
                md={{ span: 4, order: 2 }}
                className="h-4">
                {/* DIVIDER */}
            </Col>
            <Col xs={{ span: 24, order: 1 }} md={{ span: 10, order: 3 }}>
                {description}
            </Col>
        </Row>
    );
};

chooseElement.propTypes = {
    elementType: PropTypes.string.isRequired,
    elementOptions: PropTypes.object.isRequired,
};

export default chooseElement;
