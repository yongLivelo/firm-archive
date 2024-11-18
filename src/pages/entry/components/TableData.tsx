import { useContext, useEffect, useRef } from "react";
import { Card, CardBody } from "react-bootstrap";
import { TableContext } from "../../../App";
import { Tags } from "../../../interface";
// import jszip from "jszip";
// import pdfmake from "pdfmake";
import DataTable, { DataTableSlot, DataTableRef } from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-autofill-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import "datatables.net-responsive-bs5";
import "datatables.net-rowgroup-bs5";
import "datatables.net-searchpanes-bs5";
import "datatables.net-select-bs5";

DataTable.use(DT);

function TableData() {
  const table = useContext(TableContext);
  const tableRef = useRef<DataTableRef>(null);

  const columns = [
    { data: "code" },
    { data: "date", render: DT.render.datetime() as DataTableSlot },
    { data: "flow" },
    { data: "mode" },
    {
      data: "tags",
      render: (data: Tags[] | null, type: string) => {
        if (type === "display") {
          if (!data?.length) {
            return `<p class="tag px-1 rounded bg-warning tag-table p-2">No Tags</p>`;
          }
          return data
            .map(
              (el) =>
                `<div class="tag p-2 tag-item bg-primary mb-2 rounded text-light d-inline">
                  <h5 class="d-inline">${el.category}:</h5>
                  <p class="d-inline">${el.selected || "None"}</p>
                </div>`
            )
            .join("");
        }
        return (
          data?.map((el) => `${el.category}: ${el.selected}`).join(", ") ||
          "No Tags"
        );
      },
    },
    {
      data: "amount",
      render: (data: number | null, type: string) => {
        if (type === "display") {
          return `₱${data}`;
        } else {
          return data;
        }
      },
    },
    { data: "description" },
  ];

  useEffect(() => {
    table?.setData(tableRef.current?.dt());

    if (localStorage.getItem("save")) return;
  }, []);

  useEffect(() => {
    if (localStorage.getItem("save")) {
      table?.data?.rows
        .add(JSON.parse(localStorage.getItem("save") as string))
        .draw();
    }
  }, [table?.data]);

  return (
    <>
      <Card className="shadow">
        <CardBody>
          <div className="table-responsive" style={{ overflowX: "hidden" }}>
            <DataTable
              className="display table"
              options={{
                responsive: true,
                select: true,
                buttons: ["csv"],
              }}
              ref={tableRef}
              columns={columns}
            >
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Date</th>
                  <th scope="col">Flow</th>
                  <th scope="col">Mode</th>
                  <th scope="col">Tags</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
            </DataTable>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default TableData;
