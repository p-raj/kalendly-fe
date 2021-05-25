import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import KalendlyLayout from "components/layout";

import { getNavLinks } from "router";

const AuthContext = React.createContext(true);

function App() {
    const [user, setUser] = useState({ user: 1 });
    return (
        <BrowserRouter>
            <AuthContext.Provider value={user}>
                <KalendlyLayout
                    fnNavLinks={getNavLinks}
                    contextAuth={AuthContext}
                />
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
