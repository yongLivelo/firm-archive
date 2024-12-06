import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import CashFlow from "./components/CashFlow";
import IncomeAndExpense from "./components/IncomeAndExpense";
import CashDistribution from "./components/CashDistribution";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "@/App";
export const PostContext = createContext(null);
function Statistics() {
    const user = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const retrieveData = async () => {
            if (!user?.uid)
                return;
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPost(JSON.parse(docSnap.data().draft));
                }
            }
            catch (error) {
                console.error("Error parsing draftTable from localStorage:", error);
            }
            finally {
                setLoading(false);
            }
        };
        if (user) {
            retrieveData();
        }
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "vh-100 d-flex align-items-center justify-content-center flex-column", children: [_jsx(Spinner, { animation: "border", style: { width: "100px", height: "100px" }, role: "status", className: "mb-4" }), _jsx("h2", { children: "Loading Statistics Content..." })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsx(PostContext.Provider, { value: post, children: _jsxs(Container, { fluid: true, className: "p-4", children: [_jsx(Row, { className: "mb-lg-4", children: _jsx(Col, { className: "mb-4 mb-lg-0", children: _jsx(CashFlow, {}) }) }), _jsxs(Row, { className: "mb-lg-4", children: [_jsx(Col, { lg: 8, className: "mb-4 mb-lg-0", children: _jsx(IncomeAndExpense, {}) }), _jsx(Col, { lg: 4, className: "mb-4 mb-lg-0", children: _jsx(CashDistribution, {}) })] })] }) })] }));
}
export default Statistics;
function retrieveData() {
    throw new Error("Function not implemented.");
}
