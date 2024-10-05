import CreateTags from "./components/CreateTags";
import Input from "./components/Input";
import TableData from "./components/TableData";
import Total from "./components/Total";

import Nav from "../nav/Nav";
import { Container, Row, Col } from "react-bootstrap";

function Entry() {
  return (
    <>
      <Nav></Nav>

      <Container fluid className="bg-light p-4">
        <Row className="mb-lg-4">
          <Col lg={8} className="mb-4 mb-lg-0 order-2 order-lg-1">
            <Input />
          </Col>
          <Col lg={4} className="mb-4 mb-lg-0 order-1 order-lg-2">
            <CreateTags />
          </Col>
        </Row>
        <Row className="mb-lg-4">
          <Col lg={10} className="mb-4 mb-lg-0">
            <TableData />
          </Col>
          <Col lg={2} className="mb-4 mb-lg-0">
            <Total />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Entry;
