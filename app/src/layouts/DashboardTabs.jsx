import React from "react";

import Tabs from "../components/Tabs";

import History from "./tabs/History";
import Compare from "./tabs/Compare";
import Favorites from "./tabs/Favorites";
import Logs from "./tabs/Logs";

import "./DashboardTabs.css";

export default function DashboardTabs() {
    return (
        <Tabs>
            <Tabs.Tab label="History" id="history">
                <History />
            </Tabs.Tab>
            <Tabs.Tab label="Compare" id="compare">
                <Compare />
            </Tabs.Tab>
            <Tabs.Tab label="Favorites" id="favorites">
                <Favorites />
            </Tabs.Tab>
            <Tabs.Tab label="Logs" id="logs">
                <Logs />
            </Tabs.Tab>
        </Tabs>
    );
}
