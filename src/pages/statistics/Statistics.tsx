import { Col, Container, Row } from "react-bootstrap";
import NavBar from "@/components/NavBar";
import CashFlow from "./components/CashFlow";
import IncomeAndExpense from "./components/IncomeAndExpense";
import CashDistribution from "./components/CashDistribution";
import { createContext, useEffect, useState } from "react";
import { Api } from "datatables.net-bs5";

export const PostContext = createContext<Array<any> | null>(null);
function Statistics() {
  const [post, setPost] = useState<Array<any> | null>(null);
  useEffect(() => {
    try {
      setPost(JSON.parse(localStorage.getItem("postTable") as string));
    } catch {}
  }, []);

  return (
    <>
      <NavBar />

      <PostContext.Provider value={post}>
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
      </PostContext.Provider>
    </>
  );
}

export default Statistics;
