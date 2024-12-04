import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  Alert,
} from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/App";

function Login() {
  const user = useContext(AuthContext);
  const checkInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.email as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;

    if (!email || !password) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
    } catch (err: any) {
      alert("Wrong Password/ Email");
    }
  };

  if (user) {
    return <Navigate to="/entry" />;
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Form
        onSubmit={checkInput}
        className="border p-5 rounded shadow bg-light"
      >
        <FormGroup className="mb-4">
          <FormLabel>Email</FormLabel>
          <FormControl
            name="email"
            type="text"
            placeholder="Enter your email"
            required
          />
        </FormGroup>
        <FormGroup className="mb-4">
          <FormLabel>Password</FormLabel>
          <FormControl
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
