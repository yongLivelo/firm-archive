import Input from "./components/Input";
import DraftTable from "./components/DraftTable";
import Total from "./components/Total";
import NavBar from "@/components/NavBar";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import { createContext, useEffect, useState } from "react";
import { Api } from "datatables.net-bs5";
import { TableContextType } from "@/interface/TableContextType";

export const TableContext = createContext<TableContextType | null>(null);

function Entry() {
  const [draft, setDraft] = useState<Api | null | undefined>(null);

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
              <DraftTable />
            </Col>
          </Row>
        </Container>

        <ToastContainer hideProgressBar position="top-center" />
      </TableContext.Provider>
    </>
  );
}

export default Entry;
