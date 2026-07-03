import React from "react";

import Tabs from "../components/Tabs";

import History from "./tabs/History";
import Compare from "./tabs/Compare";
import Favorites from "./tabs/Favorites";
import Logs from "./tabs/Logs";

import userContext from "../context/UserContext";

import "./DashboardTabs.css";

export default function DashboardTabs() {
    const { favorites, logs } = React.useContext(userContext);
    return (
        <Tabs>
            <Tabs.Tab label="History" id="history">
                <History />
            </Tabs.Tab>
            <Tabs.Tab label="Compare" id="compare">
                <Compare />
            </Tabs.Tab>
            <Tabs.Tab label="Favorites" id="favorites" notifications={favorites?.length}>
                <Favorites />
            </Tabs.Tab>
            <Tabs.Tab label="Logs" id="logs" notifications={logs?.length}>
                <Logs />
            </Tabs.Tab>
        </Tabs>
    );
}
