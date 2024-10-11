import { useContext, useEffect, useState } from "react";
import {
  CardBody,
  CardFooter,
  FormControl,
  FormGroup,
  FormSelect,
  ButtonGroup,
  ToggleButton,
  Form,
  Card,
  Button,
} from "react-bootstrap";

import { TableContext } from "../../../App";
import { Row, Tags } from "../../../interface";
import Save from "./inputButtonComponents/Save";
import Post from "./inputButtonComponents/Post";

interface Props {
  savedTags: any;
}

function Input({ ...Props }: Props) {
  const table = useContext(TableContext);

  const createCode = () => {
    const dateProcess = new Date(date);
    return `${dateProcess.getFullYear()}-${dateProcess.getMonth()}-${dateProcess.getDay()}`;
  };
  const [date, setDate] = useState("");
  const checkDate = (e: any) => {
    setDate(e.target.value);
  };
  const [flow, setFlow] = useState<string>("sales");
  const flowRadio = [
    { name: "Sales", value: "sales" },
    { name: "Expenses", value: "expenses" },
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

  const [tagOptions, setTagOptions] = useState<any>([]);
  useEffect(() => {
    setTagOptions([]);
    switch (flow) {
      case "sales":
        setTagOptions(Props?.savedTags?.sales);
        break;
      case "expenses":
        setTagOptions(Props?.savedTags?.expenses);
        break;
    }
  }, [flow, Props?.savedTags]);

  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const checkTags = (e: any, id: number, category: string) => {
    const updatedTags = selectedTags.map((el, i) => {
      if (i === id) {
        return { selected: e.target.value, category: category };
      } else {
        return el;
      }
    });

    setSelectedTags(updatedTags);
  };

  useEffect(() => {
    const initialTags = tagOptions?.map((optionGroup: any) => ({
      selected: "",
      category: optionGroup.category,
    }));
    setSelectedTags(initialTags);
  }, [tagOptions]);

  const [amount, setAmount] = useState<number>(0);
  const checkAmount = (e: any) => {
    setAmount(parseInt(e.target.value));
  };
  const [description, setDescription] = useState<string>("");
  const checkDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const deleteRows = () => {
    table?.data?.rows(".selected").remove().draw();
  };

  const editRows = () => {};

  const getCSV = () => {
    table?.data?.button(".buttons-csv").trigger();
  };

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();

      const row: Row = {
        code: createCode(),
        date: date,
        flow: flow,
        mode: mode,
        tags: selectedTags,
        amount: amount,
        description: description === "" ? "No Description" : description,
      };

      table?.data?.row.add(row).draw();
    } else {
      setValidated(true);
    }
  };
  return (
    <>
      <Card className="shadow">
        <CardBody>
          <Form
            id="main-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <FormGroup className="mb-2">
              <FormControl
                required
                onChange={checkDate}
                type="datetime-local"
              />
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
              <FormSelect required onChange={checkMode}>
                {modeOptions.map((opt, id) => (
                  <option key={id} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup className="d-flex gap-2 mb-2 p-2 bg-light rounded">
              {!tagOptions?.length
                ? "No Tags"
                : tagOptions.map((optionGroup: any, index: number) => (
                    <FormSelect
                      onChange={(e) =>
                        checkTags(e, index, optionGroup.category)
                      }
                      className=" d-inline-flex gap-2 w-auto "
                      key={`group-${index}`}
                      required
                      name={`select-${index}`}
                    >
                      <option value="">{optionGroup.category}</option>
                      {optionGroup.selections.map(
                        (selection: string, selectIndex: number) => (
                          <option
                            key={`option-${index}-${selectIndex}`}
                            value={selection}
                          >
                            {selection}
                          </option>
                        )
                      )}
                    </FormSelect>
                  ))}
            </FormGroup>

            <FormGroup className="mb-2">
              <FormControl
                required
                onChange={checkAmount}
                type="number"
                min={1}
                step="any"
                placeholder="Enter Amount"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
          <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex gap-2 mb-2 mb-lg-0">
              <Button form="main-form" type="submit">
                Add
              </Button>
              <Button onClick={deleteRows}>Delete</Button>
              <Button onClick={editRows}>Edit</Button>
              <Save />
            </div>
            <div className="d-flex gap-2">
              {/* <Button variant={"warning"} onClick={postTable}>
                Post
              </Button> */}

              <Post />
              <Button onClick={getCSV}>CSV</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

export default Input;
