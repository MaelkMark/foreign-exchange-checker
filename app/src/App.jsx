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
import UserContext from "./context/UserContext";

export default function App() {
    const { data: exchangeRates, isLoading: ratesLoading, error: ratesError } = useExchangeRates();
    const { data: currencies, isLoading: currenciesLoading, error: currenciesError } = useCurrencies();
    const { data: userCountry, isLoading: userCountryLoading, error: userCountryError } = useUserCountry();

    const [favorites, setFavorites] = useLocalStorage("favorites", []);
    const [logs, setLogs] = useLocalStorage("logs", []);
    const [sendCurrency, setSendCurrency] = React.useState("USD");
    const [sendAmount, setSendAmount] = React.useState(0);
    const [receiveCurrency, setReceiveCurrency] = React.useState("EUR");

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
            <UserContext.Provider
                value={{
                    favorites: favorites,
                    setFavorites: setFavorites,
                    logs: logs,
                    setLogs: setLogs,
                    sendCurrency: sendCurrency,
                    setSendCurrency: setSendCurrency,
                    sendAmount: sendAmount,
                    setSendAmount: setSendAmount,
                    receiveCurrency: receiveCurrency,
                    setReceiveCurrency: setReceiveCurrency,
                }}
            >
                <main className="main">
                    <Converter />
                    <DashboardTabs />
                </main>
            </UserContext.Provider>
        </ExchangeContext.Provider>
    );
}
