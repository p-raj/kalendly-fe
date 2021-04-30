import React from "react";
import { BrowserRouter } from "react-router-dom";
import KalendlyLayout from "components/layout";

import { getNavLinks } from "router";

function App() {
    return (
        <BrowserRouter>
            <KalendlyLayout fnNavLinks={getNavLinks} />
        </BrowserRouter>
    );
}

export default App;
