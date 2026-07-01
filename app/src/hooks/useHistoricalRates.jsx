import { useQuery } from "@tanstack/react-query";

function getRange(interval) {
    const to = new Date();
    let from = new Date(to);
    switch (interval.toUpperCase()) {
        case "1D":
            from.setDate(to.getDate() - 1);
            break;
        case "1W":
            from.setDate(to.getDate() - 7);
            break;
        case "1M":
            from.setMonth(to.getMonth() - 1);
            break;
        case "3M":
            from.setMonth(to.getMonth() - 3);
            break;
        case "1Y":
            from.setFullYear(to.getFullYear() - 1);
            break;
        case "5Y":
            from.setFullYear(to.getFullYear() - 5);
            break;
    }

    return { from: from.toISOString().split("T")[0], to: to.toISOString().split("T")[0] };
}

export default function useHistoricalRates({ base, target, interval }) {
    const isLongTerm = ["1Y", "5Y"].includes(interval);
    const { from, to } = getRange(isLongTerm ? "5Y" : "3M");

    return useQuery({
        queryKey: ["historicalRates", base, target, isLongTerm],
        queryFn: async () => {
            const url =
                `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${target}&from=${from}&to=${to}` +
                (isLongTerm ? "&group=week" : "");
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch historical rates");
            return res.json();
        },
        staleTime: Infinity,
        gcTime: Infinity,
        select: data => {
            const { from } = getRange(interval);
            return data
                .filter(rate => new Date(rate.date) >= new Date(from))
                .map(rate => ({
                    x: new Date(rate.date).getTime(),
                    y: rate.rate,
                }));
        },
    });
}
