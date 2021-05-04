import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
    useLocation,
} from "react-router-dom";

import EventLink from "modules/events/event-link";
import EventLinkList from "modules/events/event-link-list";
import EventConfirmation from "modules/events/event-confirm";
import EventConfig from "modules/events/event-config";

const routerParams = () => {
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();
    return { history, location, match };
};

export const NavRouter = () => {
    const { history, location, match } = routerParams();
    return (
        <Switch>
            <Route path="/" exact>
                <EventLinkList routerProps={{ history, location, match }} />
            </Route>

            <Route path="/events/">
                <EventRouter />
            </Route>
        </Switch>
    );
};

export const EventRouter = () => {
    const { history, location, match } = routerParams();
    const { path } = match;
    return (
        <Switch>
            <Route path={`${path}`} exact>
                <EventLinkList routerProps={{ history, location, match }} />
            </Route>

            <Route path={`${path}:eventId/`}>
                <EventLinkRouter />
            </Route>
        </Switch>
    );
};

export const EventLinkRouter = () => {
    const { history, location, match } = routerParams();
    const { path } = match;
    return (
        <Switch>
            <Route path={`${path}/`} exact>
                <EventLink routerProps={{ history, location, match }} />
            </Route>

            <Route path={`${path}my-way/`} exact>
                <EventConfig routerProps={{ history, location, match }} />
            </Route>
            {/* boring */}
            <Route path={`${path}config/`} exact>
                <EventConfig routerProps={{ history, location, match }} />
            </Route>

            <Route path={`${path}awesome/:bookingId/`}>
                <EventLinkConfirmRouter />
            </Route>
            {/* boring */}
            <Route path={`${path}confirm/:bookingId/`}>
                <EventLinkConfirmRouter />
            </Route>
        </Switch>
    );
};

export const EventLinkConfirmRouter = () => {
    const { history, location, match } = routerParams();
    const { path } = match;
    return (
        <Switch>
            <Route path={`${path}`} exact>
                <EventConfirmation routerProps={{ history, location, match }} />
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
