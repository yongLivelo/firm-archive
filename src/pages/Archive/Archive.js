import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AuthContext } from "@/App";
import FixedTable from "@/components/FixedTable";
import Nav from "@/components/NavBar";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
function Archive() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const mainTable = { data: post, setData: setPost };
    const user = useContext(AuthContext);
    useEffect(() => {
        const retrieveData = async () => {
            try {
                if (!user?.uid)
                    return;
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    mainTable?.data?.rows.add(JSON.parse(docSnap.data().post)).draw();
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
    }, [mainTable]);
    if (loading) {
        return (_jsxs("div", { className: "vh-100 d-flex align-items-center justify-content-center flex-column", children: [_jsx(Spinner, { animation: "border", style: { width: "100px", height: "100px" }, role: "status", className: "mb-4" }), _jsx("h2", { children: "Loading Archive Contents..." })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Nav, {}), _jsx(Container, { className: "p-4", children: _jsx(FixedTable, { tableId: mainTable, showButtons: true }) })] }));
}
export default Archive;
