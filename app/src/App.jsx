import React from "react";

import "./App.css";
import Header from "./layouts/Header";
import Converter from "./layouts/Converter";
import DashboardTabs from "./layouts/DashboardTabs";

import useExchangeRates from "./hooks/useExchangeRates";
import useCurrencies from "./hooks/useCurrencies";
import useUserCountry from "./hooks/useUserCountry";
import useLocalStorage from "./hooks/useLocalStorage";

import ExchangeContext from "./context/ExchangeContext";
import ConversionContext from "./context/ConversionContext";
import MemoryContext from "./context/MemoryContext";

export default function App() {
    const { data: exchangeRates, isLoading: ratesLoading, error: ratesError } = useExchangeRates();
    const { data: currencies, isLoading: currenciesLoading, error: currenciesError } = useCurrencies();
    const { data: userCountry, isLoading: userCountryLoading, error: userCountryError } = useUserCountry();

    const [favorites, setFavorites] = useLocalStorage("favorites", []);
    const [logs, setLogs] = useLocalStorage("logs", []);
    const [sendCurrency, setSendCurrency] = React.useState("USD");
    const [sendAmount, setSendAmount] = React.useState(0);
    const [receiveCurrency, setReceiveCurrency] = React.useState("EUR");

    const fatalError = ratesError || currenciesError;

    return (
        <ExchangeContext.Provider
            value={{
                exchangeRates,
                ratesLoading,
                ratesError,
                currencies,
                currenciesLoading,
                currenciesError,
                userCountry,
                userCountryLoading,
                userCountryError,
            }}
        >
            <Header />
            <MemoryContext.Provider
                value={{
                    favorites: favorites,
                    setFavorites: setFavorites,
                    logs: logs,
                    setLogs: setLogs,
                }}
            >
                <ConversionContext.Provider
                    value={{
                        sendCurrency: sendCurrency,
                        setSendCurrency: setSendCurrency,
                        sendAmount: sendAmount,
                        setSendAmount: setSendAmount,
                        receiveCurrency: receiveCurrency,
                        setReceiveCurrency: setReceiveCurrency,
                    }}
                >
                    <main className="main">
                        {fatalError ? (
                            <div className="empty-feedback">
                                <div className="empty-title">Couldn't load exchange data</div>
                                <div className="empty-message">
                                    We couldn't load {ratesError && "exchange rates"}{" "}
                                    {ratesError && currenciesError && "and"} {currenciesError && "currency"}{" "}
                                    data right now. Please try again later.
                                </div>
                            </div>
                        ) : (
                            <>
                                <Converter />
                                <DashboardTabs />
                            </>
                        )}
                    </main>
                </ConversionContext.Provider>
            </MemoryContext.Provider>
        </ExchangeContext.Provider>
    );
}
