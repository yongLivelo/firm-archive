import { useContext, useState } from "react";
import {
  CardBody,
  CardFooter,
  FormControl,
  FormGroup,
  FormSelect,
} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { TableContext } from "../../../App";
import { Row, Tags } from "../../../interface";

function Input() {
  const table = useContext(TableContext);

  const createCode = () => {
    const dateProcess = new Date(date);
    return `${dateProcess.getFullYear()}-${dateProcess.getMonth()}-${dateProcess.getDay()}`;
  };
  const [date, setDate] = useState("");
  const checkDate = (e: any) => {
    setDate(e.target.value);
  };
  const [flow, setFlow] = useState<string>("Sales");
  const flowRadio = [
    { name: "Sales", value: "Sales" },
    { name: "Expenses", value: "Expenses" },
  ];
  const checkFlow = (e: any) => {
    setFlow(e.currentTarget.value);
  };
  const [mode, setMode] = useState<string>("0");
  const modeOptions = [
    {
      text: "Select mode of payment",
      value: "",
    },
    {
      text: "Gcash",
      value: "Gcash",
    },
    {
      text: "BPI",
      value: "BPI",
    },
    {
      text: "Cash",
      value: "Cash",
    },
  ];
  const checkMode = (e: any) => {
    setMode(e.target.value);
  };
  const [tags, setTags] = useState<Tags[]>([{ category: null }]);
  const checkTags = (e: any) => {
    setTags(e);
  };
  const [amount, setAmount] = useState<number>(0);
  const checkAmount = (e: any) => {
    setAmount(parseInt(e.target.value));
  };
  const [description, setDescription] = useState<string>("");
  const checkDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const submitRow = () => {
    const row: Row = {
      code: createCode(),
      date: date,
      flow: flow,
      mode: mode,
      tags: tags,
      amount: amount,
      description: description,
    };
    table?.data?.row.add(row).draw();
  };

  const deleteRows = () => {
    table?.data?.rows(".selected").remove().draw();
  };

  const editRows = () => {};

  const saveTable = () => {};

  const getCSV = () => {};

  const getPDF = () => {};

  const postTable = () => {};

  return (
    <>
      <Card className="shadow">
        <CardBody>
          <Form>
            <FormGroup className="mb-2">
              <FormControl onChange={checkDate} type="datetime-local" />
            </FormGroup>
            <FormGroup className="mb-2">
              <ButtonGroup>
                {flowRadio.map((radio, id) => (
                  <ToggleButton
                    key={id}
                    id={`flow-${id}`}
                    type="radio"
                    name="flow"
                    value={radio.value}
                    checked={flow === radio.value}
                    onChange={checkFlow}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormSelect onChange={checkMode}>
                {modeOptions.map((opt, id) => (
                  <option key={id} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup className="mb-2">No Tags</FormGroup>
            <FormGroup className="mb-2">
              <FormControl
                onChange={checkAmount}
                type="number"
                min={1}
                step="any"
                placeholder="Enter Amount"
              ></FormControl>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormControl
                onChange={checkDescription}
                as="textarea"
                rows={3}
                placeholder="Enter Description"
              />
            </FormGroup>
          </Form>
        </CardBody>

        <CardFooter>
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2">
              <Button onClick={submitRow}>Add</Button>
              <Button onClick={deleteRows}>Delete</Button>
              <Button onClick={editRows}>Edit</Button>
              <Button onClick={saveTable}>Save</Button>
            </div>
            <div className="d-flex gap-2">
              <Button variant={"warning"} onClick={postTable}>
                Post
              </Button>
              <Button onClick={getCSV}>CSV</Button>
              <Button onClick={getPDF}>PDF</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default Input;
