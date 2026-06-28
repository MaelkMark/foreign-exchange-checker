import React from "react";

const UserContext = React.createContext({
    favoritePairs: [],
    logs: []
});

export default UserContext;