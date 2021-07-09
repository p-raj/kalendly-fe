import React, { useState } from "react";
import { Viewer } from "components/markdown";
import { Calendar, Drawer, Row, Col, List, Card, Button } from "antd";

import dayjs from "dayjs";

import data from "./data";
import GuestList from "components/eventDetails/guestList";
import EventActions from "components/eventDetails/eventActions";

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: "warning",
                    content: "3",
                },
            ];
            break;
        case 10:
            listData = [
                {
                    type: "warning",
                    content: "3",
                },
            ];
            break;
        case 15:
            listData = [
                {
                    type: "warning",
                    content: "3",
                },
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map((item) => (
                <li key={item.content}>
                    {"Meetings schudled: "}
                    <b>{item.content}</b>
                </li>
            ))}
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
        <div className="notes-month">
            <section>{num}</section>
            <span>Backlog number</span>
        </div>
    ) : null;
}

const renderEventDates = (start, end) => {
    // case 1 dates match
    const formatTime = "LT";
    const formatDate = "ddd, MMM D, YYYY";
    if (dayjs(start).get("date") === dayjs(end).get("date")) {
        return (
            <h3>
                {dayjs(start).format(formatTime)} -
                {dayjs(end).format(formatTime)}
            </h3>
        );
    } else {
        <h3>
            {dayjs(start).format(formatDate)}({dayjs(start).format(formatTime)})
            - {dayjs(end).format(formatDate)}({dayjs(end).format(formatTime)})
        </h3>;
    }
    return start, end;
};

const setState = (stateFn, stateValue) => {
    stateFn(stateValue);
};

const renderGuestDetails = (guestList) => {
    if (guestList === null || guestList === undefined) {
        return null;
    }
    return <GuestList data={guestList} />;
};

const renderEventDetailsDrawerFooter = () => {
    return <EventActions />;
};

const Home = () => {
    const [isEventDetailsDrawerOpen, setEventDetailsDrawerOpen] =
        useState(false);

    // title of the drawer
    const [
        eventDetailsDrawerSelectedEvent,
        setEventDetailsDrawerSelectedEvent,
    ] = useState({});

    // Drawer functions

    const onBeforeEventDetailsDrawerOpen = (eventDetails) => {
        setState(setEventDetailsDrawerSelectedEvent, eventDetails);
        setState(setEventDetailsDrawerOpen, true);
    };
    //

    const renderEventCard = (item) => {
        // TODO/FIXME: render the event details
        // in a modal, event details is a separate dedicated page as well
        // once the modal opens up, also show the options to (cancel the invite/ reschedule the invite)
        return (
            <Card
                title={item.title}
                extra={
                    <Button
                        type={"link"}
                        onClick={() => onBeforeEventDetailsDrawerOpen(item)}>
                        {"Details"}
                    </Button>
                }>
                {renderEventDates(item.dates.start, item.dates.end)}
                <Viewer value={item.description} />
            </Card>
        );
    };
    return (
        <>
            <Row className={"p-4 bg-white"}>
                <Col lg={12} xs={24}>
                    <Calendar
                        dateCellRender={dateCellRender}
                        monthCellRender={monthCellRender}
                    />
                </Col>
                <Col
                    lg={12}
                    xs={24}
                    className={
                        "overflow-y-auto overflow-x-hidden relative p-3 max-h-screen"
                    }>
                    <List
                        grid={{ gutter: 16, column: 1 }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>{renderEventCard(item)}</List.Item>
                        )}
                    />
                </Col>
            </Row>
            <Drawer
                title={eventDetailsDrawerSelectedEvent.title}
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
                visible={isEventDetailsDrawerOpen}
                onClose={() => setState(setEventDetailsDrawerOpen, false)}
                footer={renderEventDetailsDrawerFooter()}>
                {renderGuestDetails(eventDetailsDrawerSelectedEvent.guests)}
            </Drawer>
        </>
    );
};

export default Home;
