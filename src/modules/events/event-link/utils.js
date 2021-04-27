import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

// https://stackoverflow.com/a/39171497/362574
const getAvailableSlots = (startDateTime, endDateTime, interval) => {
    var start = dayjs(startDateTime);
    var end = dayjs(endDateTime);
    var now = dayjs();

    if (start < now) {
        start = now;
        start = start.minute(Math.ceil(start.minute() / interval) * interval);
    }

    var result = [];
    while (start <= end) {
        result.push(start);
        start = start.add(interval, "minutes");
    }

    return result;
};

export { getAvailableSlots };
