import React from "react";

import "./App.css";
import Header from "./layouts/Header";
import Converter from "./layouts/Converter";
import DashboardTabs from "./layouts/DashboardTabs";

import useExchangeRates from "./hooks/useExchangeRates";
import useCurrencies from "./hooks/useCurrencies";
import useUserCountry from "./hooks/useUserCountry";

import ExchangeContext from "./context/ExchangeContext";

export default function App() {
    const { data: exchangeRates, isLoading: ratesLoading, error: ratesError } = useExchangeRates();
    const { data: currencies, isLoading: currenciesLoading, error: currenciesError } = useCurrencies();
    const { data: userCountry, isLoading: userCountryLoading, error: userCountryError } = useUserCountry();

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
            <main className="main">
                <Converter />
                <DashboardTabs />
            </main>
        </ExchangeContext.Provider>
    );
}
