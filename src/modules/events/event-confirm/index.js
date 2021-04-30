// https://alampros.github.io/react-confetti/?path=/story/props-demos--knobs
import React, { Component } from "react";

import { Row, Col, Button, Divider } from "antd";

import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

import data from "./data";

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
                <>
                    <div>{this.state.visitorsTz}</div>
                    <h4 className={"mb-0"}>
                        {formatDate(eventStart, dateFormat)}
                    </h4>
                    <h3>
                        {formatTime(eventStart, timeFormat)}-
                        {formatTime(eventEnd, timeFormat)}
                    </h3>
                    {hostTZ !== this.state.visitorsTz ? (
                        <>
                            <h3>Organizer&apos;s Time:</h3>
                            <div>{hostTZ}</div>
                            <h4 className={"m-0"}>
                                {formatDate(eventStart, dateFormat, hostTZ)}
                            </h4>
                            <h3>
                                {formatTime(eventStart, timeFormat, hostTZ)}-
                                {formatTime(eventEnd, timeFormat, hostTZ)}
                            </h3>
                        </>
                    ) : null}
                </>
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
        return <p>{description}</p>;
    };

    renderEventActions = () => {
        return (
            <div className="grid grid-cols-1 grid-flow-row gap-2">
                <Button>{"Reschedule"}</Button>
                <Button>{"Cancel"}</Button>
            </div>
        );
    };

    renderGuestDetails = (guestList) => {
        const headers = {
            name: "Name",
            email: "Email",
            timezone: "Timezome",
            status: "Availability Status",
        };

        if (!this.state.smallScreen) {
            return (
                <div className="grid grid-cols-4 gap-4 px-16 py-10">
                    <h3>{headers.name}</h3>
                    <h3>{headers.email}</h3>
                    <h3>{headers.timezone}</h3>
                    <h3>{headers.status}</h3>
                    {guestList.map((guest) => {
                        return (
                            <>
                                <div>{guest.name}</div>
                                <div>{guest.email}</div>
                                <div>{guest.timezone}</div>
                                <div>{guest.status}</div>
                            </>
                        );
                    })}
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-2 gap-4 px-4 py-4">
                    {guestList.map((guest) => {
                        return (
                            <>
                                <h3>{headers.name}</h3> <div>{guest.name}</div>
                                <h3>{headers.email}</h3>{" "}
                                <div>{guest.email}</div>
                                <h3>{headers.timezone}</h3>{" "}
                                <div>{guest.timezone}</div>
                                <h3>{headers.status}</h3>
                                <div>{guest.status}</div>
                                <div className="w-full border-gray-100 border-0 border-b border-solid"></div>
                                <div className="w-full border-gray-100 border-0 border-b border-solid"></div>
                            </>
                        );
                    })}
                </div>
            );
        }
    };

    render() {
        return (
            <Row gutter={{ xs: 0, md: 16 }}>
                <Col span={24}>
                    <h1>{this.state.data.title}</h1>
                </Col>
                {/* General Details */}
                <Col xs={{ span: 24 }} md={{ span: 4 }}>
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
                <Col xs={{ span: 24 }} md={{ span: 20 }} className={"bg-white"}>
                    {this.renderGuestDetails(this.state.data.guests)}

                    {/* GUEST LIST | Name, Email | Timezone | Status */}
                </Col>
            </Row>
        );
    }
}

export default EventConfirmation;
