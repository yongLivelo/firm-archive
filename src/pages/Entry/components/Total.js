import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { Card, CardBody, Container, CardTitle, CardText, } from "react-bootstrap";
import { Flow } from "@/interface/Flow";
import { TableContext } from "../Entry";
function Total() {
    const table = useContext(TableContext);
    let [total, setTotal] = useState({
        amount: 0,
        expenses: 0,
        sales: 0,
    });
    table?.data?.on("draw", () => {
        const newTotal = {
            amount: 0,
            expenses: 0,
            sales: 0,
        };
        table?.data
            ?.data()
            .toArray()
            .forEach((el) => {
            switch (el.flow) {
                case Flow.Sale:
                    newTotal.sales += el.amount;
                    break;
                case Flow.Expense:
                    newTotal.expenses += el.amount;
                    break;
            }
        });
        newTotal.amount = newTotal.sales - newTotal.expenses;
        setTotal(newTotal);
    });
    return (_jsx(_Fragment, { children: _jsx(Card, { className: "shadow", children: _jsxs(CardBody, { children: [_jsxs(Container, { className: "fs-1", children: [_jsx(CardTitle, { children: "Total" }), _jsx(CardText, { children: total.amount >= 0
                                    ? `₱${total.amount}`
                                    : `-₱${Math.abs(total.amount)}` })] }), _jsx("hr", {}), _jsxs(Container, { children: [_jsx(CardTitle, { children: "Total Expenses" }), _jsxs(CardText, { children: [" \u20B1", total.expenses] })] }), _jsx("hr", {}), _jsxs(Container, { children: [_jsx(CardTitle, { children: "Total Sales" }), _jsxs(CardText, { children: [" \u20B1", total.sales] })] })] }) }) }));
}
export default Total;
