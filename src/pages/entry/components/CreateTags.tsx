import {
  Button,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
} from "react-bootstrap";

function CreateTags() {
  return (
    <>
      <Card className="shadow">
        <CardHeader>
          <h2>Tags</h2>
        </CardHeader>
        <CardBody style={{ height: "300px", overflowY: "auto" }}>
          <Row className="mb-4">
            <CardTitle>Sales</CardTitle>
            <div className="">
              <div></div>
              <div className="d-flex gap-2">
                <Button className="square">+</Button>
                <Button className="square">-</Button>
              </div>
            </div>
          </Row>

          <Row className="mb-4">
            <CardTitle>Expenses</CardTitle>
            <div className="">
              <div></div>
              <div className="d-flex gap-2">
                <Button className="square">+</Button>
                <Button className="square">-</Button>
              </div>
            </div>
          </Row>
        </CardBody>
        <CardFooter>
          <Button>Save Tags</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default CreateTags;
