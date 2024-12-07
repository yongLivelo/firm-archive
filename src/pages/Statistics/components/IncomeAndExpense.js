import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardBody, CardFooter, Button, ButtonGroup, ToggleButton, } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useContext, useRef, useState } from "react";
import { PostContext } from "../Statistics";
import { Flow } from "@/interface/Flow";
ChartJS.register();
function IncomeAndExpense() {
    const datas = useContext(PostContext) || [];
    const chartRef = useRef(null);
    const download = () => {
        if (chartRef.current) {
            const url = chartRef.current.toBase64Image();
            const a = document.createElement("a");
            a.href = url;
            a.download = "income_and_expense_chart.png";
            a.click();
        }
    };
    // Filter and map data safely
    const expenseData = datas
        .filter((row) => row.flow === Flow.Expense)
        .map((row) => row.amount);
    const salesData = datas
        .filter((row) => row.flow === Flow.Sale)
        .map((row) => row.amount);
    const data = {
        labels: ["A", "B", "C"],
        datasets: [
            {
                label: "Income",
                data: salesData,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Expense",
                data: expenseData,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
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
            tooltip: {
                enabled: true,
            },
        },
    };
    const [timeInterval, setTimeInterval] = useState("Daily");
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: "Income and Expense" }), _jsx(CardBody, { children: _jsx("div", { style: { minHeight: "300px", maxHeight: "400px" }, className: "d-flex justify-content-center align-items-center", children: datas.length ? (_jsx(Bar, { ref: chartRef, data: data, options: options })) : (_jsx("h1", { className: "", children: "No Data" })) }) }), _jsx(CardFooter, { children: _jsxs("div", { className: "d-flex flex-wrap justify-content-between ", children: [_jsx(Button, { onClick: download, children: "Download" }), _jsx(Controls, { timeInterval: timeInterval, setTimeInterval: setTimeInterval })] }) })] }));
}
export default IncomeAndExpense;
function Controls({ timeInterval, setTimeInterval }) {
    const timeIntervalOptions = [
        "Daily",
        "Weekly",
        "Monthly",
        "Semi-Annually",
        "Annually",
    ];
    return (_jsx(ButtonGroup, { children: timeIntervalOptions.map((interval, id) => (_jsx(ToggleButton, { id: `timeIntervals-${id}`, type: "radio", value: interval, checked: interval === timeInterval, onChange: (e) => setTimeInterval(e.currentTarget.value), children: interval }, id))) }));
}
