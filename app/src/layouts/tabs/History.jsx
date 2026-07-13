import React from "react";
import clsx from "clsx";
import { fixedLengthNumber } from "../../utils/utils";

import Chart from "react-apexcharts";
import SegmentedControl from "../../components/SegmentedControl";

import useHistoricalRates from "../../hooks/useHistoricalRates";
import ConversionContext from "../../context/ConversionContext";

import "./History.css";

export default function History() {
    const rootStyles = window.getComputedStyle(document.documentElement);
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
        colors: [rootStyles.getPropertyValue("--clr-lime-500")],
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
                gradientToColors: [rootStyles.getPropertyValue("--clr-lime-800")],
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0,
                stops: [0, 100],
            },
        },
        grid: {
            borderColor: rootStyles.getPropertyValue("--clr-neutral-500"),
            strokeDashArray: 4,
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
                left: 16,
                right: 0,
                top: 0,
                bottom: 16,
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
                minHeight: 0,
                maxHeight: 4,
                datetimeUTC: false,
                format: "MMM dd",
                style: {
                    colors: rootStyles.getPropertyValue("--clr-neutral-100"),
                    fontSize: "10px",
                    fontWeight: 400,
                },
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            tickAmount: 2,
            decimalsInFloat: 4,
            labels: {
                align: "left",
                minWidth: 0,
                maxWidth: 37,
                formatter: value => value.toFixed(4),
                style: {
                    colors: rootStyles.getPropertyValue("--clr-neutral-100"),
                    fontSize: "10px",
                    fontWeight: 400,
                },
            },
        },
        tooltip: {
            theme: "dark",
            shared: true,
            x: { format: "MMM dd, yyyy" },
        },
        legend: {
            show: false,
        },
    };

    const [interval, setInterval] = React.useState("1M");
    const { sendCurrency: baseCurrency, receiveCurrency: targetCurrency } =
        React.useContext(ConversionContext);
    const {
        data,
        isLoading: dataLoading,
        isError: dataError,
    } = useHistoricalRates({
        base: baseCurrency,
        target: targetCurrency,
        interval,
    });

    if (dataError) {
        return (
            <div className="empty-feedback history">
                <div className="empty-title">No chart data available</div>
                <p className="empty-message">
                    We couldn't load rate history for {baseCurrency}/{targetCurrency} right now.
                </p>
            </div>
        );
    }

    const chartSteps = data?.length ? Math.max(1, Math.floor(data.length / 370)) : 1;
    const series = [
        {
            name: `${baseCurrency}/${targetCurrency}`,
            data: data?.filter((_, index) => index % chartSteps === 0) || [],
        },
    ];

    const openRate = data?.[0]?.y || 0;
    const lastRate = data?.[data.length - 1]?.y || 0;
    const change = lastRate - openRate;
    const changePercentage = openRate && lastRate ? (lastRate / openRate - 1) * 100 : 0;

    return (
        <div className="history">
            <div className="history-header">
                <div className="history-stats">
                    <div className="history-stat">
                        <div className="history-stat-label" id="history-stat-open-label">Open</div>
                        <div className={clsx("history-stat-value", dataLoading && "loading")} aria-labelledby="history-stat-open-label">
                            {openRate.toFixed(4)}
                        </div>
                    </div>
                    <div className="history-stat">
                        <div className="history-stat-label" id="history-stat-last-label">Last</div>
                        <div className={clsx("history-stat-value", dataLoading && "loading")} aria-labelledby="history-stat-last-label">
                            {lastRate.toFixed(4)}
                        </div>
                    </div>
                    <div className="history-stat">
                        <div className="history-stat-label" id="history-stat-change-label">Change</div>
                        <div
                            className={clsx(
                                "history-stat-value",
                                dataLoading && "loading",
                                change >= 0 ? "change-up" : "change-down",
                            )}
                            aria-labelledby="history-stat-change-label"
                        >
                            {fixedLengthNumber(change, 4, true)}
                        </div>
                    </div>
                    <div className="history-stat">
                        <div className="history-stat-label" id="history-stat-change-percentage-label">% Change</div>
                        <div
                            className={clsx(
                                "history-stat-value",
                                dataLoading && "loading",
                                changePercentage >= 0 ? "change-up" : "change-down",
                            )}
                            aria-labelledby="history-stat-change-percentage-label"
                        >
                            {changePercentage >= 0 ? "▲" : "▼"} {fixedLengthNumber(changePercentage, 4, true)}
                            %
                        </div>
                    </div>
                </div>
                <SegmentedControl selectedOption={interval} onSelect={setInterval} aria-label="Select chart interval">
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
            </div>
            <div className={clsx("history-chart", dataLoading && "loading")}>
                <div className="history-chart-header">
                    <div className="history-chart-currencies" aria-label={`Currency pair: ${baseCurrency} to ${targetCurrency}`}>
                        {baseCurrency}/{targetCurrency}
                    </div>
                    <div className="history-chart-info">
                        {data?.[data.length - 1]?.y.toFixed(4)}
                        {" · "}
                        {data?.[data.length - 1]?.x &&
                            new Date(data[data.length - 1].x).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: false,
                                timeZoneName: "short",
                            })}
                    </div>
                </div>
                <Chart options={chartOptions} series={series} type="area" height={300} />
            </div>
        </div>
    );
}
