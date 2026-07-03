import React from "react";

const ConversionContext = React.createContext({
    sendCurrency: "USD",
    setSendCurrency: () => {},
    sendAmount: 0,
    setSendAmount: () => {},
    receiveCurrency: "EUR",
    setReceiveCurrency: () => {},
});

export default ConversionContext;
