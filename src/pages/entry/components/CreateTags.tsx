import { CardBody, CardFooter, CardHeader, CardTitle } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
function CreateTags() {
  return (
    <>
      <Card className="shadow">
        <CardHeader>
          <h2>Tags</h2>
        </CardHeader>
        <CardBody style={{ height: "300px", overflowY: "auto" }}>
          <div className="row mb-4">
            <CardTitle>Sales</CardTitle>
            <div className="d-flex gap-2">
              <div id="input-tag-sales-container"></div>
              <div id="control-tag-sales-container">
                <button id="add-tag-sales" className="btn btn-secondary mb-2">
                  +
                </button>
                <button
                  id="subtract-tag-sales"
                  className="btn btn-secondary mb-2"
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <CardTitle>Expenses</CardTitle>
            <div className="d-flex gap-2">
              <div id="input-tag-expenses-container"></div>
              <div id="control-tag-expenses-container">
                <button
                  id="add-tag-expenses"
                  className="btn btn-secondary mb-2"
                >
                  +
                </button>
                <button
                  id="subtract-tag-expenses"
                  className="btn btn-secondary mb-2"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button> Save Tags</Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default CreateTags;
