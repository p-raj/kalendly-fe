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
        "2021-05-01": {
            status: "available",
            availability: [
                ["2021-05-01T03:30:00.000Z", "2021-05-01T12:59:59.999Z"],
            ],
        },
        "2021-05-02": {
            status: "available",
            availability: [
                ["2021-05-02T03:30:00.000Z", "2021-05-02T12:59:59.999Z"],
            ],
        },
        "2021-05-03": {
            status: "available",
            availability: [
                ["2021-05-03T03:30:00.000Z", "2021-05-03T05:59:59.999Z"],
                ["2021-05-03T07:30:00.000Z", "2021-05-03T09:59:59.999Z"],
                ["2021-05-03T10:30:00.000Z", "2021-05-03T11:59:59.999Z"],
            ],
        },
        "2021-05-04": {
            status: "available",
            availability: [
                ["2021-05-04T03:30:00.000Z", "2021-05-04T23:59:59.999Z"],
            ],
        },
    },
};
export default data;
