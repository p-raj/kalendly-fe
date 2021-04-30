import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Card } from "antd";

import data from "./data";

class EventLinkList extends Component {
    state = {
        eventList: data.events,
    };

    renderEventList = () => {
        return this.state.eventList.map((event, index) => {
            return (
                <Link key={index} to={`/events/${event.id}/`}>
                    <Card title={event.title} key={index}>
                        <p>{event.description}</p>
                    </Card>
                </Link>
            );
        });
    };

    render() {
        // console.log(this.props);
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4">
                {this.renderEventList()}
            </div>
        );
    }
}

export default EventLinkList;
