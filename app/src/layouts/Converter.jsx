import React from "react";
import { clsx } from "clsx";

import { Form, NumberField, Label, Input } from "react-aria-components";
import CurrencyPicker from "../components/CurrencyPicker";
import Button from "../components/Button";
import StateButton from "../components/StateButton";

import SwapIcon from "../assets/images/icon-exchange.svg?react";
import StarIcon from "../assets/images/icon-star.svg?react";
import StarFilledIcon from "../assets/images/icon-star-filled.svg?react";
import CheckIcon from "../assets/images/icon-check.svg?react";

import ExchangeContext from "../context/ExchangeContext";
import UserContext from "../context/UserContext";

import "./Converter.css";

export default function Converter() {
    const [sendCurrency, setSendCurrency] = React.useState("USD");
    const [sendAmount, setSendAmount] = React.useState(0);
    const [receiveCurrency, setReceiveCurrency] = React.useState("EUR");
    const [loggedFeedback, setLoggedFeedback] = React.useState(false);

    const { exchangeRates, ratesLoading } = React.useContext(ExchangeContext);
    const { favorites, setFavorites, logs, setLogs } = React.useContext(UserContext);

    const isFavorite = favorites.includes(`${sendCurrency}-${receiveCurrency}`);

    console.log("favorites", favorites);
    console.log("logs", logs);

    let unitRate = 0;
    if (!ratesLoading && exchangeRates) {
        const sendRate = exchangeRates.find(rate => rate.currency === sendCurrency).rate;
        const receiveRate = exchangeRates.find(rate => rate.currency === receiveCurrency).rate;
        unitRate = receiveRate / sendRate;
    }
    const receiveAmount = unitRate * sendAmount;

    function toggleFavorite() {
        const pair = `${sendCurrency}-${receiveCurrency}`;
        if (favorites.includes(pair)) {
            setFavorites(favorites.filter(fav => fav !== pair));
        } else {
            setFavorites([...favorites, pair]);
        }
    }

    function getLog() {
        return {
            datetime: new Date().toISOString(),
            sendCurrency,
            receiveCurrency,
            sendAmount,
            receiveAmount,
        };
    }

    function toggleLog() {
        const log = getLog();
        if (logs.find(l => JSON.stringify(l) === JSON.stringify(log))) {
            setLogs(logs.filter(l => JSON.stringify(l) !== JSON.stringify(log)));
            setLoggedFeedback(false);
        } else {
            setLogs([...logs, log]);
            setLoggedFeedback(true);
        }
    }

    function swapCurrencies() {
        const tempCurrency = sendCurrency;
        setSendCurrency(receiveCurrency);
        setSendAmount(receiveAmount);
        setReceiveCurrency(tempCurrency);
    }

    return (
        <section className="converter">
            <h2>Check the rate</h2>
            <div className={clsx("box", ratesLoading && "loading")}>
                <Form className="converter-form" aria-label="Currency converter">
                    <div className="amount-box amount-box--send">
                        <NumberField
                            className="amount-field"
                            value={sendAmount}
                            minValue={0}
                            step={0.0001}
                            onChange={setSendAmount}
                        >
                            <Label className="amount-label">Send</Label>
                            <Input className="amount-input" />
                        </NumberField>
                        <CurrencyPicker value={sendCurrency} onChange={setSendCurrency} />
                    </div>
                    <Button className="converter-swap" aria-label="Swap currencies" onClick={swapCurrencies}>
                        <SwapIcon />
                    </Button>
                    <div className="amount-box amount-box--receive">
                        <NumberField
                            className="amount-field"
                            value={receiveAmount}
                            minValue={0}
                            step={0.0001}
                            isReadOnly
                        >
                            <Label className="amount-label">Receive</Label>
                            <Input className="amount-input" />
                        </NumberField>
                        <CurrencyPicker value={receiveCurrency} onChange={setReceiveCurrency} />
                    </div>
                </Form>
                <div className="converter-info">
                    <div className="converter-rate">
                        1 {sendCurrency} = {unitRate.toFixed(4)} {receiveCurrency}
                    </div>
                    <div className="converter-buttons">
                        <StateButton
                            className="converter-button converter-favorite"
                            checked={isFavorite}
                            onClick={() => toggleFavorite()}
                        >
                            <StateButton.Off>
                                <StarIcon />
                                Favorite
                            </StateButton.Off>
                            <StateButton.On>
                                <StarFilledIcon />
                                Favorited
                            </StateButton.On>
                        </StateButton>
                        <StateButton
                            className="converter-button converter-log"
                            checked={loggedFeedback}
                            setChecked={setLoggedFeedback}
                            uncheckAfter={2000}
                            disabledWhenChecked={true}
                            onClick={() => toggleLog()}
                        >
                            <StateButton.Off>Log conversion</StateButton.Off>
                            <StateButton.On>
                                <CheckIcon />
                                Logged
                            </StateButton.On>
                        </StateButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
