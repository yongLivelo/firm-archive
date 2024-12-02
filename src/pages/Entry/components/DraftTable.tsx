import FixedTable from "@/components/FixedTable";
import { TableContextType } from "@/interface/TableContextType";
import { useContext, useEffect } from "react";
import { TableContext } from "@/pages/Entry/Entry";

export default function DraftTable() {
  const tableRef = useContext(TableContext) as TableContextType;
  console.log(tableRef);
  useEffect(() => {
    if (localStorage.getItem("draftTable")) {
      try {
        const draftTableData = JSON.parse(
          localStorage.getItem("draftTable") as string
        );
        if (tableRef?.data?.rows) {
          tableRef.data.rows.add(draftTableData).draw();
        }
      } catch (error) {
        console.error("Error parsing draftTable from localStorage:", error);
      }
    }
  }, [tableRef]);

  return (
    <>
      <FixedTable tableId={tableRef} />
    </>
  );
}
