import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";

import "./App.css";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <div className="toggler">
                <div className="maincontainer">
                    <div className={`mode__tog ${darkMode && "active"}`}
                        onClick={() => setDarkMode(!darkMode)}
                    ></div>
                    <div className="mode__container">
                        <div
                            className={`dark_mode ${darkMode && "active"}`}
                        ></div>
                    </div>
                    <div className="diff">
                        <PageTitle>TODO List</PageTitle>
                        <div className="app__wrapper">
                            <AppHeader />
                            <AppContent />
                        </div>
                    </div>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    theme={darkMode ? "dark" : "colored"}
                    // pauseOnHover
                />
            </div>
        </>
    );
};

export default App;
