import React from "react";
import PropTypes from "prop-types";

import { Select } from "antd";
import validationChecker from "./utils/validations";

const { Option } = Select;

const KSelect = ({ id, value, status, options, validations }) => {
    const renderOptions = () => {
        return options.map((option) => (
            <Option key={option.key} value={option.value}>
                {option.key}
            </Option>
        ));
    };

    function onChange(value) {
        const isValid = validationChecker(validations, value);
        if (!isValid) {
            console.error("Selection is invalid");
        }
    }

    return (
        <Select
            className={"w-full"}
            defaultValue={value}
            key={id}
            disabled={status}
            onChange={onChange}>
            {renderOptions()}
        </Select>
    );
};

KSelect.propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    validations: PropTypes.array,
};

export default KSelect;
