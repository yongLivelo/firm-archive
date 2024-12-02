import FixedTable from "@/components/FixedTable/FixedTable";
import Nav from "@/components/NavBar";
import { TableContextType } from "@/interface/TableContextType";
import { Api } from "datatables.net";

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function Archive() {
  const [post, setPost] = useState<Api | null | undefined>(null);

  const tableRef: TableContextType = { data: post, setData: setPost };

  useEffect(() => {
    console.log(tableRef);
    if (localStorage.getItem("postTable")) {
      try {
        const postTableData = JSON.parse(
          localStorage.getItem("postTable") as string
        );

        if (tableRef?.data?.rows) {
          tableRef.data.rows.add(postTableData).draw();
        }
      } catch (error) {
        console.error("Error parsing postTable from localStorage:", error);
      }
    }
  }, [tableRef]);
  return (
    <>
      <Nav />
      <Container className="p-4">
        <FixedTable tableId={tableRef} showButtons />
      </Container>
    </>
  );
}

export default Archive;
