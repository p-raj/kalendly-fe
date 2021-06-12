import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

var now = dayjs().startOf("day");

const data = {
    event: {
        title: "15 minutes meeting",
        description: `
### 15 minutes meeting for anyone 
#### who's interested to meet
`,
        timezone: "America/New_York",
        duration: 15, // always in minutes
        meta: {},
    },
    dates: {
        [now.format("YYYY-MM-DD")]: {
            status: "available",
            availability: [
                [
                    [now.add(15, "hours")],
                    [now.add(1, "day").subtract(1, "second")],
                ],
            ],
        },
        [now.add(1, "day").format("YYYY-MM-DD")]: {
            status: "available",
            availability: [
                [
                    [now.add(1, "day").add(7, "hours")],
                    [now.add(2, "day").subtract(1, "second")],
                ],
            ],
        },
        [now.add(2, "day").format("YYYY-MM-DD")]: {
            status: "available",
            availability: [
                [
                    [now.add(2, "day").add(3, "hours")],
                    [now.add(2, "day").add(5, "hours")],
                ],
                [
                    [now.add(2, "day").add(7, "hours")],
                    [now.add(2, "day").add(9, "hours")],
                ],
                [
                    [now.add(2, "day").add(20, "hours")],
                    [now.add(2, "day").add(23, "hours")],
                ],
            ],
        },
        [now.add(3, "day").format("YYYY-MM-DD")]: {
            status: "available",
            availability: [
                [
                    [now.add(3, "day").add(13, "hours")],
                    [now.add(4, "day").subtract(1, "second")],
                ],
            ],
        },
    },
};
export default data;
