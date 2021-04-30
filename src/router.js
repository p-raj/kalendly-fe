import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import EventLink from "modules/events/event-link";
import EventLinkList from "modules/events/event-link-list";
import EventConfirmation from "modules/events/event-confirm";

export const NavRouter = (routerProps) => {
    return (
        <Switch>
            <Route path="/" exact>
                <EventLinkList routerProps={{ ...routerProps }} />
            </Route>

            <Route path="/events/">
                <EventRouter routerProps={{ ...routerProps }} />
            </Route>
        </Switch>
    );
};

export const EventRouter = (routerProps) => {
    console.log(useParams());
    console.log(useRouteMatch());
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}`} exact>
                <EventLinkList routerProps={{ ...routerProps }} />
            </Route>

            <Route path={`${path}:eventId/`}>
                <EventLinkRouter routerProps={{ ...routerProps }} />
            </Route>
        </Switch>
    );
};

export const EventLinkRouter = (routerProps) => {
    console.log(useParams());
    console.log(useRouteMatch());
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/`} exact>
                <EventLink routerProps={{ ...routerProps }} />
            </Route>

            <Route path={`${path}awesome/:bookingId/`}>
                <EventLinkConfirmRouter routerProps={{ ...routerProps }} />
            </Route>
        </Switch>
    );
};

export const EventLinkConfirmRouter = (routerProps) => {
    console.log(useParams());
    console.log(useRouteMatch());
    let { path, url } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}`} exact>
                <EventConfirmation routerProps={{ ...routerProps }} />
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
                link: "/events/",
            },
        ],
        router: NavRouter,
    };
    return data;
};
