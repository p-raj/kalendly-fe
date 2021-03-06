// https://alampros.github.io/react-confetti/?path=/story/props-demos--knobs
import React, { Component } from "react";
import { Viewer } from "components/markdown";
import { Row, Col, Divider } from "antd";

import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

import data from "./data";
import GuestListHeaderDivider from "components/eventDetails/guestListHeaderDivider";
import GuestList from "components/eventDetails/guestList";
import EventActions from "components/eventDetails/eventActions";

class EventConfirmation extends Component {
    state = {
        data: data.event,
        visitorsTz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        smallScreen: false,
    };

    // https://stackoverflow.com/questions/44480053/how-to-detect-if-screen-size-has-changed-to-mobile-in-react
    componentDidMount = () => {
        window.addEventListener("resize", this.updateWindowDimensions());
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ smallScreen: window.innerWidth < 768 });
    }

    renderTime = (eventStart, eventEnd, hostTZ) => {
        const formatDate = (date, format, tz) => {
            if (tz) {
                return dayjs(date).tz(tz).format(format);
            } else {
                return dayjs(date).format(format);
            }
        };

        const formatTime = (date, format, tz) => {
            if (tz) {
                return dayjs(date).tz(tz).format(format);
            } else {
                return dayjs(date).format(format);
            }
        };

        const dateNode = (
            eventStart,
            eventEnd,
            hostTZ,
            timeFormat,
            dateFormat
        ) => {
            return (
                <div className="grid grid-cols-2">
                    <div>
                        {this.state.visitorsTz}
                        <h4 className={"mb-0"}>
                            {formatDate(eventStart, dateFormat)}
                        </h4>
                        <h3>
                            {formatTime(eventStart, timeFormat)}-
                            {formatTime(eventEnd, timeFormat)}
                        </h3>
                    </div>
                    {hostTZ !== this.state.visitorsTz ? (
                        <div>
                            Organizer&apos;s Time:
                            <div>{hostTZ}</div>
                            <h4 className={"m-0"}>
                                {formatDate(eventStart, dateFormat, hostTZ)}
                            </h4>
                            <h3>
                                {formatTime(eventStart, timeFormat, hostTZ)}-
                                {formatTime(eventEnd, timeFormat, hostTZ)}
                            </h3>
                        </div>
                    ) : null}
                </div>
            );
        };

        // case 1 dates match
        if (dayjs(eventStart).get("date") === dayjs(eventEnd).get("date")) {
            const formatTime = "LT";
            const formatDate = "ddd, MMM D, YYYY";
            return dateNode(
                eventStart,
                eventEnd,
                hostTZ,
                formatTime,
                formatDate
            );
        }
        // case 2 dates dont match | show both dates
        else {
            const formatTime = "LLLL";
            return dateNode(
                eventStart,
                eventEnd,
                hostTZ,
                formatTime,
                formatDate
            );
        }
    };

    renderEventDescription = (description) => {
        return <Viewer value={description} />;
    };

    renderEventActions = () => {
        return <EventActions />;
    };

    renderDivider = () => {
        return <GuestListHeaderDivider />;
    };

    renderGuestDetails = (guestList) => {
        return <GuestList data={guestList} />;
    };

    render() {
        return (
            <Row gutter={{ xs: 0, md: 16 }}>
                <Col span={24}>
                    <h1>{this.state.data.title}</h1>
                </Col>
                {/* General Details */}
                <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                    {/* Event Time */}
                    {this.renderTime(
                        this.state.data.dates.start,
                        this.state.data.dates.end,
                        this.state.data.timezone
                    )}
                    {/* DIVIDER */}
                    <Divider />
                    {/* Description */}
                    {this.renderEventDescription(this.state.data.description)}
                    {/* Event Actions */}
                    {/* DIVIDER */}
                    <Divider />
                    {this.renderEventActions()}
                    {/* DIVIDER */}
                    <Divider />
                </Col>
                {/* Meeting Details */}
                <Col xs={{ span: 24 }} lg={{ span: 14 }} className={"bg-white"}>
                    {this.renderGuestDetails(this.state.data.guests)}

                    {/* GUEST LIST | Name, Email | Timezone | Status */}
                </Col>
            </Row>
        );
    }
}

export default EventConfirmation;
