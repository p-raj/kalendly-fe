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
        "2021-05-06": {
            status: "available",
            availability: [
                ["2021-05-06T03:30:00.000Z", "2021-05-06T12:59:59.999Z"],
            ],
        },
        "2021-05-07": {
            status: "available",
            availability: [
                ["2021-05-07T03:30:00.000Z", "2021-05-07T12:59:59.999Z"],
            ],
        },
        "2021-05-08": {
            status: "available",
            availability: [
                ["2021-05-08T03:30:00.000Z", "2021-05-08T05:59:59.999Z"],
                ["2021-05-08T07:30:00.000Z", "2021-05-08T09:59:59.999Z"],
                ["2021-05-08T10:30:00.000Z", "2021-05-08T11:59:59.999Z"],
            ],
        },
        "2021-05-09": {
            status: "available",
            availability: [
                ["2021-05-09T03:30:00.000Z", "2021-05-09T23:59:59.999Z"],
            ],
        },
    },
};
export default data;
