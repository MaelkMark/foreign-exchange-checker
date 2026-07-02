import React from "react";
import { removeFromLog } from "../../utils/utils";

import ArrowRightIcon from "../../assets/images/icon-arrow-right.svg?react";
import DeleteIcon from "../../assets/images/icon-delete.svg?react";

import Button from "../../components/Button";

import UserContext from "../../context/UserContext";

import "./Logs.css";

export default function Logs() {
    const { logs, setLogs } = React.useContext(UserContext);

    function getDateString(timestamp) {
        const diff = new Date().getTime() - new Date(timestamp).getTime();
        if (diff > 1000 * 60 * 60 * 24) {
            // more than a day ago
            const date = new Date(timestamp);
            return date.toLocaleString(undefined, { month: "short", day: "numeric" });
        } else if (diff >= 1000 * 60 * 60) {
            // more than an hour ago
            return `${Math.floor(diff / (1000 * 60 * 60))}H`;
        } else if (diff >= 1000 * 60) {
            // more than a minute ago
            return `${Math.floor(diff / (1000 * 60))}M`;
        } else {
            // less than a minute ago
            return "Now";
        }
    }

    const amountFormat = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });

    return (
        <div className="list logs">
            <div className="list-header">
                <div className="list-header-left list-header-highlight">Conversion log</div>
                <div className="list-header-right">
                    <div className="list-header-total">{logs?.length || 0} Logged</div>
                    <Button className="logs-clear-all" onClick={() => setLogs([])}>Clear all</Button>
                </div>
            </div>
            <div className="list-wrapper">
                <div className="list-items">
                    {logs
                        .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
                        .map(log => {
                            return (
                                <div className="list-item" key={log.id}>
                                    <div className="log-date">{getDateString(log.datetime)}</div>
                                    <div className="log-currencies">
                                        {log.sendCurrency} <ArrowRightIcon className="log-arrow" />{" "}
                                        {log.receiveCurrency}
                                    </div>
                                    <div className="log-amount-send">
                                        {amountFormat.format(log.sendAmount)}{" "}
                                    </div>
                                    <div className="log-amount-receive">
                                        {amountFormat.format(log.receiveAmount)}
                                    </div>
                                    <Button
                                        className="icon-button log-delete"
                                        onClick={() => removeFromLog(logs, setLogs, log)}
                                    >
                                        <DeleteIcon className="log-delete-icon" />
                                    </Button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
