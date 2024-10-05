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

      <Container className="bg-light p-4">
        <div className="row mb-lg-4">
          <div className="col-lg-8 mb-4 mb-lg-0 order-2 order-lg-1">
            <Input />
          </div>
          <div className="col-lg-4 mb-4 mb-lg-0 order-1 order-lg-2">
            <CreateTags />
          </div>
        </div>
        <div className="row mb-lg-4">
          <div className="col-lg-10 mb-4 mb-lg-0">
            <TableData />
          </div>
          <div className="col-lg-2 mb-4 mb-lg-0">
            <Total />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Entry;
