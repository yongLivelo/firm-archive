import { AuthContext } from "@/App";
import FixedTable from "@/components/FixedTable/FixedTable";
import Nav from "@/components/NavBar";
import { db } from "@/firebase/firebase";
import { TableContextType } from "@/interface/TableContextType";
import { Api } from "datatables.net";
import { doc, getDoc } from "firebase/firestore";

import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function Archive() {
  const [post, setPost] = useState<Api | null | undefined>(null);
  const mainTable: TableContextType = { data: post, setData: setPost };
  const user = useContext(AuthContext);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        if (!user?.uid) return;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          mainTable?.data?.rows.add(JSON.parse(docSnap.data().post)).draw();
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
      <Nav />
      <Container className="p-4">
        <FixedTable tableId={mainTable} showButtons />
      </Container>
    </>
  );
}

export default Archive;
