import "../main.scss";
import "bootstrap";
import $ from "jquery";

import jszip from "jszip";
import pdfmake from "pdfmake";
import DataTable from "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-autofill-bs5";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons/js/buttons.colVis.mjs";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.mjs";
import "datatables.net-colreorder-bs5";
import "datatables.net-fixedcolumns-bs5";
import "datatables.net-fixedheader-bs5";
import "datatables.net-keytable-bs5";
import "datatables.net-responsive-bs5";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.css";
import "datatables.net-rowgroup-bs5";
import "datatables.net-scroller-bs5";
import "datatables.net-searchbuilder-bs5";
import "datatables.net-searchpanes-bs5";
import "datatables.net-select-bs5";
import "datatables.net-staterestore-bs5";

class Setting {
  static init() {
    $("#log-out").click(this.logOut);
  }

  static logOut() {
    window.location.replace("../authentication/index.html");
  }
}

Setting.init();

interface Tag {
  category: string;
  selected: string;
}

class Table {
  static table = new DataTable("#main-table", {
    select: true,
    keys: true,

    buttons: ["csvHtml5"],
    responsive: true,
    columns: [
      {
        data: "code",
        render: (data: number) => data,
      },
      {
        data: "date",
        render: DataTable.render.datetime(),
      },
      {
        data: "flow",
        render: (data: string) => data,
      },
      {
        data: "mode",
        render: (data: string) => data,
      },
      {
        data: "tags",
        render: (data: Tag[]) => {
          if (!data[0].category) return "N/A";
          return data
            .map(
              (tag) =>
                `<p class="my-2">
                <span class="text-white fw-bold rounded bg-primary p-2">${tag.category}</span>
                &nbsp;:&nbsp;
                <span class="text-white rounded bg-secondary p-2">${tag.selected}</span>
              </p>`
            )
            .join("");
        },
      },
      {
        data: "amount",
        render: (data: number) => data,
      },
      {
        data: "description",
        render: (data: string) => data,
      },
    ],
  });

  code: number;
  date: string;
  flow: string;
  mode: string;
  tags: Tag[];
  amount: number;
  description: string;

  constructor(
    date: string,
    flow: string,
    mode: string,
    tags: Tag[],
    amount: number,
    description: string
  ) {
    this.date = date;
    this.flow = flow;
    this.mode = mode;
    this.tags = tags;
    this.amount = amount;
    this.description = description;

    this.code = this.createCode();
  }

  static init() {
    Table.table.on("draw", Table.updateValues);
    $("#main-table tbody").on("click", "tr", function () {
      $(this).toggleClass("selected");
    });
    if (JSON.parse(localStorage.getItem("table") as string))
      Table.table.rows
        .add(JSON.parse(localStorage.getItem("table") as string))
        .draw();
  }

  static updateValues() {
    let total = {
      amount: 0,
      expenses: 0,
      sales: 0,
    };

    Table.table
      .data()
      .toArray()
      .forEach((row: Table) => {
        total.amount += row.flow === "sales" ? row.amount : -row.amount;
        total.sales += row.flow === "sales" ? row.amount : 0;
        total.expenses += row.flow === "expenses" ? row.amount : 0;
      });

    $("#total-amount-label").html(
      total.amount < 0 ? `-₱${Math.abs(total.amount)}` : `₱${total.amount}`
    );
    $("#total-sales-label").html(`₱${total.sales}`);
    $("#total-expenses-label").html(`₱${total.expenses}`);
  }

  createCode() {
    const flowArr = Table.table
      .data()
      .toArray()
      .filter((row: any) => row.flow === this.flow);

    return ++flowArr.length;
  }

  renderRow() {
    Table.table.row.add(this).draw();
  }
}
Table.init();

class TableControls {
  static flowValue: string = $(`input[name='flow']:checked`).val() as string;

  static init() {
    $(`input[name='flow']`).change(this.handleFlow);

    $("#add-row").click((e) => this.addRow(e));
    $("#export-csv").on("click", (e) => this.exportCsv(e));
    $("#save-table").click((e) => this.saveTable(e));
    $("#delete-row").click((e) => this.deleteRow(e));
    $("#edit-row").click((e) => this.editRow(e));
  }

  static handleFlow() {
    TableControls.flowValue = $(this).val() as string;
    Tag.renderInput();
  }

  static addRow(e: JQuery.Event) {
    e.preventDefault();

    const date: string = $("#date-label").val() as string;
    const flow: string = TableControls.flowValue;
    const mode: string = $("#mode-label").val() as string;
    const tags: Tag[] = TableControls.handleTags();
    const amount: number = parseInt($("#amount-label").val() as string);
    const description: string = ($("#description-label").val() ||
      "N/A") as string;

    if (date && mode !== "0" && tags && amount) {
      const row = new Table(date, flow, mode, tags, amount, description);
      row.renderRow();
    } else {
      alert("Invalid Input");
    }
  }

  static saveTable(e: JQuery.Event) {
    e.preventDefault();
    const saveTable = Table.table.data().toArray();
    localStorage.setItem(`table`, JSON.stringify(saveTable));
  }

  static exportCsv(e: JQuery.Event) {
    e.preventDefault();
    Table.table.button(".buttons-csv").trigger();
  }

  static deleteRow(e: JQuery.Event) {
    e.preventDefault();
    Table.table.rows(".selected").remove().draw();
  }

  static editRow(e: JQuery.Event) {
    e.preventDefault();
    // Not Yet Functional
  }

  static handleTags() {
    const tags = $("#tag-container")
      .children()
      .toArray()
      .map((selection) => {
        const tagObject: Tag = new Tag(
          $(selection).children(".category").html() as string,
          (selection as HTMLSelectElement).value
        );
        if (tagObject.selected === "0") return null;
        return tagObject;
      });
    return tags as Tag[];
  }
}
TableControls.init();

//
// NEEDS FIXINIG HEHE
//
class Tag {
  static tags: { expenses: Tag[]; sales: Tag[] } = { expenses: [], sales: [] };
  category: string;
  tags: string[] | string;

  constructor(category: string, selected: string);
  constructor(category: string, tags: string[], flow: "expenses" | "sales");

  constructor(
    category: string,
    tagsOrSelected: string | string[],
    flow?: "expenses" | "sales"
  ) {
    this.category = category;

    if (Array.isArray(tagsOrSelected)) {
      this.tags = tagsOrSelected;

      if (flow === "expenses") {
        Tag.tags.expenses.push(this);
      } else if (flow === "sales") {
        Tag.tags.sales.push(this);
      }
    } else {
      this.tags = tagsOrSelected; // Handle case where a single string is provided
      // Push to default category if no flow is specified (you might want to handle this differently)
    }
  }

  static init(): void {
    $("#save-tags").click(() => this.save());

    if (JSON.parse(localStorage.getItem("tags") as string)) {
      console.log(JSON.parse(localStorage.getItem("tags") as string));
      $("#input-tag-sales-container").html(
        JSON.parse(localStorage.getItem("tags") as string).sales
      );
      $("#input-tag-expenses-container").html(
        JSON.parse(localStorage.getItem("tags") as string).expenses
      );
    }
    Tag.renderInput();
  }

  static save(): void {
    localStorage.setItem(
      "tags",
      JSON.stringify({
        sales: $("#input-tag-sales-container").html(),
        expenses: $("#input-tag-expenses-container").html(),
      })
    );

    const tagInputs = Array.from($(`.input-selection-container`));
    Tag.tags.expenses = [];
    Tag.tags.sales = [];

    tagInputs.forEach((element: HTMLElement) => {
      const type = (element as HTMLElement).dataset.type as
        | "expenses"
        | "sales";
      const category = $(element).children(".category-input").val() as string;
      const tags = Array.from($(element).children(".selection-input")).map(
        (el) => $(el).val() as string
      );

      new Tag(category, tags, type);
    });

    this.renderInput();
  }

  static renderInput(): void {
    $("#tag-container").empty();

    const tagArr =
      TableControls.flowValue === "sales" ? Tag.tags.sales : Tag.tags.expenses;

    if (tagArr.length) {
      tagArr.forEach((el) => {
        const options = el.tags
          .map((tag: string[]) => `<option value="${tag}">${tag}</option>`)
          .join("");
        $("#tag-container").append(`
          <select class="form-select" style="width: fit-content">
            <option value="0" class="category" selected>${el.category}</option>
            ${options}
          </select>
        `);
      });
    } else {
      $("#tag-container").html(
        `<h5 id="no-tags" class="mt-2">No Tag Inputs</h5>`
      );
    }
  }
}
Tag.init();

class TagManager {
  private container: JQuery<HTMLElement>;
  private tagNum: number;
  private type: string;

  constructor(
    containerId: string,
    addButtonId: string,
    subtractButtonId: string,
    type: string
  ) {
    this.container = $(`#${containerId}`);
    $(`#${addButtonId}`).click(() => this.addTag());
    $(`#${subtractButtonId}`).click(() => this.removeTag());
    this.type = type;
    this.tagNum = 0;
  }

  addTag(): void {
    this.tagNum++;
    this.container.append(`
      <div id="${this.tagNum}-input-tag" class="input-tag">
        <div id="${this.tagNum}-input-selection-container-${this.type}" class="input-selection-container" data-type="${this.type}">
          <input id="${this.tagNum}-category-input" type="text" class="category-input form-control w-auto mb-2" placeholder="Category" />
          <input id="${this.tagNum}-selection-input-1" type="text" class="selection-input form-control w-auto mb-2" placeholder="Selection 1" />
          <input id="${this.tagNum}-selection-input-2" type="text" class="selection-input form-control w-auto mb-2" placeholder="Selection 2" />
        </div>
        <button id="${this.tagNum}-subtract-input-${this.type}" class="btn btn-secondary mb-2">-</button>
        <button id="${this.tagNum}-add-input-${this.type}" class="btn btn-secondary mb-2">+</button>
      </div>
    `);

    new SelectionManager(
      `${this.tagNum}-input-selection-container-${this.type}`,
      `${this.tagNum}-add-input-${this.type}`,
      `${this.tagNum}-subtract-input-${this.type}`,
      this.type,
      this.tagNum
    );
  }

  removeTag(): void {
    const lastTag = this.container.children(".input-tag:last");
    if (lastTag.length) {
      lastTag.remove();
      this.tagNum--;
    }
  }

  static renderEditInput(tags: any[]): void {}
}

class SelectionManager extends TagManager {
  private selectNum: number;

  constructor(
    containerId: string,
    addButtonId: string,
    subtractButtonId: string,
    type: string,
    tagNum: number
  ) {
    super(containerId, addButtonId, subtractButtonId, type);
    this.selectNum = 2; // Starting from 2 since two inputs are already created in TagManager
  }

  addTag(): void {
    this.selectNum++;
    this.container.append(`
      <input id="${this.tagNum}-selection-input-${this.selectNum}" type="text" class="selection-input form-control w-auto mb-2 added-selection-input" placeholder="Selection ${this.selectNum}" />
    `);
  }

  removeTag(): void {
    const lastTag = this.container.children(".added-selection-input:last");
    if (lastTag.length) {
      lastTag.remove();
      this.selectNum--;
    }
  }
}

const tagSalesManager = new TagManager(
  "input-tag-sales-container",
  "add-tag-sales",
  "subtract-tag-sales",
  "sales"
);

const tagExpensesManager = new TagManager(
  "input-tag-expenses-container",
  "add-tag-expenses",
  "subtract-tag-expenses",
  "expenses"
);

// Interface TagSelection {

// }
// class Tag {
//   static tags: { expenses: Tag[]; sales: Tag[] } = { expenses: [], sales: [] };

//   constructor(category: string, tags: string[], flow: string) {

//     switch (flow) {
//       case "expenses":
//         Tag.tags.expenses.push(this);
//         break;
//       case "sales":
//         Tag.tags.sales.push(this);
//         break;
//     }
//   }

//   constructor(category: string, tags: string[]) {
//     // If selected

//   }

//   static init() {
//     $("#save-tags").click(() => this.save());
//   }

//   static save() {
//     const tagInputs = Array.from($(`.input-selection-container`));
//     Tag.tags.expenses = [];
//     Tag.tags.sales = [];

//     tagInputs.forEach((element) => {
//       const type = element.dataset.type!;
//       const category = $(element).children(".category-input").val() as string;
//       const tags = Array.from($(element).children(".selection-input")).map(
//         (el) => $(el).val() as string
//       );
//       new Tag(category, tags, type);
//     });

//     localStorage.setItem(
//       `${JSON.parse(localStorage.getItem("user")!).username}-tags`,
//       JSON.stringify(Tag.tags)
//     );
//     this.renderInput();
//   }

//   static renderInput() {
//     $("#tag-container").empty();

//     const tagArr =
//       TableControls.flowValue === "sales" ? Tag.tags.sales : Tag.tags.expenses;
//     if (tagArr.length) {
//       tagArr.forEach((el) => {
//         const options = el.tags
//           .map((tag) => `<option value="${tag}">${tag}</option>`)
//           .join("");
//         $("#tag-container").append(`
//           <select class="form-select" style="width: fit-content">
//             <option value="0" class="category" selected>${el.category}</option>
//             ${options}
//           </select>
//         `);
//       });
//     } else {
//       $("#tag-container").html(
//         `<h5 id="no-tags" class="mt-2">No Tag Inputs</h5>`
//       );
//     }
//   }
// }

// Tag.init();
