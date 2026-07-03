import React from "react";
import clsx from "clsx";

import ExchangeContext from "../../context/ExchangeContext";
import MemoryContext from "../../context/MemoryContext";
import ConversionContext from "../../context/ConversionContext";

import FavButton from "../../components/FavButton";

import "./Compare.css";

export default function Compare() {
    const { exchangeRates, ratesLoading, currencies, currenciesLoading } = React.useContext(ExchangeContext);
    const { favorites, setFavorites } = React.useContext(MemoryContext);
    const { sendCurrency, sendAmount } = React.useContext(ConversionContext);
    const loading = ratesLoading || currenciesLoading || !exchangeRates || !currencies;

    const numberFormat = React.useMemo(() => Intl.NumberFormat(), []);
    const rateByCurrency = React.useMemo(() => {
        if (!exchangeRates) return {};
        return Object.fromEntries(exchangeRates.map(rate => [rate.currency, rate.rate]));
    }, [exchangeRates]);

    const pairs = React.useMemo(() => {
        if (!exchangeRates || !currencies) return [];
        const sendRate = rateByCurrency[sendCurrency];
        return currencies.map(currency => {
            if (currency.code === sendCurrency) return null;
            const receiveRate = rateByCurrency[currency.code];
            const unitRate = sendRate && receiveRate ? receiveRate / sendRate : 0;
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
                        {numberFormat.format(unitRate * sendAmount)}
                    </div>
                    <div className="pair-rate" style={{ gridArea: "rate" }}>
                        @ {numberFormat.format(unitRate)}
                    </div>
                    <FavButton
                        favorites={favorites}
                        setFavorites={setFavorites}
                        sendCurrency={sendCurrency}
                        currency={currency}
                    />
                </div>
            );
        });
    }, [
        currencies,
        exchangeRates,
        favorites,
        numberFormat,
        rateByCurrency,
        sendAmount,
        sendCurrency,
        setFavorites,
    ]);

    if (!sendAmount) {
        return (
            <div className="empty-feedback compare">
                <div className="empty-title">No comparison available</div>
                <p className="empty-message">
                    Enter an amount in SEND above to see what your money is worth in other currencies.
                </p>
            </div>
        );
    }

    return (
        <div className="list compare">
            <div className="list-header">
                <div className="list-header-left">
                    <span>Multi-currency</span>
                    <span className="list-header-highlight">
                        {numberFormat.format(sendAmount)} from {sendCurrency}
                    </span>
                </div>
                <div className="list-header-total">{currencies?.length || 0} pairs</div>
            </div>
            <div className="list-wrapper">
                <div className={clsx("list-items", loading && "loading")}>{!loading && pairs}</div>
            </div>
        </div>
    );
}
