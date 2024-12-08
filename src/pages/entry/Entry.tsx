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
import { TableContextType } from "@/interface/TableContextType";
import { Api } from "datatables.net-bs5";

export const TableContext = createContext<TableContextType | null>(null);

function Entry() {
  const [draft, setDraft] = useState<Api | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const user = useContext(AuthContext);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        if (!user?.uid) return;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          draft?.rows.add(await JSON.parse(docSnap.data().draft)).draw();
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
  }, [draft]);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
        <Spinner
          animation="border"
          style={{ width: "100px", height: "100px" }}
          role="status"
          className="mb-4"
        />
        <h2>Loading Entry Contents...</h2>
      </div>
    );
  }

  return (
    <>
      <TableContext.Provider value={{ data: draft, setData: setDraft }}>
        <NavBar />
        <Container fluid className="p-4">
          <Row className="mb-lg-4">
            <Col lg={4} className="mb-4 mb-lg-0 d-flex flex-column gap-3">
              <Input />
              <Total />
            </Col>
            <Col lg={8} className="mb-4 mb-lg-0">
              <FixedTable tableId={{ data: draft, setData: setDraft }} />
            </Col>
          </Row>
        </Container>
        <ToastContainer hideProgressBar position="top-center" />
      </TableContext.Provider>
    </>
  );
}

export default Entry;
