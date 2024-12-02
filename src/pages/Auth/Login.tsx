import { useContext } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const checkInput = (e: any) => {
    e.preventDefault();
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    if (username === "julio" && password === "admin") {
      navigate("/entry");
    } else {
      alert("Wrong Password/Username");
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Form
        onSubmit={checkInput}
        className="border p-5 rounded shadow bg-light"
      >
        <FormGroup className="mb-4">
          <FormControl name="username" type="text" />
          <FormLabel>Username</FormLabel>
        </FormGroup>
        <FormGroup className="mb-4">
          <FormControl name="password" type="password" />
          <FormLabel>Password</FormLabel>
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}

export default Login;
