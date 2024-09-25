class Table {
  static table = new DataTable("#main-table", {
    dom: "Bfrtip",
    buttons: ["csvHtml5"],
    responsive: true,
    columns: [
      {
        data: "code",
        render: (data) => {
          return data;
        },
      },
      {
        data: "date",
        render: (data) => {
          return data;
        },
      },
      {
        data: "flow",
        render: (data) => {
          return data;
        },
      },
      {
        data: "mode",
        render: (data) => {
          return data;
        },
      },
      {
        data: "tags",
        render: (data) => {
          try {
            let string = "";
            data.forEach((tag) => {
              string += `<p class="my-2"><span class="text-white fw-bold rounded bg-primary p-2">${tag.category}</span>&nbsp;:&nbsp;<span class="text-white rounded bg-secondary p-2">${tag.selected}</span></p>`;
            });
            return string;
          } catch (e) {
            return data;
          }
        },
      },
      {
        data: "amount",
        render: (data) => {
          return data;
        },
      },
      {
        data: "description",
        render: (data) => {
          return data;
        },
      },
    ],
  });

  constructor(date, flow, mode, tags, amount, description) {
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
      .forEach((row) => {
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
      .filter((row) => row.flow === this.flow);

    return ++flowArr.length;
  }

  renderRow() {
    Table.table.row.add(this).draw();
  }
}
Table.init();

class TableControls {
  static flowValue = $(`input[name='flow']:checked`).val();

  static init() {
    $(`input[name='flow']`).change(this.handleFlow);

    $("#add-row").click((e) => this.addRow(e));

    $("#save-table").click((e) => this.saveTable(e));

    $("#export-csv").on("click", (e) => this.exportCsv(e));

    $("#delete-row").click((e) => this.deleteRow(e));

    $("#edit-row").click((e) => this.editRow(e));
  }

  static addRow(e) {
    e.preventDefault();

    const date = $("#date-label").val();
    const flow = TableControls.flowValue;
    const mode = $("#mode-label").val();
    const tags = TableControls.handleTags();
    const amount = parseInt($("#amount-label").val());
    const description = $("#description-label").val() || "N/A";

    if (date && mode !== "0" && tags && amount) {
      const row = new Table(date, flow, mode, tags, amount, description);
      row.renderRow();
    } else {
      alert("Invalid Input");
    }
  }

  static saveTable(e) {
    e.preventDefault();
    const saveTable = Table.table.data().toArray();
    localStorage.setItem(
      `${JSON.parse(localStorage.getItem("user")).username}-table`,
      JSON.stringify(saveTable)
    );
  }

  static exportCsv(e) {
    e.preventDefault();
    Table.table.button(".buttons-csv").trigger();
  }

  static deleteRow(e) {
    e.preventDefault();
    Table.table.rows(".selected").remove().draw();
  }

  static editRow(e) {
    e.preventDefault;
    // Not Yet Functional
  }

  static handleFlow() {
    TableControls.flowValue = this.value;
    Tag.renderInput();
  }

  static handleTags() {
    if ($("#no-tags").length) return "N/A";

    const tags = $("#tag-container")
      .children()
      .toArray()
      .map((selection) => {
        const tagObject = {
          category: $(selection).children(".category").html(),
          selected: selection.value,
        };
        if (tagObject.selected === "0") return null;
        return tagObject;
      });

    console.log(tags);
    return tags.includes(null) ? false : tags;
  }
}
TableControls.init();

class Tag {
  static tags = { expenses: [], sales: [] };

  constructor(category, tags, flow) {
    this.category = category;
    this.tags = tags;

    switch (flow) {
      case "expenses":
        Tag.tags.expenses.push(this);
        break;
      case "sales":
        Tag.tags.sales.push(this);
        break;
    }
  }

  static init() {
    $("#save-tags").click(() => this.save());
  }

  static save() {
    const tagInputs = Array.from($(`.input-selection-container`));
    Tag.tags.expenses = [];
    Tag.tags.sales = [];

    tagInputs.forEach((element) => {
      const type = element.dataset.type;
      const category = $(element).children(".category-input").val();
      const tags = Array.from($(element).children(".selection-input")).map(
        (el) => $(el).val()
      );
      new Tag(category, tags, type);
    });

    localStorage.setItem(
      `${JSON.parse(localStorage.getItem("user")).username}-tags`,
      JSON.stringify(Tag.tags)
    );
    this.renderInput();
  }

  static renderInput() {
    $("#tag-container").empty();

    const tagArr =
      TableControls.flowValue === "sales" ? Tag.tags.sales : Tag.tags.expenses;
    if (tagArr.length) {
      tagArr.forEach((el) => {
        const options = el.tags
          .map((tag) => `<option value="${tag}">${tag}</option>`)
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
  constructor(containerId, addButtonId, subtractButtonId, type) {
    this.container = $(`#${containerId}`);
    $(`#${addButtonId}`).click(() => this.addTag());
    $(`#${subtractButtonId}`).click(() => this.removeTag());
    this.type = type;
    this.tagNum = 0;
  }

  addTag() {
    this.tagNum++;
    this.container.append(`
      <div id=
      "${this.tagNum}-input-tag" class="input-tag">
        <div id="${this.tagNum}-input-selection-container-${this.type}" class="input-selection-container" data-type=${this.type}>
          <input id="${this.tagNum}-category-input" type="text" class="category-input form-control w-auto mb-2" placeholder="Category" />
          <input id="${this.tagNum}-selection-input-1" type="text" class="selection-input form-control w-auto mb-2" placeholder="Selection 1" />
          <input id="${this.tagNum}-selection-input-2" type="text" class="selection-input form-control w-auto mb-2" placeholder="Selection 2" />
        </div>
        <button id="${this.tagNum}-subtract-input-${this.type}" class="btn btn-secondary mb-2">-</button>
        <button id="${this.tagNum}-add-input-${this.type}" class="btn btn-secondary mb-2">+</button>
      </div>
    `);

    this.selectManager = new SelectionManager(
      `${this.tagNum}-input-selection-container-${this.type}`,
      `${this.tagNum}-add-input-${this.type}`,
      `${this.tagNum}-subtract-input-${this.type}`,
      this.type,
      this.tagNum
    );
  }

  removeTag() {
    const lastTag = this.container.children(".input-tag:last");
    if (lastTag.length) {
      lastTag.remove();
      this.tagNum--;
    }
  }

  static renderEditInput(tags) {}
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

class SelectionManager extends TagManager {
  constructor(containerId, addButtonId, subtractButtonId, type, tagNum) {
    super(containerId, addButtonId, subtractButtonId, type);
    this.tagNum = tagNum;
    this.selectNum = 2;
  }

  addTag() {
    this.selectNum++;
    this.container.append(`
      <input id="${this.tagNum}-selection-input-${this.selectNum}" type="text" class="selection-input form-control w-auto mb-2 added-selection-input" placeholder="Selection ${this.selectNum}" />
    `);
  }

  removeTag() {
    const lastTag = this.container.children(".added-selection-input:last");
    if (lastTag.length) {
      lastTag.remove();
      this.selectNum--;
    }
  }
}

class User {
  constructor(user) {
    this.user = user;
  }

  init() {
    try {
      $("#user-profile").attr({ src: `${this.user.profile}` });
      $("#user-name").html(`${this.user.firstName} ${this.user.lastName}`);
      $("#user-gcash").html(`${this.user.gcash}`);
      $("#user-bpi").html(`${this.user.bpi}`);

      const saveInfo = {
        table: JSON.parse(localStorage.getItem(`${this.user.username}-table`)),
        tags: JSON.parse(localStorage.getItem(`${this.user.username}-tags`)),
      };

      Table.table.rows.add(saveInfo?.table).draw();
      TagManager.renderEditInput(saveInfo?.tags);
    } catch (e) {}
  }
}

const user = new User(JSON.parse(localStorage.getItem("user")));
user.init();

class Setting {
  static init() {
    $("#log-out").click(this.logOut);
  }

  static logOut() {
    localStorage.removeItem("user");
    window.location.replace("authentication.html");
  }
}
Setting.init();
