import { useQuery } from "@tanstack/react-query";
import countryAbbreviations from "country-json/src/country-by-abbreviation.json";
import countryCurrencies from "country-json/src/country-by-currency-code.json";

export default function useUserCountry() {
    return useQuery({
        queryKey: ["userCountry"],
        queryFn: async () => {
            
            try {
                const res = await fetch("https://free.freeipapi.com/api/json/");
                if (!res.ok) {
                    throw new Error("Failed to fetch user country");
                }
                const data = await res.json();
                return { country: data.countryCode, currency: data.currencies[0], fallback: false, error: null };
            } catch (error) {
                const locale = navigator.language || navigator.languages[0];
                const countryCode = locale.split("-")[1];
                const country = countryAbbreviations.find(c => c.abbreviation === countryCode)?.country;
                const currency = country
                    ? countryCurrencies.find(c => c.country === country)?.currency_code
                    : null;
                return { country: countryCode, currency: currency, fallback: true, error: error.message };
            }

        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
}
