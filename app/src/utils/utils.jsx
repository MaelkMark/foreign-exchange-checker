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
    return sign + numStr.slice(0, length);
}