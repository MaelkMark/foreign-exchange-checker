import { useQuery } from "@tanstack/react-query";
import countryAbbreviations from "country-json/src/country-by-abbreviation.json";
import countryCurrencies from "country-json/src/country-by-currency-code.json";
import flags from "../assets/images/flags/flags.json";

function getCurrencyIconUrl(iso_code) {
    const country = countryCurrencies.find(c => c.currency_code === iso_code);
    if (!country) return null;

    const countryAbbreviation = countryAbbreviations.find(c => c.country === country.country);
    if (!countryAbbreviation) return null;

    const name = countryAbbreviation.abbreviation.toLowerCase();
    if (!flags.includes(name)) return null;

    return new URL(`../assets/images/flags/${name}.webp`, import.meta.url).href;
}

export default function useCurrencies() {
    return useQuery({
        queryKey: ["currencies"],
        queryFn: async () => {
            const res = await fetch("https://api.frankfurter.dev/v2/currencies");
            if (!res.ok) throw new Error("Failed to fetch currency list");
            return res.json();
        },

        staleTime: Infinity,
        gcTime: Infinity,
        select: data => {
            return data
                .map(({ iso_code, name }) => ({
                    code: iso_code,
                    name,
                    icon: getCurrencyIconUrl(iso_code),
                }))
                .filter(currency => currency.icon !== null);
        },
    });
}
