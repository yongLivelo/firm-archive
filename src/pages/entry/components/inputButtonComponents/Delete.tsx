import { Button } from "react-bootstrap";
import { TableContext } from "../../../../App";
import { useContext } from "react";

function Delete() {
  const table = useContext(TableContext);
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

export default Delete;
