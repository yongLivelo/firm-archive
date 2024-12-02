import settingsIcon from "@/assets/settings.png";
import profile from "@/assets/je-bikeshop.jpg";
import { useState } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

function Settings() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    window.location.href = "./login";
  };

  return (
    <>
      <img
        data-bs-toggle="modal"
        data-bs-target="#settings"
        id="setting-btn"
        style={{ width: "40px", cursor: "pointer" }}
        src={settingsIcon}
        alt="Settings"
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Settings</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Container fluid className="d-flex align-items-center flex-column">
            <img
              id="user-profile"
              alt="avatar"
              className="rounded-circle mb-2"
              src={profile}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <h5 id="user-name" className="mb-2">
              JE Bikeshop
            </h5>
          </Container>
          <br></br>
          <h5 className="mb-2">Developer Controls</h5>
          <Button
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Clear
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Settings;
