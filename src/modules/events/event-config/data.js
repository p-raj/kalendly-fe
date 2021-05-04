const data = {
    event: {
        title: "15 minutes meeting",
        description: "15 minutes meeting for anyone who's interested to meet",
        timezone: "America/New_York",
        duration: 15, // always in minutes
        meta: {},
        status: "enabled",
        locations: {
            plugins: [
                {
                    title: "In-person Meeting",
                    link: "https://goo.gl/maps/nBy7Lp7KXHu9Fmv59",
                    id: 1,
                    options: [],
                },
            ],
        },
        rules: [
            {
                id: 1,
                title: "",
                description: "",
                value: "",
            },
        ],
    },
    rules: [],
    plugins: [
        {
            id: 1,
            title: "Invitee Form",
            description: "Event Booking Details to be filled by the invitees",
            options: [],
            status: "enabled",
        },
        {
            id: 2,
            title: "Workflows <WIP>",
            description: "Automation for the event and event booking",
            options: [],
            status: "disabled",
        },
        {
            id: 3,
            title: "Confirmation Page <WIP>",
            description: "Booking confirmation page for the invitees",
            options: [],
            status: "disabled",
        },
        {
            id: 4,
            title: "Payments <WIP>",
            description: "Collect payments for event bookings",
            options: [],
            status: "disabled",
        },
    ],
};

export default data;
