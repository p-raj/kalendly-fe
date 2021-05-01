import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Card } from "antd";

import data from "./data";

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
                <Link
                    key={index}
                    to={`${this.props.routerProps.match.url}${event.id}/`}>
                    <Card title={event.title} key={index}>
                        <p>{event.description}</p>
                    </Card>
                </Link>
            );
        });
    };

    render() {
        console.log(this.props);
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
