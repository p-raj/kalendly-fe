import React from "react";

import KalendlyLayout from "components/layout";

import { getNavLinks } from "router";

function App() {
    return <KalendlyLayout fnNavLinks={getNavLinks} />;
}

export default App;
