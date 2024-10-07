import { useEffect, useState } from "react";
import {
  Button,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import TagSelection from "./TagSelection";

interface Props {
  setSavedTags: (arg: any) => void;
}

function CreateTags({ ...Props }: Props) {
  const [expenseTags, setExpenseTags] = useState<any[]>([]);
  const [salesTags, setSalesTags] = useState<any[]>([]);

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();
      toast("Saved Tags", { position: "top-right" });
      localStorage.setItem(
        "tags",
        JSON.stringify({ sales: salesTags, expenses: expenseTags })
      );
      Props.setSavedTags({ sales: salesTags, expenses: expenseTags });
    } else {
      event.preventDefault();
      setValidated(true);
    }
  };

  useEffect(() => {
    Props.setSavedTags({ sales: salesTags, expenses: expenseTags });
  }, []);

  return (
    <>
      <Form
        id="tag-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Card className="shadow">
          <CardHeader>
            <h2>Tags</h2>
          </CardHeader>
          <CardBody style={{ height: "300px", overflowY: "auto" }}>
            <Row className="mb-4">
              <CardTitle>Sales</CardTitle>
              <TagSelection
                sendTags={setSalesTags}
                type={"sales"}
              ></TagSelection>
            </Row>
            <Row className="mb-4">
              <CardTitle>Expenses</CardTitle>
              <TagSelection
                sendTags={setExpenseTags}
                type={"expenses"}
              ></TagSelection>
            </Row>
          </CardBody>
          <CardFooter>
            <Button form="tag-form" type="submit">
              Save Tags
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </>
  );
}

export default CreateTags;
