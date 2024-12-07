import FixedTable from "@/components/FixedTable";
import { TableContextType } from "@/interface/TableContextType";
import { useContext, useEffect, useState } from "react";
import { TableContext } from "@/pages/Entry/Entry";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { AuthContext } from "@/App";

export default function DraftTable() {
  const mainTable = useContext(TableContext) as TableContextType;
  const user = useContext(AuthContext);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        if (!user?.uid) return;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          mainTable?.data?.rows.add(JSON.parse(docSnap.data().draft)).draw();
        }
      } catch (error) {
        console.error("Error parsing draftTable from localStorage:", error);
      }
    };

    if (user) {
      retrieveData();
    }
  }, [mainTable]);

  return (
    <>
<<<<<<< HEAD
      {" "}
=======
>>>>>>> parent of e14d0ed (Revert "firebase deployment implementation")
      <FixedTable tableId={mainTable} />
    </>
  );
}
