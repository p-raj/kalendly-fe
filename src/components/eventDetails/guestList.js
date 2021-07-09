import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import GuestListHeaderDivider from "./guestListHeaderDivider";
import updateWindowDimensions from "./utils/updateWindowDimensions";

const GuestList = ({ data }) => {
    const [isSmallScreen, setsmallScreen] = useState(false);

    // window resizing
    useEffect(() => {
        window.addEventListener(
            "resize",
            updateWindowDimensions(setsmallScreen)
        );
        return () => {
            window.removeEventListener(
                "resize",
                updateWindowDimensions(setsmallScreen)
            );
        };
    }, []);

    const headers = {
        name: "Name",
        email: "Email",
        timezone: "Timezome",
        status: "Availability Status",
    };

    if (!isSmallScreen) {
        return (
            <>
                <div className="grid grid-cols-4 gap-4 px-16 py-10">
                    <h3>{headers.name}</h3>
                    <h3>{headers.email}</h3>
                    <h3>{headers.timezone}</h3>
                    <h3>{headers.status}</h3>
                    <GuestListHeaderDivider />
                    <GuestListHeaderDivider />
                    <GuestListHeaderDivider />
                    <GuestListHeaderDivider />
                </div>
                {data.map((guest, index) => {
                    return (
                        <div
                            key={index}
                            className="grid grid-cols-4 gap-4 px-16">
                            <div>{guest.name}</div>
                            <div>{guest.email}</div>
                            <div>{guest.timezone}</div>
                            <div>{guest.status}</div>
                        </div>
                    );
                })}
            </>
        );
    } else {
        return (
            <>
                {data.map((guest, index) => {
                    return (
                        <div
                            key={index}
                            className="grid grid-cols-2 gap-4 px-4 py-4">
                            {/* name */}
                            <h3>{headers.name}</h3>
                            <div>{guest.name}</div>
                            {/* email */}
                            <h3>{headers.email}</h3>
                            <div>{guest.email}</div>
                            {/* timezone */}
                            <h3>{headers.timezone}</h3>
                            <div>{guest.timezone}</div>
                            {/* status */}
                            <h3>{headers.status}</h3>
                            <div>{guest.status}</div>
                            {/* divider */}
                            <GuestListHeaderDivider />
                            <GuestListHeaderDivider />
                        </div>
                    );
                })}
            </>
        );
    }
};

GuestList.propTypes = {
    data: PropTypes.array,
};

export default GuestList;
