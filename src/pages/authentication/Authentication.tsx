import { SetStateAction, useState } from "react";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";

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
    console.log(123);
    if (keyPress.key !== "Enter" && keyPress.type !== "click") return;
    console.log(123);
    if (username === "julio" && password === "admin") {
      window.location.href = "/entry";
    } else {
      alert("Wrong Password/ Username");
    }
  };

  return (
    <>
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <form
          onKeyDown={checkInput}
          className="border p-5 rounded shadow bg-light"
        >
          <div data-mdb-input-init className="form-outline mb-4">
            <input
              onChange={checkUsername}
              id="username"
              type="email"
              className="form-control"
            />
            <label className="form-label">Username</label>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input
              onChange={checkPassword}
              id="password"
              type="password"
              className="form-control"
            />
            <label className="form-label">Password</label>
          </div>
          <button
            type="button"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-block mb-4"
            id="log-in"
            onClick={checkInput}
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
}

export default Authentication;
