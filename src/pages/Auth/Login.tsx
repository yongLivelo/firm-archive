import React, { useContext, useState } from "react";
import { json, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  Spinner,
} from "react-bootstrap";
import { auth, db } from "@/firebase/firebase";
import { AuthContext } from "@/App";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const user = useContext(AuthContext); // Get user context
  const [loading, setLoading] = useState(false);

  const checkInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.email as HTMLInputElement).value;
    const password = (e.currentTarget.password as HTMLInputElement).value;

    if (!email || !password) return;

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      {
        const userDocRef = doc(db, "users", userCredential.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          await setDoc(userDocRef, {
            email: userCredential.user.email,
            draft: "[]",
            post: "[]",
            transactionCounter: "{}",
          });
        } else {
          setLoading(false);
        }
      }
    } catch (err: any) {
      alert("Wrong Password/ Email");
    } finally {
      setLoading(false);
    }
  };

  if (user && !loading) {
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
            type="email"
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
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <Spinner
              animation="border"
              style={{ width: "20px", height: "20px" }}
              role="status"
            />
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
}

export default Login;
