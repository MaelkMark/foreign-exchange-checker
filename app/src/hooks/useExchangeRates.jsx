import { useQuery } from "@tanstack/react-query";
import flags from "../assets/images/flags/flags.json";

/**
 *
 * @returns Returns the exchange rates relative to USD and the % change in rates from yesterday to today.
 * `[{ base: string, currency: string, rate: number, change: number }]`
 */
export default function useExchangeRates() {
    const REFRESH = 1000 * 60 * 60; // 1 hour in milliseconds
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    return useQuery({
        queryKey: ["exchangeRates"],
        queryFn: async () => {
            const url = `https://api.frankfurter.dev/v2/rates?from=${yesterday}&to=${today}&base=USD`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch rates");
            return res.json();
        },
        staleTime: REFRESH,
        refetchInterval: REFRESH,
        refetchIntervalInBackground: false,
        select: data => {
            return Object.entries(Object.groupBy(data, item => item.quote))
                .map(([currency, items]) => {
                    const todayRate = items.find(item => item.date === today)?.rate ?? null;
                    const yesterdayRate = items.find(item => item.date === yesterday)?.rate ?? null;
                    const change =
                        todayRate !== null && yesterdayRate !== null
                            ? (todayRate / yesterdayRate - 1) * 100
                            : 0;
                    return {
                        base: items[0]?.base ?? "USD",
                        currency,
                        rate: todayRate ?? yesterdayRate,
                        change,
                    };
                })
                .filter(rate => {
                    return rate.currency.toUpperCase() in flags;
                });
        },
    });
}
