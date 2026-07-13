import React from "react";

export default function useSearchParam(key, fallback) {
    const params = new URLSearchParams(window.location.search);
    const paramExists =
        params.has(key) &&
        params.get(key) !== null &&
        params.get(key) !== undefined &&
        params.get(key) !== "";

    const [param, setParam] = React.useState(() => {
        console.log("useSearchParam", key, params.get(key), fallback);
        return params.get(key) ?? fallback;
    });

    const updateURL = React.useCallback(
        newValue => {
            const params = new URLSearchParams(window.location.search);
            if (newValue === null || newValue === undefined || newValue === "") {
                params.delete(key);
            } else {
                params.set(key, newValue);
            }

            const searchString = params.toString();
            const newUrl = `${window.location.pathname}${searchString ? "?" + searchString : ""}${window.location.hash}`;
            window.history.replaceState({}, "", newUrl);
        },
        [key],
    );

    const updateParam = React.useCallback(
        newValue => {
            setParam(newValue);
            updateURL(newValue);
        },
        [updateURL],
    );

    React.useEffect(() => {
        if (!paramExists && fallback !== null) {
            updateURL(fallback);
        }
    }, [paramExists, fallback, updateURL]);

    React.useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setParam(params.get(key) ?? fallback);
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [key, fallback]);

    return [param, updateParam, paramExists];
}
