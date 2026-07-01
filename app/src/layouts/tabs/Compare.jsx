import React from "react";
import clsx from "clsx";

import ExchangeContext from "../../context/ExchangeContext";
import UserContext from "../../context/UserContext";

import FavButton from "../../components/FavButton";

import { getUnitRate } from "../../utils/utils";

import "./Compare.css";

export default function Compare() {
    const { exchangeRates, ratesLoading, currencies, currenciesLoading } = React.useContext(ExchangeContext);
    const { favorites, setFavorites, sendCurrency, sendAmount } = React.useContext(UserContext);
    const loading = ratesLoading || currenciesLoading || !exchangeRates || !currencies;
    return (
        <div className="list compare">
            <div className="list-header">
                <div className="list-header-left">
                    <span>Multi-currency</span>
                    <span className="list-header-highlight">
                        {Intl.NumberFormat().format(sendAmount)} from {sendCurrency}
                    </span>
                </div>
                <div className="list-header-total">{currencies?.length || 0} pairs</div>
            </div>
            <div className="list-wrapper">
                <div className={clsx("list-items", loading && "loading")}>
                    {!loading &&
                        currencies.map(currency => {
                            if (currency.code === sendCurrency) return null;
                            const unitRate = getUnitRate(exchangeRates, sendCurrency, currency.code);
                            return (
                                <div key={currency.code} className="list-item">
                                    <img
                                        className="pair-icon"
                                        style={{ gridArea: "icon" }}
                                        src={currency.icon}
                                        alt={currency.code}
                                    />
                                    <div className="pair-code" style={{ gridArea: "code" }}>
                                        {currency.code}
                                    </div>
                                    <div className="pair-name" style={{ gridArea: "name" }}>
                                        {currency.name}
                                    </div>
                                    <div className="pair-value" style={{ gridArea: "value" }}>
                                        {Intl.NumberFormat().format(unitRate * sendAmount)}
                                    </div>
                                    <div className="pair-rate" style={{ gridArea: "rate" }}>
                                        @ {unitRate}
                                    </div>
                                    <FavButton
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                        sendCurrency={sendCurrency}
                                        currency={currency}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
