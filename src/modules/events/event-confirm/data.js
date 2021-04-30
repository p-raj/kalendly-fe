const data = {
    event: {
        id: 1,
        title: "15 minutes meeting with Mr. X",
        description:
            "15 minutes meeting with Mr. X regarding the plantation of 1 trillion trees",
        timezone: "America/New_York",
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
            start: "2021-04-30T03:30:00.000Z",
            end: "2021-04-30T03:45:00.000Z",
        },
    },
};
export default data;
