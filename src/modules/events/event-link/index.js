import React, { Component } from "react";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import { Row, Col, List, Button, Calendar, Radio, Divider } from "antd";

import data from "./data";
import { getAvailableSlots } from "./utils";

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// TODO: Move out to constants
const AVAILABILITY_STATUS = "available";
const UNAVAILABILITY_STATUS = "unavailable";

const MORNING_HOURS = "morning";
const EVENING_HOURS = "evening";

const PREFERRED_MEETING_HOURS = [
    { label: "Morning", value: MORNING_HOURS },
    { label: "Evening", value: EVENING_HOURS },
];

const WAIT_TIME_BEFORE_API_CALL = 5 * 1000; //seconds

class EventLink extends Component {
    // used to capture the settimeout function
    apiTimer = null;
    // state
    state = {
        selectedDate: dayjs.utc(),
        availableSlots: [],
        selectedSlot: null,
        showFullCalendar: false,
        preferredMeetingHours: null,
        visitorsTz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hasConfirmedMeeting: false,
    };

    fetchData = (selectedDate) => {
        const key = selectedDate.format("YYYY-MM-DD");
        const selectedDateData = data.dates[key];
        let calcAvailableSlots = this.state.availableSlots;
        if (selectedDateData.status === AVAILABILITY_STATUS) {
            const b = selectedDateData.availability.map((slot) =>
                getAvailableSlots(slot[0], slot[1], data.event.duration)
            );
            calcAvailableSlots.push(b.flat());
        }
        this.setState({
            availableSlots: calcAvailableSlots.flat(),
        });
    };

    componentDidMount = () => {
        this.fetchData(this.state.selectedDate);
        // https://stackoverflow.com/questions/44480053/how-to-detect-if-screen-size-has-changed-to-mobile-in-react
        window.addEventListener("resize", this.updateWindowDimensions());
    };
    // https://stackoverflow.com/questions/44480053/how-to-detect-if-screen-size-has-changed-to-mobile-in-react
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
        // clearout any timers
        if (this.apiTimer !== null) {
            window.clearTimeout(this.apiTimer);
        }
    }
    // https://stackoverflow.com/questions/44480053/how-to-detect-if-screen-size-has-changed-to-mobile-in-react
    updateWindowDimensions() {
        this.setState({ showFullCalendar: window.innerWidth > 768 });
    }

    // LIST RELATED PROPERTIES & FUNCTIONS | TODO: move out as a separate component
    onDateSelect = (selectedDate) => {
        this.setState(
            {
                selectedDate: selectedDate,
                availableSlots: [],
            },
            () => {
                this.fetchData(selectedDate);
            }
        );
    };

    onSlotSelect = (selectedSlot) => {
        this.setState({
            hasConfirmedMeeting: false,
        });
        if (this.state.selectedSlot === selectedSlot) {
            console.log("Cancelled");
            if (this.apiTimer !== null) {
                window.clearTimeout(this.apiTimer);
            }
            this.setState({
                selectedSlot: null,
            });
        } else {
            this.setState(
                {
                    selectedSlot: selectedSlot,
                },
                () => {
                    if (this.apiTimer !== null) {
                        window.clearTimeout(this.apiTimer);
                    }
                    this.apiTimer = window.setTimeout(() => {
                        this.setState(
                            {
                                hasConfirmedMeeting: true,
                                newBookingId: 1,
                            },
                            () => {
                                this.props.routerProps.history.push(
                                    `awesome/${this.state.newBookingId}/`
                                );
                            }
                        );
                    }, WAIT_TIME_BEFORE_API_CALL);
                }
            );
        }
    };

    onSettingPreferredMeetingHours = (selectedHours) => {
        this.setState({
            preferredMeetingHours: selectedHours.target.value,
        });
    };

    renderListHeader = () => {
        return (
            <>
                <Radio.Group
                    options={PREFERRED_MEETING_HOURS}
                    optionType="button"
                    onChange={this.onSettingPreferredMeetingHours}
                    value={this.state.preferredMeetingHours}
                />

                <div className="mt-5">
                    {this.state.selectedDate.format("dddd, MMMM Do")}
                </div>
            </>
        );
    };

    renderListItem = (item) => {
        return (
            <List.Item>
                <div className="w-full text-center">
                    <Button
                        className={
                            item === this.state.selectedSlot
                                ? "animate-setup-api-call"
                                : ""
                        }
                        block={true}
                        onClick={() => this.onSlotSelect(item)}>
                        {/* TODO: learn about animations */}
                        {item !== this.state.selectedSlot
                            ? dayjs(item).format("LT")
                            : this.state.hasConfirmedMeeting
                            ? "Confirmed"
                            : "Confirming"}
                    </Button>
                    <div
                        className={
                            data.event.timezone === this.state.visitorsTz
                                ? "hidden"
                                : "block"
                        }>
                        <p className="text-sm">
                            {"Their Time: "}
                            <b>
                                {dayjs(item)
                                    .tz(data.event.timezone)
                                    .format("LT")}
                            </b>
                        </p>
                    </div>
                </div>
            </List.Item>
        );
    };

    listDataSource = () => {
        switch (this.state.preferredMeetingHours) {
            case MORNING_HOURS:
                return this.state.availableSlots.filter(
                    (slot) => slot.format("a") === "am"
                );
            case EVENING_HOURS:
                return this.state.availableSlots.filter(
                    (slot) => slot.format("a") === "pm"
                );
            default:
                return this.state.availableSlots;
        }
    };
    // LIST RELATED PROPERTIES
    render() {
        console.log(this.props);
        return (
            <Row gutter={{ xs: 0, md: 16 }}>
                <Col xs={24} md={4}>
                    <h1>{data.event.title}</h1>

                    <h3>{data.event.duration} minutes</h3>
                    {/* DIVIDER */}
                    <Divider />
                    <p>{data.event.description}</p>
                    {/* DIVIDER */}
                    <Divider />
                    <div
                        className={
                            data.event.timezone === this.state.visitorsTz
                                ? "hidden"
                                : "grid grid-flow-col grid-cols-2"
                        }>
                        <p>
                            Your Timezone <br></br>
                            {this.state.visitorsTz}
                        </p>

                        <p>
                            Organizer&apos;s Timezone <br></br>
                            {data.event.timezone}
                        </p>
                    </div>
                </Col>
                <Col xs={24} md={16} className={"px-4 bg-white"}>
                    <Calendar
                        fullscreen={this.state.showFullCalendar}
                        defaultValue={dayjs.utc()}
                        mode={"month"}
                        value={this.selectedDate}
                        onSelect={this.onDateSelect}
                        validRange={[
                            dayjs.utc().startOf("day"),
                            dayjs.utc().endOf("month"),
                        ]}
                    />
                </Col>

                <Col
                    xs={{ span: 24 }}
                    md={{ span: 4 }}
                    className={"bg-white px-4 md:my-0 my-4"}>
                    <List
                        id="slot-list"
                        itemLayout="horizontal"
                        dataSource={this.listDataSource()}
                        header={this.renderListHeader()}
                        renderItem={(item) => this.renderListItem(item)}
                    />
                </Col>
            </Row>
        );
    }
}

EventLink.propTypes = {
    routerProps: PropTypes.object,
};

export default EventLink;
