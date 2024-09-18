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
    let flowArr = Query.queries.filter((query) => {
      return query.flow === flow;
    });

    return flowArr.length + 1;
  }

  render() {
    let stringTable = "";
    let totalAmount = 0;

    Query.queries.forEach((query) => {
      let tagsString = "";
      query.tags.forEach((value) => {
        tagsString += `<p class="rounded bg-secondary p-2">${value}</p>`;
      });
      stringTable += `<tr><td>${query.code}</td><td>${query.date}</td><td>${query.flow}</td><td>${query.mode}</td><td>${tagsString}</td><td>${query.amount}</td><td>${query.description}</td></tr>`;

      if (query.flow === "Expenses") {
        totalAmount -= query.amount;
      } else if (query.flow === "Sales") {
        totalAmount += query.amount;
      }
    });

    tableQuery.innerHTML = stringTable;
    totalAmountLabel.innerHTML = "₱" + totalAmount;
  }
}

const submitQuery = document.getElementById("submit-query");
const dateLabel = document.getElementById("date-label");
const flowLabel = document.getElementsByName("flow");
const modeLabel = document.getElementById("mode-label");
const tagContainer = document.getElementById("tag-container");
const amountLabel = document.getElementById("amount-label");
const descriptionLabel = document.getElementById("description-label");
const tableQuery = document.getElementById("table-query");
const totalAmountLabel = document.getElementById("total-amount-label");

let flowValue = "Sales";
flowLabel.forEach((flow) => {
  flow.addEventListener("click", (input) => {
    if (flow.checked) {
      flowValue = flow.id;
    }
    // Hardcoded for now
    if (flowValue === "Expenses") {
      tagContainer.innerHTML = `
      <select id="mode-label" class="form-select">
      <option value="0" selected>Chart of Accounts</option>
      <option value="Office Supplies">Office Supplies</option>
      <option value="Cost of Goods">Cost of Goods</option>
      <option value="Delivery">Delivery</option></select>`;
    } else if (flowValue === "Sales") {
      tagContainer.innerHTML = `
      <select id="mode-label" class="form-select">
      <option value="0" selected>Business Account</option>
      <option value="Bikeshop ni JE">Bikeshop ni JE</option>
      <option value="JE Bikeshop">JE Bikeshop</option></select>

      <select id="mode-label" class="form-select">
      <option value="0" selected>Source</option>
      <option value="Web Store">Web Store</option>
      <option value="Store">Store</option>
      <option value="Tiktok">Tiktok</option>
      <option value="Whole Sale">Whole Sale</option></select>`;
    }
  });
});

submitQuery.addEventListener("click", (event) => {
  event.preventDefault();
  const values = [...tagContainer.children].map((flow) => {
    return flow.options[flow.selectedIndex].value;
  });
  if (
    dateLabel.value === " " ||
    modeLabel.options[modeLabel.selectedIndex].value === "0" ||
    amountLabel.value === 0 ||
    values.includes("0")
  ) {
    alert("Missing Input");
  } else {
    let query = new Query(
      dateLabel.value,
      flowValue,
      modeLabel.options[modeLabel.selectedIndex].value,
      values,
      parseInt(amountLabel.value),
      descriptionLabel.value === "" ? "N/A" : descriptionLabel.value
    );

    Query.queries.push(query);
    query.render();
  }
});

const saveSettings = document.getElementById("save-settings");
saveSettings.addEventListener("click", () => {});

const saveTable = document.getElementById("save-table");
saveTable.addEventListener("click", () => {
  localStorage.setItem("files", JSON.stringify(Query.queries));
});

const loadTable = document.getElementById("load-table");
loadTable.addEventListener("click", () => {
  const retreieve = localStorage.getItem("files");
  const query = new Query();
  query.render();
});
