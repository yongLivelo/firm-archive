import { AuthContext } from "@/App";
import FixedTable from "@/components/FixedTable/FixedTable";
import Nav from "@/components/NavBar";
import { db } from "@/firebase/firebase";
import { TableContextType } from "@/interface/TableContextType";
import { Api } from "datatables.net";
import { doc, getDoc } from "firebase/firestore";

import { useContext, useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";

function Archive() {
  const [post, setPost] = useState<Api | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      retrieveData();
    }
  }, [mainTable]);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
        <Spinner
          animation="border"
          style={{ width: "100px", height: "100px" }}
          role="status"
          className="mb-4"
        />
        <h2>Loading Archive Contents...</h2>
      </div>
    );
  }
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
