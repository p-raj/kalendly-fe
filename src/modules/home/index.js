import React from "react";
import { Viewer } from "components/markdown";
import { Calendar, Badge, Row, Col, List, Card, Button } from "antd";

import dayjs from "dayjs";

import data from "./data";

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
            ];
            break;
        case 10:
            listData = [
                { type: "warning", content: "This is warning event." },
                { type: "success", content: "This is usual event." },
                { type: "error", content: "This is error event." },
            ];
            break;
        case 15:
            listData = [
                { type: "warning", content: "This is warning event" },
                {
                    type: "success",
                    content: "This is very long usual event。。....",
                },
                { type: "error", content: "This is error event 1." },
                { type: "error", content: "This is error event 2." },
                { type: "error", content: "This is error event 3." },
                { type: "error", content: "This is error event 4." },
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
                    <Badge status={item.type} text={item.content} />
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
                {dayjs(start).format(formatDate)}(
                {dayjs(start).format(formatTime)} -
                {dayjs(end).format(formatTime)})
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

const renderEventCard = (item) => {
    // TODO/FIXME: render the event details
    // in a modal, event details is a separate dedicated page as well
    // once the modal opens up, also show the options to (cancel the invite/ reschedule the invite)
    return (
        <Card
            title={item.title}
            extra={
                <Button type={"link"} onClick={() => null}>
                    {"Details"}
                </Button>
            }>
            {renderEventDates(item.dates.start, item.dates.end)}
            <Viewer value={item.description} />
        </Card>
    );
};

const Home = () => {
    return (
        <Row className={"p-4 bg-white"}>
            <Col md={18} xs={24}>
                <Calendar
                    dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                />
            </Col>
            <Col
                md={6}
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
    );
};

export default Home;
