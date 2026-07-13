import React from "react";

export default function useSearchParam(key, fallback, validate, validateAvailable = true) {
    const params = new URLSearchParams(window.location.search);
    const paramExists = params.has(key) && params.get(key) !== "";
    const initialValue = React.useRef(params.get(key));

    /**
     * Returns a valid value based on the following rules:
     * 1. If the parameter doesn't exist or validator function isn't available yet, return the fallback value.
     * 2. If validation isn't provided or fails, use fallback.
     */
    const getValidValue = React.useCallback(
        value => {
            // If the parameter doesn't exist or validator function isn't available yet, return the fallback value
            if (!paramExists || !validateAvailable) return fallback;

            // If validation isn't provided or fails, use fallback
            return !validate || validate(value) ? value : fallback;
        },
        [paramExists, validateAvailable, fallback, validate],
    );

    const [param, setParam] = React.useState(() => {
        return getValidValue(params.get(key));
    });

    /**
     * Updates the URL with the new value for the specified key. If the new value is null, undefined, or an empty string, the key is removed from the URL.
     */
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

    /**
     * Updates the parameter state and the URL with the new value.
     */
    const updateParam = React.useCallback(
        newValue => {
            setParam(newValue);
            updateURL(newValue);
        },
        [updateURL],
    );

    /**
     * Effect to update the URL when the component mounts or when the validator function changes (or becomes available).
     * It ensures that the URL reflects the current state of the parameter.
     * If the parameter doesn't exist or the current value is invalid, it updates the URL with a valid value.
     * It reevaluates the value as soon as the validator function becomes available, so it doesn't drop the parameter from the URL if it was valid but the validator function wasn't available yet.
     */
    React.useEffect(() => {
        const validValue = getValidValue(initialValue.current);
        updateParam(validValue);
    }, [getValidValue, updateParam]);

    React.useEffect(() => {
        const handlePopState = () => {
            const params = new URLSearchParams(window.location.search);
            setParam(getValidValue(params.get(key)));
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [key, getValidValue]);

    return [param, updateParam, paramExists];
}
