import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Card } from "antd";
import { SettingOutlined, LinkOutlined } from "@ant-design/icons";

import data from "./data";

const { Meta } = Card;

class EventLinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: data.events,
        };
    }

    renderEventList = () => {
        return this.state.eventList.map((event, index) => {
            return (
                <Card
                    key={index}
                    actions={[
                        <Link
                            key={index}
                            to={`${this.props.routerProps.match.url}${event.id}/my-way/`}>
                            <SettingOutlined key="setting" />
                        </Link>,
                        <Link
                            key={index}
                            to={`${this.props.routerProps.match.url}${event.id}/`}>
                            <LinkOutlined key="edit" />
                        </Link>,
                    ]}>
                    <Meta title={event.title} description={event.description} />
                </Card>
            );
        });
    };

    render() {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
                {this.renderEventList()}
            </div>
        );
    }
}

EventLinkList.propTypes = {
    routerProps: PropTypes.object,
};

export default EventLinkList;
