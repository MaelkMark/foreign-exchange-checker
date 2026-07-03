import React from "react";
import clsx from "clsx";
import { getUnitRate, fixedLengthNumber } from "../../utils/utils";

import ExchangeContext from "../../context/ExchangeContext";
import UserContext from "../../context/UserContext";

import FavButton from "../../components/FavButton";
import ArrowRightIcon from "../../assets/images/icon-arrow-right.svg?react";

import "./Favorites.css";

export default function Favorites() {
    const { exchangeRates, ratesLoading } = React.useContext(ExchangeContext);
    const { favorites, setFavorites } = React.useContext(UserContext);
    const loading = ratesLoading || !exchangeRates;

    if (!favorites || favorites.length === 0) {
        return (
            <div className="empty-feedback favorites">
                <div className="empty-title">No pinned pairs yet</div>
                <p className="empty-message">
                    Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.
                </p>
            </div>
        );
    }

    return (
        <div className="list favorites">
            <div className="list-header">
                <div className="list-header-left list-header-highlight">Pinned pairs</div>
                <div className="list-header-total">{favorites?.length ?? 0} favorites</div>
            </div>
            <div className="list-wrapper">
                <div className={clsx("list-items", loading && "loading")}>
                    {!loading &&
                        favorites.map(favorite => {
                            const [sendCurrency, receiveCurrency] = favorite.split("-");
                            const sendRate = exchangeRates.find(
                                rate => rate.currency === sendCurrency,
                            )?.change;
                            const receiveRate = exchangeRates.find(
                                rate => rate.currency === receiveCurrency,
                            )?.change;

                            if (sendRate === null || receiveRate === null) return null;
                            const unitRate = getUnitRate(exchangeRates, sendCurrency, receiveCurrency);
                            const change = receiveRate - sendRate;
                            return (
                                <div className="list-item" key={favorite}>
                                    <div className="favorite-pair" style={{ gridArea: "pair" }}>
                                        {sendCurrency} <ArrowRightIcon className="arrow-icon" />{" "}
                                        {receiveCurrency}
                                    </div>
                                    <div className="favorite-rate" style={{ gridArea: "rate" }}>
                                        {unitRate.toFixed(4)}
                                    </div>
                                    <div
                                        className={clsx(
                                            "favorite-change",
                                            change >= 0 ? "change-up" : "change-down",
                                        )}
                                        style={{ gridArea: "change" }}
                                    >
                                        {change >= 0 ? "▲" : "▼"} {fixedLengthNumber(change, 4, true)}%
                                    </div>
                                    <FavButton
                                        favorites={favorites}
                                        setFavorites={setFavorites}
                                        sendCurrency={sendCurrency}
                                        currency={{ code: receiveCurrency }}
                                    />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
