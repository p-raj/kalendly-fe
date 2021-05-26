import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
    Drawer,
    Row,
    Col,
    Divider,
    Input,
    Switch,
    Button,
    Card,
    Select,
} from "antd";

import { EditOutlined } from "@ant-design/icons";

import { Editor } from "components/markdown";

import data from "./data";
import { renderConfigElements } from "./utils";
import InviteeForm from "./invitee-form";

const { Option } = Select;

const CONFIG_PLUGIN_MODULE = { "invitee-form": InviteeForm };

class EventConfig extends Component {
    state = {
        data: data,
        configDrawer: {
            visible: false,
            title: "",
            elements: [],
            pluginModule: null,
        },
    };

    renderTitle = (title) => {
        return (
            <div>
                <h1>{"Event Title"}</h1>
                <Input value={title} />
            </div>
        );
    };

    renderEditor = (description) => {
        return (
            <div>
                <h1>{"Event Description"}</h1>
                <Editor value={description} />
            </div>
        );
    };

    renderLocation = (location) => {
        return (
            <>
                <h1>{"Event Location"}</h1>
                <Input value={location.title} />
            </>
        );
    };

    // TODO: move to a dedicated component
    onMeetingDurationChange = (e) => {
        const data = this.state.data;
        const event = data.event;
        this.setState({
            data: { ...data, event: { ...event, duration: e } },
        });
    };

    renderActions = () => {
        const options = (
            <>
                <Option value={15}>15 Mins</Option>
                <Option value={30}>30 Mins</Option>
                <Option value={45}>45 Mins</Option>
                <Option value={60}>60 Mins</Option>
                <Option value={null} disabled>
                    Custom Duration
                </Option>
            </>
        );
        return (
            <>
                <h1>{"Event Settings"}</h1>
                <div className="grid grid-cols-5">
                    <div className="col-span-2">
                        <Select
                            className={"w-full"}
                            onChange={this.onMeetingDurationChange}
                            defaultValue={this.state.data.event.duration}
                            defaultActiveFirstOption>
                            {options}
                        </Select>
                        <p></p>
                        <p>Event Duration: {this.state.data.event.duration}</p>
                    </div>
                    {/* DIVIDER */}
                    <div className="col-span-1 block h-full w-1/2 border-t-0 border-b-0 border-l-0 border-gray-300 border-r border-solid"></div>
                    <div className="col-span-2">
                        <p>
                            {/* Event Link - ToDo */}
                            {/*<Input placeholder={"link"} defaultValue={"Meet Me"} /> */}
                            <Link
                                to={`${this.props.routerProps.match.url}/`}
                                target="_blank">
                                {"Open Live Page"}
                            </Link>
                        </p>
                        <p>{"Event Status"}</p>
                        <Switch
                            checkedChildren="Enabled"
                            unCheckedChildren="Disabled"
                            defaultChecked
                        />
                    </div>
                </div>
            </>
        );
    };

    renderConfigModule = () => {
        const ConfigPluginModule =
            CONFIG_PLUGIN_MODULE[this.state.configDrawer.pluginModule];
        const elements = this.state.configDrawer.elements;
        return (
            <>
                {ConfigPluginModule ? (
                    <ConfigPluginModule elements={elements} />
                ) : (
                    renderConfigElements(elements)
                )}
            </>
        );
    };

    renderConfigCard = (
        id,
        title,
        description,
        options,
        isEnabled,
        pluginModule
    ) => {
        return (
            <>
                <Card
                    title={title}
                    extra={
                        isEnabled ? (
                            <Button
                                type={"link"}
                                onClick={() =>
                                    this.onBeforeConfigDrawerOpen(
                                        title,
                                        options,
                                        pluginModule
                                    )
                                }>
                                <EditOutlined />
                            </Button>
                        ) : (
                            "WIP"
                        )
                    }>
                    <p>{description}</p>
                </Card>
                {/* DIVIDER */}
                <Divider />
            </>
        );
    };

    renderEventRuleConfigCard = (rules) => {
        return this.renderConfigCard(
            "rules",
            "Booking Rules",
            "Rules for the booking",
            rules,
            true,
            null
        );
    };

    renderEventPluginConfigCard = (plugins) => {
        return plugins.map((plugin, index) => (
            <div key={index}>
                {this.renderConfigCard(
                    plugin.id,
                    plugin.title,
                    plugin.description,
                    plugin.options,
                    plugin.enabled,
                    plugin.module
                )}
            </div>
        ));
    };

    // DRAWER
    onBeforeConfigDrawerOpen = (title, elements, configPluginModule) => {
        console.log(elements, configPluginModule);
        this.setState(
            {
                configDrawer: {
                    title: title,
                    elements: elements,
                    pluginModule: configPluginModule,
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
                elements: [],
                pluginModule: null,
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
                    {this.renderEventRuleConfigCard(
                        this.state.data.event.rules
                    )}
                    {/* Event Plugins */}
                    {this.renderEventPluginConfigCard(this.state.data.plugins)}
                    {/* Config Drawer */}
                    <Drawer
                        title={this.state.configDrawer.title}
                        placement={window.innerWidth < 768 ? "bottom" : "right"}
                        width={
                            window.innerWidth > 480
                                ? window.innerWidth * 0.5
                                : window.innerWidth
                        }
                        height={
                            window.innerWidth > 480
                                ? window.innerHeight
                                : window.innerHeight * 0.9
                        }
                        closable={true}
                        onClose={this.onConfigDrawerClose}
                        visible={this.state.configDrawer.visible}>
                        {this.renderConfigModule()}
                    </Drawer>
                </Col>
            </Row>
        );
    }
}

EventConfig.propTypes = {
    routerProps: PropTypes.object,
};

export default EventConfig;
