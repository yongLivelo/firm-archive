import CreateTags from "./components/CreateTags";
import Input from "./components/Input";
import TableData from "./components/TableData";
import Total from "./components/Total";
import { ToastContainer } from "react-toastify";
import Nav from "../nav/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
function Entry() {
  const [savedTags, setSavedTags] = useState();

  return (
    <>
      <Nav></Nav>
      <Container fluid className="vh-100  bg-light p-4">
        <Row className="mb-lg-4">
          <Col lg={7} className="mb-4 mb-lg-0 order-2 order-lg-1">
            <Input savedTags={savedTags} />
          </Col>
          <Col lg={5} className="mb-4 mb-lg-0 order-1 order-lg-2">
            <CreateTags setSavedTags={setSavedTags} />
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
      <ToastContainer position="top-center" />
      <ToastContainer position="top-left" />
    </>
  );
}

export default Entry;
