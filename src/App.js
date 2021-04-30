import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import KalendlyLayout from "components/layout";

import { getNavLinks } from "router";

function App(props) {
    const { history, location, match } = props;
    return (
        <KalendlyLayout
            routerProps={{ history, location, match }}
            fnNavLinks={getNavLinks}
        />
    );
}

App.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
};

export default withRouter(App);
