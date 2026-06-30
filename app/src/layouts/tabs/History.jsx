import React from "react";

import Chart from "react-apexcharts";
import SegmentedControl from "../../components/SegmentedControl";

import useHistoricalRates from "../../hooks/useHistoricalRates";
import ExchangeContext from "../../context/ExchangeContext";
import UserContext from "../../context/UserContext";

import "./History.css";

export default function History() {
    const [interval, setInterval] = React.useState("1D");
    const { sendCurrency: baseCurrency, receiveCurrency: targetCurrency } = React.useContext(UserContext);
    const { data, isLoading, isError } = useHistoricalRates({
        base: baseCurrency,
        target: targetCurrency,
        interval,
    });

    const chartOptions = {
        chart: {
            type: "area",
            height: 350,
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },

        title: {
            text: "Fundamental Analysis of Stocks",
            align: "left",
        },
        subtitle: {
            text: "Price Movements",
            align: "left",
        },
        labels: data?.map(rate => rate.date) || [],
        xaxis: {
            type: "date",
            tickAmount: 5,
            labels: {
                hideOverlappingLabels: true,
            },
        },
        yaxis: {
            opposite: true,
        },
        legend: {
            horizontalAlign: "left",
        },
    };

    const series = [
        {
            name: `${baseCurrency}/${targetCurrency}`,
            data: data?.map(rate => rate.rate) || [],
        },
    ];

    return (
        <div className="history">
            <SegmentedControl selectedOption={interval} onSelect={setInterval}>
                <SegmentedControl.Item id="1D" value="1D">
                    1D
                </SegmentedControl.Item>
                <SegmentedControl.Item id="1W" value="1W">
                    1W
                </SegmentedControl.Item>
                <SegmentedControl.Item id="1M" value="1M">
                    1M
                </SegmentedControl.Item>
                <SegmentedControl.Item id="3M" value="3M">
                    3M
                </SegmentedControl.Item>
                <SegmentedControl.Item id="1Y" value="1Y">
                    1Y
                </SegmentedControl.Item>
                <SegmentedControl.Item id="5Y" value="5Y">
                    5Y
                </SegmentedControl.Item>
            </SegmentedControl>
            <Chart options={chartOptions} series={series} type="area" height={350} />
        </div>
    );
}
