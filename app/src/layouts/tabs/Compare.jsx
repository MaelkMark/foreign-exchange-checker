import React from "react";
import clsx from "clsx";

import ExchangeContext from "../../context/ExchangeContext";
import UserContext from "../../context/UserContext";

import StateButton from "../../components/StateButton";

import StarIcon from "../../assets/images/icon-star.svg?react";
import StarFilledIcon from "../../assets/images/icon-star-filled.svg?react";

import { getUnitRate, toggleFavorite } from "../../utils/utils";

import "./Compare.css";

export default function Compare() {
    const { exchangeRates, ratesLoading, currencies, currenciesLoading } = React.useContext(ExchangeContext);
    const { favorites, setFavorites, sendCurrency, sendAmount, receiveCurrency } =
        React.useContext(UserContext);
    const loading = ratesLoading || currenciesLoading || !exchangeRates || !currencies;
    return (
        <div className="compare">
            <div className="compare-header">
                <div>
                    <span>Multi-currency</span>
                    <span className="compare-header-send">
                        {Intl.NumberFormat().format(sendAmount)} from {sendCurrency}
                    </span>
                </div>
                <div className="compare-header-pairs">{currencies?.length || 0} pairs</div>
            </div>
            <div className="compare-pairs-wrapper">
                <div className={clsx("compare-pairs", loading && "loading")}>
                    {!loading &&
                        currencies.map(currency => {
                            if (currency.code === sendCurrency) return null;
                            const unitRate = getUnitRate(exchangeRates, sendCurrency, currency.code);
                            return (
                                <div key={currency.code} className="compare-pair">
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
                                    <StateButton
                                        className="pair-favorite"
                                        style={{ gridArea: "favorite" }}
                                        checked={favorites.includes(`${sendCurrency}-${currency.code}`)}
                                        onClick={() =>
                                            toggleFavorite(
                                                favorites,
                                                setFavorites,
                                                sendCurrency,
                                                currency.code,
                                            )
                                        }
                                    >
                                        <StateButton.Off>
                                            <StarIcon />
                                        </StateButton.Off>
                                        <StateButton.On>
                                            <StarFilledIcon />
                                        </StateButton.On>
                                    </StateButton>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
