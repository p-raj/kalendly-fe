const data = {
    event: {
        title: "15 minutes meeting",
        description: "15 minutes meeting for anyone who's interested to meet",
        timezone: "America/New_York",
        duration: 15, // always in minutes
        meta: {},
    },
    dates: {
        "2021-04-27": {
            status: "available",
            availability: [
                ["2021-04-27T03:30:00.000Z", "2021-04-27T12:59:59.999Z"],
            ],
        },
        "2021-04-28": {
            status: "available",
            availability: [
                ["2021-04-28T03:30:00.000Z", "2021-04-28T12:59:59.999Z"],
            ],
        },
        "2021-04-29": {
            status: "available",
            availability: [
                ["2021-04-29T03:30:00.000Z", "2021-04-29T05:59:59.999Z"],
                ["2021-04-29T07:30:00.000Z", "2021-04-29T09:59:59.999Z"],
                ["2021-04-29T10:30:00.000Z", "2021-04-29T11:59:59.999Z"],
            ],
        },
        "2021-04-30": {
            status: "available",
            availability: [
                ["2021-04-30T03:30:00.000Z", "2021-04-30T12:59:59.999Z"],
            ],
        },
    },
};
export default data;
