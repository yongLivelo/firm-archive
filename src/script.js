class Query {
  static queries = [];
  constructor(amount, flow, payment, expense, date) {
    this.amount = amount;
    this.flow = flow;
    this.payment = payment;
    this.expense = expense;
    this.date = date;
  }

  renderTable() {
    let stringTable = "";

    Query.queries.forEach((query) => {
      stringTable += `<tr><td>${query.amount}</td><td>${query.flow}</td><td>${query.payment}</td><td>${query.expense}</td><td>${query.date}</td></tr>`;
    });
    queryTable.innerHTML = stringTable;
  }
}

const submitQuery = document.getElementById("submit-query");
const amountLabel = document.getElementById("amount");
const flowLabel = document.getElementsByName("flow");
const paymentLabel = document.getElementById("payment");
const expenseLabel = document.getElementById("expense");
const queryTable = document.getElementById("query-table");
submitQuery.addEventListener("click", (event) => {
  if (
    amountLabel.value === undefined ||
    paymentLabel.options[paymentLabel.selectedIndex].text ===
      "Select payment type" ||
    expenseLabel.options[expenseLabel.selectedIndex].text ===
      "Select expense type"
  ) {
    alert("Input missing");
  } else {
    let flowValue;

    flowLabel.forEach((input) => {
      if (input.checked) {
        flowValue = input.value;
      }
    });

    let date = new Date();
    let currentTime = `${date.getHours()}:${date.getMinutes()}`;
    event.preventDefault();
    console.log();
    let query = new Query(
      amountLabel.value,
      flowValue,
      paymentLabel.options[paymentLabel.selectedIndex].text,
      expenseLabel.options[expenseLabel.selectedIndex].text,
      currentTime
    );
    Query.queries.push(query);
    query.renderTable();
  }
});
