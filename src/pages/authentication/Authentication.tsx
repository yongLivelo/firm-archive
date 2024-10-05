import { SetStateAction, useState } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";

function Authentication() {
  const [username, setUsername] = useState("");
  const checkUsername = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };
  const [password, setPassword] = useState("");
  const checkPassword = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const checkInput = (keyPress: any) => {
    if (keyPress.key !== "Enter" && keyPress.type !== "click") return;
    if (username === "julio" && password === "admin") {
      window.location.href = "/entry";
    } else {
      alert("Wrong Password/ Username");
    }
  };

  return (
    <>
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <Form
          onKeyDown={checkInput}
          className="border p-5 rounded shadow bg-light"
        >
          <FormGroup data-mdb-input-init className="mb-4">
            <FormControl onChange={checkUsername} type="email" />
            <FormLabel>Username</FormLabel>
          </FormGroup>
          <FormGroup data-mdb-input-init className="mb-4">
            <FormControl onChange={checkPassword} type="password" />
            <FormLabel>Password</FormLabel>
          </FormGroup>
          <Button
            data-mdb-button-init
            data-mdb-ripple-init
            onClick={checkInput}
            className="d-block mb-4"
          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Authentication;
