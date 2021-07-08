import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

var now = dayjs().startOf("day");

const data = [
    {
        id: 1,
        title: "15 minutes meeting with Mr. X",
        description: `
### 15 minutes meeting with Mr. X,
#### regarding the plantation of 1 trillion trees
Save the planet!!
    `,
        timezone: "America/New_York",
        location: {
            title: "Google Meet",
            link: "https://asd-asd-asd.google.com",
        },
        duration: 15, // always in minutes
        meta: {},
        guests: [
            {
                name: "Mr. X",
                email: "mrx@gmail.com",
                timezone: "Asia/Kolkata",
                status: "available",
            },
        ],
        dates: {
            start: now.add(10, "hours"),
            end: now.add(10, "hours").add(15, "minutes"),
        },
    },
    {
        id: 2,
        title: "15 minutes meeting with Mr. X",
        description: `
### 15 minutes meeting with Mr. X,
#### regarding the plantation of 1 trillion trees
Save the planet!!
    `,
        timezone: "America/New_York",
        location: {
            title: "Google Meet",
            link: "https://asd-asd-asd.google.com",
        },
        duration: 15, // always in minutes
        meta: {},
        guests: [
            {
                name: "Mr. X",
                email: "mrx@gmail.com",
                timezone: "Asia/Kolkata",
                status: "available",
            },
        ],
        dates: {
            start: now.add(11, "hours"),
            end: now.add(11, "hours").add(15, "minutes"),
        },
    },
];

export default data;
