import React from "react";

const UserContext = React.createContext({
    favorites: [],
    setFavorites: () => {},
    logs: [],
    setLogs: () => {},

    sendCurrency: "USD",
    setSendCurrency: () => {},
    sendAmount: 0,
    setSendAmount: () => {},
    receiveCurrency: "EUR",
    setReceiveCurrency: () => {},
});

export default UserContext;
