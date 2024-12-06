import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardBody, Button, CardFooter, ButtonGroup, ToggleButton, } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "../Statistics";
ChartJS.register();
export default function CashFlow() {
    const chartRef = useRef(null);
    const datas = useContext(PostContext);
    const download = () => {
        if (chartRef.current) {
            const url = chartRef.current.toBase64Image();
            const a = document.createElement("a");
            a.href = url;
            a.download = "chart.png";
            a.click();
        }
    };
    const dateMapped = datas?.map((row, i) => {
        return row.date;
    });
    const amountMapped = datas?.map((row, i) => {
        return row.amount;
    });
    const data = {
        labels: dateMapped,
        datasets: [
            {
                label: "Sales",
                data: amountMapped,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sales Over Time",
            },
        },
    };
    const [timeInterval, setTimeInterval] = useState("1s");
    useEffect(() => {
        console.log(timeInterval);
    }, [timeInterval]);
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: "Cash Flow" }), _jsx(CardBody, { children: _jsx("div", { style: { height: "500px" }, children: _jsx(Line, { ref: chartRef, data: data, options: options }) }) }), _jsx(CardFooter, { children: _jsxs("div", { className: "d-flex flex-wrap justify-content-between", children: [_jsx("div", { children: _jsx(Button, { onClick: download, children: "Download" }) }), _jsx("div", { children: _jsx(Controls, { timeInterval: timeInterval, setTimeInterval: setTimeInterval }) })] }) })] }));
}
function Controls({ timeInterval, setTimeInterval }) {
    const timeIntervalOptions = [
        "1s",
        "15m",
        "1h",
        "4h",
        "1d",
        "3d",
        "1mo",
        "6mo",
        "1y",
    ];
    return (_jsx(ButtonGroup, { children: timeIntervalOptions.map((radio, id) => (_jsx(ToggleButton, { id: `timeInterval-${id}`, type: "radio", value: radio, checked: radio === timeInterval, onChange: (e) => setTimeInterval(e.currentTarget.value), children: radio }, id))) }));
}
