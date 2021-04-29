import React from "react";
import { Switch, Route } from "react-router-dom";

import EventLink from "modules/events/event-link";
import EventLinkList from "modules/events/event-link-list";
import EventConfirmation from "modules/events/event-confirm";

export const EventRouter = () => {
    return (
        <Switch>
            {/* Note how these two routes are ordered. The more specific
                path="/contact/:id" comes before path="/contact" so that
                route will render when viewing an individual contact */}
            <Route path="/events/:id/awesome">
                <EventConfirmation />
            </Route>
            <Route path="/events/:id">
                <EventLink />
            </Route>
            <Route path="/events">
                <EventLinkList />
            </Route>

            {/* If none of the previous routes render anything,
                this route acts as a fallback.
    
                Important: A route with path="/" will *always* match
                the URL because all URLs begin with a /. So that's
                why we put this one last of all */}
            <Route path="/">
                <EventLinkList />
            </Route>
        </Switch>
    );
};

export const getNavLinks = () => {
    const data = {
        links: [
            {
                title: "Home",
                link: "/",
            },
            {
                title: "Events",
                link: "/events",
            },
        ],
        router: EventRouter,
    };
    return data;
};
