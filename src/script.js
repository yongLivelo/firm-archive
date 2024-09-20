class Query {
  static queries = [];

  constructor(date, flow, mode, tags, amount, description) {
    this.code = Query.createCode(flow);
    this.date = date;
    this.flow = flow;
    this.mode = mode;
    this.tags = tags;
    this.amount = amount;
    this.description = description;
  }

  static createCode(flow) {
    const flowArr = Query.queries.filter((query) => query.flow === flow);
    return flowArr.length + 1;
  }

  appendRow() {
    const tagsString = this.tags
      ? this.tags
          .map((value) => `<p class="rounded bg-secondary p-2">${value}</p>`)
          .join("")
      : "N/A";

    $("#table-query").append(`
      <tr>
        <td>${this.code}</td>
        <td>${this.date}</td>
        <td>${this.flow}</td>
        <td>${this.mode}</td>
        <td>${tagsString}</td>
        <td>${this.amount}</td>
        <td>${this.description}</td>
      </tr>
    `);

    Query.queries.push(this);
    Query.updateValues();
  }

  static updateValues() {
    let totalAmount = 0;

    Query.queries.forEach((query) => {
      totalAmount += query.flow === "sales" ? query.amount : -query.amount;
    });

    $("#total-amount-label").html("₱" + totalAmount);
  }
}

let flowValue = "sales";
$("#submit-query").click((e) => {
  e.preventDefault();
  let tags;
  let acceptTags;
  if ($("#tag-container").children()[0].id !== "no-tags") {
    tags = $("#tag-container")
      .children()
      .toArray()
      .map((flow) => flow.options[flow.selectedIndex].value);
    acceptTags = tags.includes("0");
  } else {
    tags = undefined;
    acceptTags = false;
  }

  if (
    $("#date-label").val() === "" ||
    $("#mode-label").val() === "0" ||
    $("#amount-label").val() === 0 ||
    acceptTags
  ) {
    alert("Missing Input");
  } else {
    const query = new Query(
      $("#date-label").val(),
      flowValue,
      $("#mode-label").val(),
      tags,
      parseInt($("#amount-label").val()),
      $("#description-label").val() === ""
        ? "N/A"
        : $("#description-label").val()
    );

    query.appendRow();
  }
});

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

class Tag {
  static tagsArr = [];

  constructor(category, tags, flow) {
    this.category = category;
    this.tags = tags;
    this.flow = flow;
  }

  static render(flow) {
    $("#tag-container").empty();
    const array = Tag.tagsArr.filter((el) => el.flow === flow);
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

$("#save-setting").click(() => {
  const selections = Array.from($(`.input-selection-container`));
  Tag.tagsArr = [];
  selections.forEach((element) => {
    const type = element.dataset.type;
    const tags = Array.from($(element).children(".selection-input")).map(
      (el) => el.value
    );
    const category = $(element).children(".category-input").val();
    Tag.tagsArr.push(new Tag(category, tags, type));
  });

  Tag.render(flowValue);
});

$(".flow")
  .toArray()
  .forEach((flow) => {
    $(flow).click(() => {
      if (flow.checked) {
        flowValue = flow.id;
      }
      if (Tag.tagsArr.length !== 0) Tag.render(flowValue);
      return;
    });
  });
