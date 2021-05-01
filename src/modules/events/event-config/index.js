import React, { Component } from "react";

import { Row, Col, Divider, Input, Switch, Button } from "antd";

// TODO: move out to components
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import data from "./data";

class EventConfig extends Component {
    state = {
        data: data,
    };

    renderTitle = (title) => {
        return <Input value={title} />;
    };

    renderEditor = (description) => {
        return (
            <div className="bg-white">
                <Editor />
            </div>
        );
    };

    renderLocation = (location) => {
        return <Input value={location.title} />;
    };

    renderActions = () => {
        return (
            <div className="grid grid-cols-2 gap-16 divide-x divide-green-500">
                <div>
                    <Button type="link">Link to the Live Page</Button>
                    <Input value={"link"} />
                </div>
                <div>
                    <p>Event Status</p>
                    <Switch
                        checkedChildren="Enabled"
                        unCheckedChildren="Disabled"
                    />
                </div>
            </div>
        );
    };

    render() {
        return (
            <Row gutter={{ xs: 0, md: 16 }}>
                {/* General Details */}
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                    {/* Title */}
                    {this.renderTitle(this.state.data.event.title)}
                    {/* DIVIDER */}
                    <Divider />
                    {this.renderEditor(this.state.data.event.description)}
                    {/* DIVIDER */}
                    <Divider />
                    {/* Location */}
                    {this.renderLocation(this.state.data.event.location)}
                    {/* DIVIDER */}
                    <Divider />
                    {/* Actions */}
                    {this.renderActions()}
                    {/* DIVIDER */}
                    <Divider />
                </Col>
                {/* Meeting Details */}
                <Col xs={{ span: 24 }} md={{ span: 16 }} className={"bg-white"}>
                    {/* CONFIG */}
                </Col>
            </Row>
        );
    }
}

export default EventConfig;
