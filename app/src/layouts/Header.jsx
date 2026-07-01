import React from "react";
import clsx from "clsx";

import Logo from "../assets/images/logo.svg?react";
import Marquee from "../components/Marquee";
import Spinner from "../components/Loader";

import "./Header.css";
import ExchangeContext from "../context/ExchangeContext.jsx";

function fixedLengthNumber(num, length, includeSign = false) {
    const sign = num < 0 ? "-" : includeSign ? "+" : "";
    const numStr = Math.abs(parseFloat(num)).toFixed(length);
    return sign + numStr.slice(0, length);
}

export default function Header() {
    const { currencies, currenciesLoading, currenciesError, exchangeRates, ratesLoading, ratesError } =
        React.useContext(ExchangeContext);

    return (
        <div className="header-wrapper">
            <header className="header">
                <Logo className="logo" />
                <div className="header-info">
                    <span
                        className="header-info-status"
                        data-loading={currenciesLoading}
                        data-error={Boolean(currenciesError || ratesError)}
                        role="status"
                    >
                        {currenciesLoading ? (
                            <>
                                <Spinner /> Loading currencies
                            </>
                        ) : currenciesError ? (
                            "Failed to load currencies"
                        ) : ratesError ? (
                            "Failed to load exchange rates"
                        ) : (
                            `${currencies.length} Currencies`
                        )}{" "}
                    </span>
                    · EOD · ECB data
                </div>
            </header>
            <div className="ticker" data-loading={ratesLoading} data-error={Boolean(ratesError)}>
                <div className="ticker-label">Live markets</div>
                {!ratesLoading && !ratesError && exchangeRates && (
                    <Marquee className="ticker-marquee" speed={75}>
                        {exchangeRates
                            .filter(rate => Math.abs(rate.change) > 0.01)
                            .map((rate, index) => {
                                const value = fixedLengthNumber(rate.rate, 6);
                                const change = fixedLengthNumber(rate.change, 4, true);

                                return (
                                    <Marquee.Item key={index}>
                                        <div className="ticker-item-currencies">
                                            {rate.base}/{rate.currency}
                                        </div>
                                        <div className="ticker-item-rates">{value}</div>
                                        <div
                                            className={clsx(
                                                "ticker-item-change",
                                                rate.change > 0 ? "change-up" : "change-down",
                                            )}
                                        >
                                            {rate.change > 0 ? "▲ " : "▼ "}
                                            {change}%
                                        </div>
                                    </Marquee.Item>
                                );
                            })}
                    </Marquee>
                )}
            </div>
        </div>
    );
}
