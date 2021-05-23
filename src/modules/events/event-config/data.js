const MIN_TO_DAYS = 60 * 24;

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
                value: 30 * MIN_TO_DAYS,
                type: "select",
                status: "enabled",
                options: [
                    { key: "30 Days", value: 30 * MIN_TO_DAYS },
                    { key: "60 Days", value: 60 * MIN_TO_DAYS },
                ],
                validations: [
                    {
                        rule: {
                            type: "regex",
                            pattern: "[\\d]",
                        },
                        message: "The field can have numeric values only",
                    },
                    {
                        rule: {
                            type: "required",
                            pattern: true,
                        },
                        message: "The field is required",
                    },
                    {
                        rule: {
                            type: "gt",
                            pattern: 0,
                        },
                        message: "The value needs to be a positive number",
                    },
                ], // tigger after pre-dependencies have run
                // TBD | YAGNI
                dependencies: {
                    pre: [], // on focus trigger once
                    post: [], // on blur trigger once
                },
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
                value: 0,
                type: "select",
                status: "enabled",
                options: [
                    { key: "No Buffer", value: 0 },
                    { key: "15 Mins", value: 15 },
                    { key: "30 Mins", value: 30 },
                    { key: "60 Mins", value: 60 },
                ],
                validations: [
                    {
                        rule: {
                            type: "regex",
                            pattern: "[\\d]",
                        },
                        message: "The field can have numeric values only",
                    },
                    {
                        rule: {
                            type: "required",
                            pattern: true,
                        },
                        message: "The field is required",
                    },
                    {
                        rule: {
                            type: "gte",
                            pattern: 0,
                        },
                        message: "The value needs to be a positive number",
                    },
                ], // tigger after pre-dependencies have run
                // TBD | YAGNI
                dependencies: {
                    pre: [], // on focus trigger once
                    post: [], // on blur trigger once
                },
            },
            {
                id: 4,
                title: "Buffer Time after events",
                description: "Time to wrap-up after the booked events.",
                value: 0,
                type: "select",
                status: "enabled",
                options: [
                    { key: "No Buffer", value: 0 },
                    { key: "15 Mins", value: 15 },
                    { key: "30 Mins", value: 30 },
                    { key: "60 Mins", value: 60 },
                ],
                validations: [
                    {
                        rule: {
                            type: "regex",
                            pattern: "[\\d]",
                        },
                        message: "The field can have numeric values only",
                    },
                    {
                        rule: {
                            type: "required",
                            pattern: true,
                        },
                        message: "The field is required",
                    },
                    {
                        rule: {
                            type: "gte",
                            pattern: 0,
                        },
                        message: "The value needs to be a positive number",
                    },
                ], // tigger after pre-dependencies have run
                // TBD | YAGNI
                dependencies: {
                    pre: [], // on focus trigger once
                    post: [], // on blur trigger once
                },
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
