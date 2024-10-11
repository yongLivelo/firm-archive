import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { TableContext } from "../../../../App";
import { useContext } from "react";

function Save() {
  const table = useContext(TableContext);
  const notify = () => {
    toast("Saved Table", { autoClose: 4000 });
    localStorage.setItem("save", JSON.stringify(table?.data?.data().toArray()));
  };
  return (
    <>
      <Button onClick={notify}>Save</Button>
    </>
  );
}

export default Save;
