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
          return data;
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
    this.code = Table.createCode(flow);
    this.date = date;
    this.flow = flow;
    this.mode = mode;
    this.tags = tags;
    this.amount = amount;
    this.description = description;
  }

  static init() {
    Table.table.on("draw", Table.updateValues);

    $("#main-table tbody").on("click", "tr", function () {
      $(this).toggleClass("selected");
    });

    $("#delete-table-row").click(function (e) {
      e.preventDefault();
      Table.table.rows(".selected").remove().draw;
    });
  }

  static createCode(flow) {
    const flowArr = Table.table
      .data()
      .toArray()
      .filter((row) => row.flow === flow);

    return flowArr.length + 1;
  }

  addRow() {
    Table.table.row.add(this).draw();
  }

  static updateValues() {
    let totalAmount = 0;
    Table.table
      .data()
      .toArray()
      .forEach((row) => {
        totalAmount += row.flow === "sales" ? row.amount : -row.amount;
      });

    $("#total-amount-label").html(
      totalAmount < 0 ? `-₱${Math.abs(totalAmount)}` : `₱${totalAmount}`
    );
  }
}
Table.init();
// $(".buttons-csv").remove();
$("#export-csv").on("click", function (e) {
  e.preventDefault();
  Table.table.button(".buttons-csv").trigger();
});

class TableControls {
  static flowValue = $(`input[name='flow']:checked`).val();
  constructor() {
    $(".flow").each((_, el) => $(el).click(this.handleFlow));
    $("#add-table-row").click((e) => this.sumbitQuery(e));
  }

  handleFlow() {
    TableControls.flowValue = $(`input[name='flow']:checked`).val();

    if (Tag.tags.length !== 0) {
      Tag.render(TableControls.flowValue);
    }
  }

  handleTags() {
    if ($("#no-tags").length) return "N/A";

    const tags = $("#tag-container")
      .children()
      .toArray()
      .map((flow) => flow.value);
    return tags.length && !tags.includes("0") ? tags : false;
  }

  sumbitQuery(e) {
    e.preventDefault();
    const date = $("#date-label").val();
    const mode = $("#mode-label").val();
    const tags = this.handleTags();
    const amount = parseInt($("#amount-label").val());
    const description = $("#description-label").val() || "N/A";
    if (tags && date && mode !== "0" && amount) {
      const row = new Table(
        date,
        TableControls.flowValue,
        mode,
        tags,
        amount,
        description
      );
      row.addRow(row);
    } else {
      alert("Missing Input");
    }
  }
}
const tableControls = new TableControls();

class Tag {
  static tags = [];

  constructor(category, tags, flow) {
    this.category = category;
    this.tags = tags;
    this.flow = flow;
  }

  static render(flow) {
    $("#tag-container").empty();
    const array = Tag.tags.filter((el) => el.flow === flow);
    array.forEach((el) => {
      const options = el.tags
        .map((tag) => `<option value="${tag}">${tag}</option>`)
        .join("");
      $("#tag-container").append(`
        <select class="form-select">
          <option value="0" selected>${el.category}</option>
          ${options}
        </select>
      `);
    });
  }
}

class TagManager {
  constructor(containerId, addButtonId, subtractButtonId, type) {
    this.container = $(`#${containerId}`);
    this.addButton = $(`#${addButtonId}`);
    this.subtractButton = $(`#${subtractButtonId}`);
    this.type = type;
    this.tagNum = 0;
    this.addButton.click(() => this.addTag());
    this.subtractButton.click(() => this.removeTag());
  }

  addTag() {
    this.tagNum++;
    this.container.append(`
      <div id="${this.tagNum}-input-tag" class="input-tag">
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
    $("#save-user").click((e) => this.saveUser(e));
    $("#log-out").click(this.logOut);
  }

  logOut() {
    localStorage.removeItem("user");
    window.location.replace("login.html");
  }

  saveUser(e) {
    e.preventDefault();
    const saveInfo = {
      table: Table.table.data().toArray(),
      tags: Tag.tags,
    };

    localStorage.setItem(
      `${JSON.parse(localStorage.getItem("user")).firstName}-info`,
      JSON.stringify(saveInfo)
    );
  }

  init() {
    try {
      $("#user-profile").attr({ src: `${this.user.profile}` });
      $("#user-name").html(`${this.user.firstName} ${this.user.lastName}`);
      $("#user-gcash").html(`${this.user.gcash}`);
      $("#user-bpi").html(`${this.user.bpi}`);

      const saveInfo = JSON.parse(
        localStorage.getItem(`${this.user.firstName}-info`)
      );
      console.log(saveInfo.table);
      Table.table.rows.add(saveInfo.table).draw();
      Tag.tags = saveInfo.tags;

      console.log();
    } catch (e) {}
  }
}

const user = new User(JSON.parse(localStorage.getItem("user")));
user.init();

class Setting {
  constructor() {
    $("#save-settings").click(() => this.saveSetting());
  }

  saveSetting() {
    const selections = Array.from($(`.input-selection-container`));
    Tag.tags = [];
    selections.forEach((element) => {
      const type = element.dataset.type;
      const tags = Array.from($(element).children(".selection-input")).map(
        (el) => el.value
      );
      const category = $(element).children(".category-input").val();
      Tag.tags.push(new Tag(category, tags, type));
    });

    Tag.render(TableControls.flowValue);
  }
}

const setting = new Setting();
