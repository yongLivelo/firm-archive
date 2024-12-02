import { Col, Container, Row } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import CashFlow from "./components/CashFlow";
import IncomeAndExpense from "./components/IncomeAndExpense";
import CashDistribution from "./components/CashDistribution";
import { TableContext } from "../Entry/Entry";
import { useState } from "react";
import { Api } from "datatables.net-bs5";
function Statistics() {
  const [post, setPost] = useState<Api | null | undefined>(null);
  return (
    <>
      <NavBar />

      <TableContext.Provider value={{ data: post, setData: setPost }}>
        <Container fluid className="p-4">
          <Row className="mb-lg-4">
            <Col className="mb-4 mb-lg-0">
              <CashFlow />
            </Col>
          </Row>
          <Row className="mb-lg-4">
            <Col lg={8} className="mb-4 mb-lg-0">
              <IncomeAndExpense />
            </Col>
            <Col lg={4} className="mb-4 mb-lg-0">
              <CashDistribution />
            </Col>
          </Row>
        </Container>
      </TableContext.Provider>
    </>
  );
}

export default Statistics;
