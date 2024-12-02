import InputForm from "@/components/InputForm/InputForm";
import { Row } from "@/interface/Row";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { TableContext } from "../Entry";
import { TableContextType } from "@/interface/TableContextType";

let table: TableContextType;
export default function Input() {
  table = useContext(TableContext) as TableContextType;

  const formName = "main-form";
  const [validated, setValidated] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, row: Row) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (!form.checkValidity() === false) {
      let codedRow = { ...row, ["code"]: createCode() };
      table?.data?.row.add(codedRow).draw();
    } else {
      setValidated(true);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <InputForm
            id={`${formName}`}
            handleSubmit={handleSubmit}
            validated={validated}
          />
        </CardBody>
        <CardFooter className="p-0  pt-2 d-flex justify-content-between flex-wrap">
          <div className="d-flex gap-2  mx-2 mb-2">
            <Add form={`${formName}`} />
            <Delete />
            <Edit />
          </div>
          <div className="d-flex gap-2 mx-2 mb-2">
            <Csv />
            <Post />
            <Save />
          </div>
        </CardFooter>
      </Card>
    </>
  );
  {
  }
}

interface AddProps {
  form: string;
}
function Add({ ...Props }: AddProps) {
  return (
    <>
      <Button type="submit" form={`${Props.form}`}>
        Add
      </Button>
    </>
  );
}

function Delete() {
  return (
    <>
      <Button
        onClick={() => {
          table?.data?.rows(".selected").remove().draw();
        }}
      >
        Delete
      </Button>
    </>
  );
}

function Edit() {
  const formName = "edit-form";
  const [show, setShow] = useState(false);
  const [editRowData, setEditRowData] = useState<Row>();

  const handleClose = () => setShow(false);
  const handleEditRow = () => {
    if ((table?.data?.rows({ selected: true }).data() ?? []).length !== 1) {
      alert("Select only one row to edit");
    } else {
      setShow(true);
      setEditRowData(table?.data?.rows({ selected: true }).data()[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, row: Row) => {
    e.preventDefault();

    const selectedIndex = table?.data?.rows({ selected: true }).indexes()[0];

    if (editRowData) {
      table?.data?.row(selectedIndex).data(row).draw();
    }
    setShow(false);
  };

  return (
    <>
      <Button onClick={handleEditRow}>Edit</Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Edit Transaction</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <InputForm
            id={`${formName}`}
            validated={false}
            handleSubmit={handleSubmit}
            editRow={editRowData}
          ></InputForm>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form={`${formName}`} type="submit">
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

function Csv() {
  return (
    <>
      <Button
        onClick={() => {
          table?.data?.button(".buttons-csv").trigger();
        }}
      >
        CSV
      </Button>
    </>
  );
}

function Post() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postTables = () => {
    toast("Table Posted", { autoClose: 4000 });
    const existingPostTable = JSON.parse(
      localStorage.getItem("postTable") || "[]"
    ) as Row[];
    const draftTableData = table?.data?.data().toArray() || [];

    localStorage.setItem(
      "postTable",
      JSON.stringify([...existingPostTable, ...draftTableData])
    );

    handleClose();
    table?.data?.clear().draw();
    localStorage.setItem("draftTable", "");
  };

  return (
    <>
      <Button onClick={handleShow}>Post</Button>

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Are you sure you want to post your draft?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Container>You can't make any changes after this.</Container>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={postTables}>
            Post
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
function Save() {
  const saveDraftTable = () => {
    toast("Table Saved", { autoClose: 4000 });
    localStorage.setItem(
      "draftTable",
      JSON.stringify(table?.data?.data().toArray())
    );
  };
  return (
    <>
      <Button onClick={saveDraftTable}>Save</Button>
    </>
  );
}

const createCode = () => {
  const today = new Date();

  const formattedDate = today.toISOString().split("T")[0].replace(/-/g, "");
  let transactionCounters = JSON.parse(
    localStorage.getItem("transactionCounters") || "{}"
  );

  const lastGeneratedDate = transactionCounters["lastGeneratedDate"];
  if (lastGeneratedDate !== formattedDate) {
    transactionCounters["lastGeneratedDate"] = formattedDate;
    transactionCounters[formattedDate] = 1;
  }

  const counter = transactionCounters[formattedDate]++;

  localStorage.setItem(
    "transactionCounters",
    JSON.stringify(transactionCounters)
  );

  return `${formattedDate}-${String(counter).padStart(4, "0")}`;
};
