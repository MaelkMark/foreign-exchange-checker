import React from "react";

const MemoryContext = React.createContext({
    favorites: [],
    setFavorites: () => {},
    logs: [],
    setLogs: () => {},
});

export default MemoryContext;
