import { useRef, useEffect } from "react";
import DataTable, { DataTableRef, DataTableSlot } from "datatables.net-react";
import "datatables.net-bs5";
import DT from "datatables.net-bs5";
import "./style.scss";
import "datatables.net-buttons-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-select-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";

import { Card, CardBody, Spinner } from "react-bootstrap";
import { TableContextType } from "@/interface/TableContextType";

DataTable.use(DT);

interface Props {
  tableId: TableContextType | undefined;
  showButtons?: boolean;
}

export default function FixedTable({
  tableId,

  showButtons = false,
}: Props) {
  const tableRef = useRef<DataTableRef>(null);
  const mainTable = tableId;

  const columns = [
    { data: "code", title: "Code" },
    {
      data: "date",
      title: "Date",
      render: DT.render.datetime() as DataTableSlot,
    },
    { data: "flow", title: "Flow" },
    { data: "mode", title: "Mode" },
    {
      data: "amount",
      title: "Amount",
      render: (data: number, type: string) => {
        console.log(type);
        if (type === "display") {
          return `₱${data.toFixed(2)}`;
        }

        return data;
      },
    },
    {
      data: "description",
      title: "Description",
      render: (data: string, type: string) =>
        type === "display" && (!data || data.trim() === "")
          ? "No Description"
          : data,
    },
  ];

  useEffect(() => {
    mainTable?.setData(tableRef.current?.dt());
  }, []);

  return (
    <Card className="shadow">
      <CardBody>
        <div className="table-responsive" style={{ overflowX: "hidden" }}>
          <DataTable
            className="display table"
            options={{
              dom: showButtons ? "Bfrtip" : "frtip",
              columns,
              responsive: true,
              select: !showButtons,
              layout: {
                topStart: "buttons",
              },
              buttons: ["copy", "csv", "excel", "pdf", "print"],
            }}
            ref={tableRef}
          >
            <thead>
              <tr>
                <th scope="col">Code</th>
                <th scope="col">Date</th>
                <th scope="col">Flow</th>
                <th scope="col">Mode</th>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
          </DataTable>
        </div>
      </CardBody>
    </Card>
  );
}
