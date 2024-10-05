import settingsIcon from "../../assets/settings.png";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/je_bikeshop.jpg";
function Settings() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    window.location.href = "./authentication";
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
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid text-center">
            <img
              id="user-profile"
              alt="avatar"
              className="rounded-circle"
              src={profile}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
            <h5 id="user-name" className="my-3">
              JE Bikeshop
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Settings;
