import React from "react";

const ExchangeContext = React.createContext({
    currencies: [],
    currenciesLoading: true,
    currenciesError: null,
    rates: {},
    ratesLoading: true,
    ratesError: null,
});

export default ExchangeContext;