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
                title: "Invitees Can Schedule, days in future",
                description:
                    "Set a range of dates when you can accept meetings.",
                value: "1",
                type: "input",
                status: "enabled",
            },
            {
                id: 2,
                title: "Your Availability Schedule",
                description:
                    "Setup your availability schedule for the invitees to be able to book a meeting with you in your preferred schedule",
                value: "1",
                type: "input",
                status: "enabled",
            },
            {
                id: 3,
                title: "Buffer Time before events",
                description: "Time to prepare for the booked events.",
                value: "1",
                type: "input",
                status: "disabled",
            },
            {
                id: 4,
                title: "Buffer Time after events",
                description: "Time to wrap-up after the booked events.",
                value: "1",
                type: "input",
                status: "disabled",
            },
        ],
    },
    plugins: [
        {
            id: 1,
            title: "Invitee Form",
            description: "Event Booking Details to be filled by the invitees",
            options: [
                {
                    id: 1,
                    title: "Invitees Can Schedule, days in future",
                    description:
                        "Set a range of dates when you can accept meetings.",
                    value: "1",
                    type: "input",
                    status: "enabled",
                },
                {
                    id: 2,
                    title: "Your Availability Schedule",
                    description:
                        "Setup your availability schedule for the invitees to be able to book a meeting with you in your preferred schedule",
                    value: "1",
                    type: "input",
                    status: "enabled",
                },
                {
                    id: 3,
                    title: "Buffer Time before events",
                    description: "Time to prepare for the booked events.",
                    value: "1",
                    type: "input",
                    status: "disabled",
                },
                {
                    id: 4,
                    title: "Buffer Time after events",
                    description: "Time to wrap-up after the booked events.",
                    value: "1",
                    type: "input",
                    status: "disabled",
                },
            ],
            status: "enabled",
        },
        {
            id: 2,
            title: "Workflows",
            description: "Automation for the event and event booking",
            options: [],
            status: "disabled",
        },
        {
            id: 3,
            title: "Confirmation Page",
            description: "Booking confirmation page for the invitees",
            options: [],
            status: "disabled",
        },
        {
            id: 4,
            title: "Payments",
            description: "Collect payments for event bookings",
            options: [],
            status: "disabled",
        },
    ],
};

export default data;
