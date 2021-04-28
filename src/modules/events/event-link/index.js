import React, { Component } from "react";
import PropTypes from "prop-types";

import dayjs from "dayjs";

import { Row, Col, List, Button, Calendar, Radio } from "antd";

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

const WAIT_TIME_BEFORE_API = 5 * 1000; //seconds

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
                    const selectedSlot = this.state.selectedSlot;
                    if (this.apiTimer !== null) {
                        window.clearTimeout(this.apiTimer);
                    }
                    this.apiTimer = window.setTimeout(() => {
                        console.log(selectedSlot);
                    }, WAIT_TIME_BEFORE_API);
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
                <div className="mb-3">
                    <Radio.Group
                        options={PREFERRED_MEETING_HOURS}
                        optionType="button"
                        onChange={this.onSettingPreferredMeetingHours}
                        value={this.state.preferredMeetingHours}
                    />
                </div>
                <div>{this.state.selectedDate.format("dddd, MMMM Do")}</div>
            </>
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
        return (
            <Row>
                <Col span={1}>{/* DIVIDER */}</Col>
                <Col span={4}>
                    <Row>
                        <h1>{data.event.title}</h1>
                        <h3>{data.event.duration} minutes</h3>
                        <p>{data.event.description}</p>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p>
                                Your Timezone <br></br>
                                {this.state.visitorsTz}
                            </p>
                        </Col>
                        <Col span={24}>
                            <p>
                                Organizer&apos;s Timezone <br></br>
                                {data.event.timezone}
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col span={1}>{/* DIVIDER */}</Col>
                <Col xs={16} md={12}>
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
                <Col xs={0} md={1}>
                    {/* DIVIDER */}
                </Col>
                <Col xs={{ span: 20, offset: 2 }} md={{ span: 4, offset: 0 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.listDataSource()}
                        header={this.renderListHeader()}
                        renderItem={(item) => (
                            <List.Item>
                                <div className="grid grid-rows-2 gap-y-1">
                                    <Button
                                        className={
                                            item === this.state.selectedSlot
                                                ? "animate-setup-api-call"
                                                : ""
                                        }
                                        // type={
                                        //     item === this.state.selectedSlot
                                        //         ? "primary"
                                        //         : "default"
                                        // }
                                        block={true}
                                        onClick={() => this.onSlotSelect(item)}
                                    >
                                        {/* TODO: learn about animations */}
                                        {item !== this.state.selectedSlot
                                            ? dayjs(item).format("LT")
                                            : "Confirm"}
                                    </Button>
                                    <div
                                        className={
                                            data.event.timezone ===
                                            this.state.visitorsTz
                                                ? "hidden"
                                                : "block"
                                        }
                                    >
                                        <p className="text-xs">
                                            Their Time:
                                            {dayjs(item)
                                                .tz(data.event.timezone)
                                                .format("LLL")}
                                        </p>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col xs={0} md={1}></Col>
            </Row>
        );
    }
}

EventLink.propTypes = {
    props: PropTypes.object,
};

export default EventLink;
