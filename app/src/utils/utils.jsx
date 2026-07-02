export function getUnitRate(exchangeRates, sendCurrency, receiveCurrency) {
    if (!exchangeRates || exchangeRates.length === 0 || !sendCurrency || !receiveCurrency) return 0;
    const sendRate = exchangeRates.find(rate => rate.currency === sendCurrency).rate;
    const receiveRate = exchangeRates.find(rate => rate.currency === receiveCurrency).rate;
    return receiveRate / sendRate;
}

export function toggleFavorite(favorites, setFavorites, sendCurrency, receiveCurrency) {
    const pair = `${sendCurrency}-${receiveCurrency}`;
    if (favorites.includes(pair)) {
        setFavorites(favorites.filter(fav => fav !== pair));
    } else {
        setFavorites([...favorites, pair]);
    }
}

export function fixedLengthNumber(num, length, includeSign = false) {
    const sign = num < 0 ? "-" : includeSign ? "+" : "";
    const numStr = Math.abs(parseFloat(num)).toFixed(length);
    const decimalIndex = numStr.indexOf(".");
    return (
        sign +
        (length <= decimalIndex + 1
            ? Math.round(numStr)
            : numStr.slice(0, length))
    );
}

export function getLog(sendCurrency, receiveCurrency, sendAmount, receiveAmount) {
        return {
            datetime: new Date().toISOString(),
            sendCurrency,
            receiveCurrency,
            sendAmount,
            receiveAmount,
        };
    }

export function addToLog(logs, setLogs, log) {
    setLogs([...logs, log]);
}

export function removeFromLog(logs, setLogs, log) {
    setLogs(logs.filter(l => JSON.stringify(l) !== JSON.stringify(log)));
}