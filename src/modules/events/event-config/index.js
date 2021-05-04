import React, { Component } from "react";

import { Drawer, Row, Col, Divider, Input, Switch, Button, Card } from "antd";

// TODO: move out to components
import { Editor } from "components/markdown";

import data from "./data";

class EventConfig extends Component {
    state = {
        data: data,
        configDrawer: {
            visible: false,
            title: "",
            options: [],
        },
    };

    renderTitle = (title) => {
        return (
            <div>
                <h3>{"Event Title"}</h3>
                <Input value={title} />
            </div>
        );
    };

    renderEditor = (description) => {
        return (
            <div>
                <h3>{"Event Description"}</h3>
                <Editor value={description} />
            </div>
        );
    };

    renderLocation = (location) => {
        return (
            <>
                <h3>{"Event Location"}</h3>
                <Input value={location.title} />
            </>
        );
    };

    renderActions = () => {
        return (
            <>
                <h3>{"Event Settings"}</h3>
                <div className="grid grid-cols-5">
                    <div className="col-span-2">
                        <Button type="link">Link to the Live Page</Button>
                        <Input value={"link"} />
                    </div>
                    {/* DIVIDER */}
                    <div className="col-span-1 block h-full w-1/2 border-t-0 border-b-0 border-l-0 border-gray-300 border-r border-solid"></div>
                    <div className="col-span-2">
                        <p>Event Status</p>
                        <Switch
                            checkedChildren="Enabled"
                            unCheckedChildren="Disabled"
                        />
                    </div>
                </div>
            </>
        );
    };

    renderConfigOptions = (options) => {
        return options.map((option, index) => (
            <div key={index}>
                {option.title}
                <Input value={option.value} />
            </div>
        ));
    };

    renderConfigCard = (id, title, description, options) => {
        return (
            <>
                <Card
                    title={title}
                    extra={
                        <Button
                            type={"link"}
                            onClick={() =>
                                this.onBeforeConfigDrawerOpen(title, options)
                            }>
                            {"View & Edit"}
                        </Button>
                    }>
                    <p>{description}</p>
                </Card>
                {/* DIVIDER */}
                <Divider />
            </>
        );
    };

    renderRules = (rules) => {
        return this.renderConfigCard(
            "rules",
            "Booking Rules",
            "Rules for the booking",
            rules
        );
    };

    renderPlugins = (plugins) => {
        return plugins.map((plugin, index) => (
            <div key={index}>
                {this.renderConfigCard(
                    plugin.id,
                    plugin.title,
                    plugin.description,
                    plugin.options
                )}
            </div>
        ));
    };

    // DRAWER
    onBeforeConfigDrawerOpen = (title, options) => {
        this.setState(
            {
                configDrawer: {
                    title: title,
                    options: options,
                },
            },
            () => {
                this.setState({
                    configDrawer: { ...this.state.configDrawer, visible: true },
                });
            }
        );
    };

    onConfigDrawerClose = () => {
        this.setState({
            configDrawer: {
                visible: false,
                title: "",
                options: [],
            },
        });
    };
    // DRAWER

    render() {
        return (
            <Row gutter={{ xs: 0, md: 16 }}>
                {/* General Details */}
                <Col xs={{ span: 24 }} md={{ span: 10 }}>
                    {/* Title */}
                    {this.renderTitle(this.state.data.event.title)}
                    {/* DIVIDER */}
                    <Divider />
                    {this.renderEditor(this.state.data.event.description)}
                    {/* DIVIDER */}
                    <Divider />
                    {/* Location */}
                    {this.state.data.event.locations.plugins.map(
                        (location, index) => (
                            <div key={index}>
                                {this.renderLocation(location, index)}
                            </div>
                        )
                    )}
                    {/* DIVIDER */}
                    <Divider />
                    {/* Actions */}
                    {this.renderActions()}
                    {/* DIVIDER */}
                    <Divider />
                </Col>
                {/* Meeting Details */}
                <Col xs={{ span: 24 }} md={{ span: 14 }}>
                    {/* Event Booking Rules */}
                    {this.renderRules(this.state.data.event.rules)}
                    {/* Event Plugins */}
                    {this.renderPlugins(this.state.data.plugins)}
                    {/* Config Drawer */}
                    <Drawer
                        title={this.state.configDrawer.title}
                        placement={"bottom"}
                        closable={true}
                        onClose={this.onConfigDrawerClose}
                        visible={this.state.configDrawer.visible}>
                        {this.renderConfigOptions(
                            this.state.configDrawer.options
                        )}
                    </Drawer>
                </Col>
            </Row>
        );
    }
}

export default EventConfig;
