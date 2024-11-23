import { Container } from "react-bootstrap";
import Nav from "../nav/Navigation";
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
import { Tags } from "../../interface";
import { useRef } from "react";

function Archive() {
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
                `<div class="tag p-2 tag-item bg-primary mb-2 rounded text-light">
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
    { data: "amount" },
    { data: "description" },
  ];

  return (
    <>
      <Nav />
      <Container className="vh-100 bg-light p-4">
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
      </Container>
    </>
  );
}

export default Archive;
