import { Col, Container, Row } from "react-bootstrap";
import Nav from "../nav/Navigation";
import CashDistribution from "./components/CashDistribution";
import CashFlow from "./components/CashFlow";
import IncomeAndExpense from "./components/IncomeAndExpense";
function Statistics() {
  return (
    <>
      <Nav />
      <Container fluid className="h-100 bg-light p-4">
        <Row className="mb-lg-4">
          <Col className="mb-4 mb-lg-0">
            <CashFlow />
          </Col>
        </Row>
        <Row className="mb-lg-4">
          <Col lg={6} className="mb-4 mb-lg-0">
            <IncomeAndExpense />
          </Col>
          <Col lg={6} className="mb-4 mb-lg-0">
            <CashDistribution />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Statistics;
