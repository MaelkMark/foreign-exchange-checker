import { useQuery } from "@tanstack/react-query";
import flags from "../assets/images/flags/flags.json";

function getCurrencyIconUrl(iso_code) {
    const name = flags[iso_code.toUpperCase()];
    if (!name) return null;

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
