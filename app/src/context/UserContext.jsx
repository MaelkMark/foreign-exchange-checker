import React from "react";

const UserContext = React.createContext({
    favorites: [],
    setFavorites: () => {},
    logs: [],
    setLogs: () => {},

    sendCurrency: "USD",
    setSendCurrency: () => {},
    receiveCurrency: "EUR",
    setReceiveCurrency: () => {},
});

export default UserContext;
