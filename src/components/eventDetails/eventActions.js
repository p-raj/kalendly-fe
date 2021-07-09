import React from "react";
import { Button } from "antd";

const EventActions = () => {
    return (
        <div className="grid grid-cols-5">
            <div className="col-span-2">
                <Button block>{"Reschedule"}</Button>
            </div>
            {/* DIVIDER */}
            <div className="col-span-1 block h-full w-1/2 border-t-0 border-b-0 border-l-0 border-gray-300 border-r border-solid"></div>
            <div className="col-span-2">
                <Button block>{"Cancel"}</Button>
            </div>
        </div>
    );
};

export default EventActions;
