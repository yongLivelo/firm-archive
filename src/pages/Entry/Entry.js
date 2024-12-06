import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, createContext, useContext } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import NavBar from "@/components/NavBar";
import Input from "./components/Input";
import Total from "./components/Total";
import FixedTable from "@/components/FixedTable";
import { AuthContext } from "@/App";
import { db } from "@/firebase/firebase";
// Context for Table Data
export const TableContext = createContext(null);
function Entry() {
    const [draft, setDraft] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useContext(AuthContext);
    useEffect(() => {
        const retrieveData = async () => {
            try {
                if (!user?.uid)
                    return;
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    draft?.rows.add(JSON.parse(docSnap.data().draft)).draw();
                    console.log(draft);
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
    }, [draft]);
    // Loading State
    if (loading) {
        return (_jsxs("div", { className: "vh-100 d-flex align-items-center justify-content-center flex-column", children: [_jsx(Spinner, { animation: "border", style: { width: "100px", height: "100px" }, role: "status", className: "mb-4" }), _jsx("h2", { children: "Loading Entry Contents..." })] }));
    }
    // Main Return
    return (_jsx(_Fragment, { children: _jsxs(TableContext.Provider, { value: { data: draft, setData: setDraft }, children: [_jsx(NavBar, {}), _jsx(Container, { fluid: true, className: "p-4", children: _jsxs(Row, { className: "mb-lg-4", children: [_jsxs(Col, { lg: 4, className: "mb-4 mb-lg-0 d-flex flex-column gap-3", children: [_jsx(Input, {}), _jsx(Total, {})] }), _jsx(Col, { lg: 8, className: "mb-4 mb-lg-0", children: _jsx(FixedTable, { tableId: { data: draft, setData: setDraft } }) })] }) }), _jsx(ToastContainer, { hideProgressBar: true, position: "top-center" })] }) }));
}
export default Entry;
