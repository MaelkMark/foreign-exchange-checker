import React from "react";

import Chart from "react-apexcharts";
import SegmentedControl from "../../components/SegmentedControl";

import useHistoricalRates from "../../hooks/useHistoricalRates";
import UserContext from "../../context/UserContext";

import "./History.css";

export default function History() {
    const [interval, setInterval] = React.useState("1D");
    const { sendCurrency: baseCurrency, receiveCurrency: targetCurrency } = React.useContext(UserContext);
    const { data } = useHistoricalRates({
        base: baseCurrency,
        target: targetCurrency,
        interval,
    });

    const chartData = React.useMemo(
        () =>
            data?.map(rate => ({
                x: new Date(rate.date).getTime(),
                y: rate.rate,
            })) || [],
        [data],
    );

    const chartOptions = {
        chart: {
            type: "area",
            background: "transparent",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        colors: ["#CEF739"],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
            width: 2.5,
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                shadeIntensity: 0.35,
                type: "vertical",
                gradientToColors: ["#283300"],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [0, 100],
            },
        },
        grid: {
            borderColor: "#2E2E2E",
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        },
        markers: {
            size: 0,
            hover: {
                size: 0,
            },
        },
        xaxis: {
            type: "datetime",
            tickAmount: 5,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: false,
            },
            labels: {
                datetimeUTC: false,
                format: "MMM dd",
                style: {
                    colors: "#9D9D9D",
                    fontSize: "10px",
                    fontWeight: 400,
                },
            },
        },
        yaxis: {
            tickAmount: 2,
            decimalsInFloat: 4,
            labels: {
                formatter: value => value.toFixed(4),
                offsetX: -4,
                style: {
                    colors: "#9D9D9D",
                    fontSize: "10px",
                    fontWeight: 400,
                },
            },
        },
        tooltip: {
            theme: "dark",
        },
        legend: {
            show: false,
        },
    };

    const series = [
        {
            name: `${baseCurrency}/${targetCurrency}`,
            data: chartData,
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
            <div className="history__chart">
                <Chart options={chartOptions} series={series} type="area" height={300} />
            </div>
        </div>
    );
}
