import React from "react";
import PropTypes from "prop-types";
import MDEditor from "@uiw/react-md-editor";

export default function Viewer(props) {
    return (
        <div className="container">
            <MDEditor.Markdown source={props.value} />
        </div>
    );
}

Viewer.propTypes = {
    value: PropTypes.string,
};
