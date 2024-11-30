import { useContext } from "react";
import { Button } from "react-bootstrap";
import { TableContext } from "../../../../App";

function Csv() {
  const table = useContext(TableContext);

  return (
    <>
      <Button
        onClick={() => {
          table?.data?.button(".buttons-csv").trigger();
        }}
      >
        CSV
      </Button>
    </>
  );
}

export default Csv;
