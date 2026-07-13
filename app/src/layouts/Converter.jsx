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
import ConversionContext from "../context/ConversionContext";
import MemoryContext from "../context/MemoryContext";

import { getUnitRate, toggleFavorite, getLog, addToLog } from "../utils/utils";

import "./Converter.css";

export default function Converter() {
    const [loggedFeedback, setLoggedFeedback] = React.useState(false);
    const { exchangeRates, ratesLoading, userCountryLoading } = React.useContext(ExchangeContext);
    const { sendCurrency, setSendCurrency, sendAmount, setSendAmount, receiveCurrency, setReceiveCurrency } =
        React.useContext(ConversionContext);

    const { favorites, setFavorites, logs, setLogs } = React.useContext(MemoryContext);

    const isFavorite = favorites.includes(`${sendCurrency}-${receiveCurrency}`);

    const unitRate = getUnitRate(exchangeRates, sendCurrency, receiveCurrency);
    const receiveAmount = unitRate * sendAmount;
    const isUnfilled = sendAmount === 0 || isNaN(sendAmount) || !sendCurrency || !receiveCurrency;

    const handleSendCurrencyChange = React.useCallback(
        (newSendCurrency, previousSendCurrency) => {
            if (newSendCurrency === receiveCurrency) {
                setReceiveCurrency(previousSendCurrency);
            }
            setSendCurrency(newSendCurrency);
        },
        [receiveCurrency, setReceiveCurrency, setSendCurrency],
    );

    const handleReceiveCurrencyChange = React.useCallback(
        (newReceiveCurrency, previousReceiveCurrency) => {
            if (newReceiveCurrency === sendCurrency) {
                setSendCurrency(previousReceiveCurrency);
            }
            setReceiveCurrency(newReceiveCurrency);
        },
        [sendCurrency, setSendCurrency, setReceiveCurrency],
    );

    const log = React.useCallback(() => {
        const log = getLog(sendCurrency, receiveCurrency, sendAmount, receiveAmount);
        addToLog(logs, setLogs, log);
        setLoggedFeedback(true);
    }, [sendCurrency, receiveCurrency, sendAmount, receiveAmount, logs, setLogs]);

    const swapCurrencies = React.useCallback(() => {
        const tempCurrency = sendCurrency;
        setSendCurrency(receiveCurrency);
        setSendAmount(receiveAmount);
        setReceiveCurrency(tempCurrency);
    }, [sendCurrency, receiveCurrency, receiveAmount, setSendCurrency, setSendAmount, setReceiveCurrency]);

    return (
        <section className="converter">
            <h2>Check the rate</h2>
            <div className={clsx("box", ratesLoading && "loading")} aria-busy={ratesLoading} aria-live="polite">
                <Form className="converter-form" aria-label="Currency converter">
                    <div className="amount-box amount-box--send">
                        <NumberField
                            className="amount-field"
                            value={sendAmount}
                            minValue={0}
                            step={0.001}
                            onChange={setSendAmount}
                            placeholder={0}
                        >
                            <Label className="amount-label">Send</Label>
                            <Label className="amount-focus-label" aria-hidden="true"></Label>
                            <Input className="amount-input" />
                        </NumberField>
                        <CurrencyPicker
                            value={sendCurrency}
                            onChange={handleSendCurrencyChange}
                            className={userCountryLoading ? "loading" : ""}
                            aria-busy={userCountryLoading}
                        />
                    </div>
                    <Button className="converter-swap" aria-label="Swap currencies" onClick={swapCurrencies}>
                        <SwapIcon />
                    </Button>
                    <div className="amount-box amount-box--receive">
                        <NumberField
                            className="amount-field"
                            value={receiveAmount}
                            minValue={0}
                            step={0.001}
                            placeholder={0}
                            isReadOnly
                        >
                            <Label className="amount-label">Receive</Label>
                            <Label className="amount-focus-label" aria-hidden="true"></Label>
                            <Input className="amount-input" />
                        </NumberField>
                        <CurrencyPicker
                            value={receiveCurrency}
                            onChange={handleReceiveCurrencyChange}
                            className={userCountryLoading ? "loading" : ""}
                            aria-busy={userCountryLoading}
                        />
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
                            onClick={() =>
                                toggleFavorite(favorites, setFavorites, sendCurrency, receiveCurrency)
                            }
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
                            uncheckAfter={1000}
                            disabledWhenChecked={true}
                            onClick={() => log()}
                            isDisabled={isUnfilled}
                            aria-label="Log conversion"
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
