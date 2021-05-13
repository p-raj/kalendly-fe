import React from "react";
import PropTypes from "prop-types";
import MDEditor from "@uiw/react-md-editor";

export default function Editor(props) {
    const [value, setValue] = React.useState(props.value);
    return (
        <div className="container">
            <MDEditor value={value} onChange={setValue} preview={"edit"} />
        </div>
    );
}

Editor.propTypes = {
    value: PropTypes.string,
};
