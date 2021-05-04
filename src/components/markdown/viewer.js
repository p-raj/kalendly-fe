import React from "react";
import PropTypes from "prop-types";
import MDEditor from "@uiw/react-md-editor";

export default function Viewer(props) {
    const [value, setValue] = React.useState(props.value);
    return (
        <div className="container">
            <MDEditor.Markdown source={value} />
        </div>
    );
}

Viewer.propTypes = {
    value: PropTypes.string,
};
