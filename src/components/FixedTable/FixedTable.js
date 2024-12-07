import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import DataTable from "datatables.net-react";
import "datatables.net-bs5";
import DT from "datatables.net-bs5";
import "./style.scss";
import "datatables.net-buttons-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-select-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import { Card, CardBody } from "react-bootstrap";
DataTable.use(DT);
export default function FixedTable({ tableId, showButtons = false, }) {
    const tableRef = useRef(null);
    const mainTable = tableId;
    const columns = [
        { data: "code", title: "Code" },
        {
            data: "date",
            title: "Date",
            render: DT.render.datetime(),
        },
        { data: "flow", title: "Flow" },
        { data: "mode", title: "Mode" },
        {
            data: "amount",
            title: "Amount",
            render: (data, type) => {
                if (type === "display") {
                    return `₱${data.toFixed(2)}`;
                }
                return data;
            },
        },
        {
            data: "description",
            title: "Description",
            render: (data, type) => type === "display" && (!data || data.trim() === "")
                ? "No Description"
                : data,
        },
    ];
    useEffect(() => {
        mainTable?.setData(tableRef.current?.dt());
    }, []);
    return (_jsx(Card, { className: "shadow", children: _jsx(CardBody, { children: _jsx("div", { className: "table-responsive", style: { overflowX: "hidden" }, children: _jsx(DataTable, { className: "display table", options: {
                        dom: showButtons ? "Bfrtip" : "frtip",
                        columns,
                        responsive: true,
                        select: !showButtons,
                        layout: {
                            topStart: "buttons",
                        },
                        buttons: ["copy", "csv", "excel", "pdf", "print"],
                    }, ref: tableRef, children: _jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { scope: "col", children: "Code" }), _jsx("th", { scope: "col", children: "Date" }), _jsx("th", { scope: "col", children: "Flow" }), _jsx("th", { scope: "col", children: "Mode" }), _jsx("th", { scope: "col", children: "Amount" }), _jsx("th", { scope: "col", children: "Description" })] }) }) }) }) }) }));
}
