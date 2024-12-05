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
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { TableContext } from "../Entry";
import { TableContextType } from "@/interface/TableContextType";
import InputForm from "@/components/InputForm/InputForm";
import { Row } from "@/interface/Row";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { AuthContext } from "@/App";
import { db } from "@/firebase/firebase";

let table: TableContextType;
let user: User | null;
export default function Input() {
  table = useContext(TableContext) as TableContextType;
  user = useContext(AuthContext);

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
        <CardFooter className="p-0 pt-2 d-flex justify-content-between flex-wrap">
          <div className="d-flex gap-2 mx-2 mb-2">
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
}

function Add({ form }: { form: string }) {
  return (
    <>
      <Button type="submit" form={`${form}`}>
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
  const [validated, setValidated] = useState<boolean>(false);
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
    e.stopPropagation();

    const form = e.currentTarget;
    if (!form.checkValidity() === false) {
      const selectedIndex = table?.data?.rows({ selected: true }).indexes()[0];

      if (editRowData) {
        table?.data?.row(selectedIndex).data(row).draw();
      }
      setShow(false);
    } else {
      setValidated(true);
    }
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
            validated={validated}
            handleSubmit={handleSubmit}
            editRow={editRowData}
          />
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
          console.log("triggerr");
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
  const [loading, setLoading] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postTables = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();

      if (!userData) {
        toast.error("User data not found.");
        return;
      }

      const currentPosts = userData.post ? JSON.parse(userData.post) : [];
      const draftTable = table?.data?.data().toArray();
      const newPosts = [...(draftTable as []), ...currentPosts];
      console.log(newPosts);

      await updateDoc(userDocRef, {
        post: JSON.stringify(newPosts),
      });
      setLoading(false);
      toast("Table Posted", { autoClose: 4000 });
      handleClose();
      table?.data?.clear().draw();
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Error posting table.");
    }
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
            {loading ? (
              <Spinner
                animation="border"
                style={{ width: "20px", height: "20px" }}
                role="status"
              />
            ) : (
              "Post"
            )}
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
  const [loading, setLoading] = useState(false);
  const saveDraftTable = async () => {
    setLoading(true);
    if (!user?.uid) return;
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      draft: JSON.stringify(table?.data?.data().toArray()),
    });
    setLoading(false);
    toast("Table Saved", { autoClose: 4000 });
  };

  return (
    <>
      <Button onClick={saveDraftTable}>
        {loading ? (
          <Spinner
            animation="border"
            style={{ width: "20px", height: "20px" }}
            role="status"
          />
        ) : (
          "Save"
        )}
      </Button>
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
