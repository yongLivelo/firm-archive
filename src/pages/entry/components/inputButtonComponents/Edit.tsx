import { useContext, useState } from "react";
import { TableContext } from "../../../../App";
import {
  Form,
  Modal,
  FormGroup,
  FormControl,
  FormSelect,
  Button,
} from "react-bootstrap";

function Edit() {
  const table = useContext(TableContext);
  const [mode, setMode] = useState<string>("0");
  const modeOptions = [
    { text: "Select mode of payment", value: "" },
    { text: "Gcash", value: "Gcash" },
    { text: "BPI", value: "BPI" },
    { text: "Cash", value: "Cash" },
  ];
  const checkMode = (e: any) => setMode(e.target.value);
  const [showModal, setShowModal] = useState(false);
  const [editRowData, setEditRowData] = useState<any>(null);

  const handleEditModalClose = () => setShowModal(false);
  const handleEditModalShow = (rowData: any) => {
    setEditRowData(rowData);
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    const selectedIndex = table?.data?.rows({ selected: true }).indexes()[0];

    if (editRowData) {
      table?.data?.row(selectedIndex).data(editRowData).draw();
    }
    setShowModal(false);
  };

  const handleModalChange = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    field: string
  ) => {
    setEditRowData((prevData: any) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleRowSelect = () => {
    if ((table?.data?.rows({ selected: true }).data() ?? []).length > 1) {
      alert("Select only one row to edit");
      return 0;
    }

    const selectedRow = table?.data?.rows({ selected: true }).data()[0];
    console.log(selectedRow);
    if (selectedRow) {
      handleEditModalShow(selectedRow);
    }
  };

  return (
    <>
      <Button onClick={handleRowSelect}>Edit</Button>
      <Modal show={showModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-2">
              <FormControl
                value={editRowData?.date || ""}
                required
                onChange={(e) => handleModalChange(e, "date")}
                type="datetime-local"
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <FormSelect
                value={editRowData?.mode || ""}
                required
                onChange={(e) => handleModalChange(e, "mode")}
              >
                {modeOptions.map((opt, id) => (
                  <option key={id} value={opt.value}>
                    {opt.text}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormControl
                value={editRowData?.amount || 0}
                onChange={(e) => handleModalChange(e, "amount")}
                type="number"
              />
            </FormGroup>
            <FormGroup className="mb-2">
              <FormControl
                value={editRowData?.description || ""}
                onChange={(e) => handleModalChange(e, "description")}
                as="textarea"
                rows={3}
                placeholder="Enter Description"
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
