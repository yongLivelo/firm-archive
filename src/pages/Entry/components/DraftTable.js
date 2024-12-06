import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import FixedTable from "@/components/FixedTable";
import { useContext, useEffect } from "react";
import { TableContext } from "@/pages/Entry/Entry";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { AuthContext } from "@/App";
export default function DraftTable() {
    const mainTable = useContext(TableContext);
    const user = useContext(AuthContext);
    useEffect(() => {
        const retrieveData = async () => {
            try {
                if (!user?.uid)
                    return;
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    mainTable?.data?.rows.add(JSON.parse(docSnap.data().draft)).draw();
                }
            }
            catch (error) {
                console.error("Error parsing draftTable from localStorage:", error);
            }
        };
        if (user) {
            retrieveData();
        }
    }, [mainTable]);
    return (_jsx(_Fragment, { children: _jsx(FixedTable, { tableId: mainTable }) }));
}
