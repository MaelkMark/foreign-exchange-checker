import React from "react";

import "./App.css";
import Header from "./layouts/Header";
import Converter from "./layouts/Converter";
import DashboardTabs from "./layouts/DashboardTabs";

import useExchangeRates from "./hooks/useExchangeRates";
import useCurrencies from "./hooks/useCurrencies";

import ExchangeContext from "./context/ExchangeContext";

export default function App() {
    const { data: exchangeRates, isLoading: ratesLoading, error: ratesError } = useExchangeRates();
    const { data: currencies, isLoading: currenciesLoading, error: currenciesError } = useCurrencies();

    return (
        <ExchangeContext.Provider
            value={{
                exchangeRates,
                ratesLoading,
                ratesError,
                currencies,
                currenciesLoading,
                currenciesError,
            }}
        >
            <Header />
            <main className="main">
                <Converter />
                <DashboardTabs />
            </main>
        </ExchangeContext.Provider>
    );
}
