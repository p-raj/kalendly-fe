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
import chooseElement from "components/form";

const { Option } = Select;

class EventConfig extends Component {
    state = {
        data: data,
        configDrawer: {
            visible: false,
            title: "",
            elements: [],
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
                <Option value={15}>15 Minutes</Option>
                <Option value={30}>30 Minutes</Option>
                <Option value={45}>45 Minutes</Option>
                <Option value={60}>60 Minutes</Option>
                <Option value={null} disabled>
                    Custom Duration
                </Option>
            </>
        );
        return (
            <>
                <h3>{"Event Settings"}</h3>
                <div className="grid grid-cols-5">
                    <div className="col-span-2">
                        <Select
                            className={"w-full"}
                            onChange={this.onMeetingDurationChange}
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
                        <p>Event Status</p>
                        <Switch
                            checkedChildren="Enabled"
                            unCheckedChildren="Disabled"
                            checked
                        />
                    </div>
                </div>
            </>
        );
    };

    renderConfigElements = (elements) => {
        console.log(elements);
        return elements.map((element, index) => (
            <div key={index}>
                {element.title}
                {chooseElement(element.type, element)}
                <Divider />
            </div>
        ));
    };

    renderConfigCard = (id, title, description, options, status) => {
        return (
            <>
                <Card
                    title={title}
                    extra={
                        status === "enabled" ? (
                            <Button
                                type={"link"}
                                onClick={() =>
                                    this.onBeforeConfigDrawerOpen(
                                        title,
                                        options
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

    renderRules = (rules) => {
        return this.renderConfigCard(
            "rules",
            "Booking Rules",
            "Rules for the booking",
            rules,
            "enabled"
        );
    };

    renderPlugins = (plugins) => {
        return plugins.map((plugin, index) => (
            <div key={index}>
                {this.renderConfigCard(
                    plugin.id,
                    plugin.title,
                    plugin.description,
                    plugin.options,
                    plugin.status
                )}
            </div>
        ));
    };

    // DRAWER
    onBeforeConfigDrawerOpen = (title, elements) => {
        this.setState(
            {
                configDrawer: {
                    title: title,
                    elements: elements,
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
                        {this.renderConfigElements(
                            this.state.configDrawer.elements
                        )}
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
