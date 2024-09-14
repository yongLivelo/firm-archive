class Query {
  static queries = [];
  constructor(amount, flow, payment, expense, date) {
    this.amount = amount;
    this.flow = flow;
    this.payment = payment;
    this.expense = expense;
    this.date = date;
  }

  render() {
    let stringTable = "";
    let total = 0;
    Query.queries.forEach((query) => {
      stringTable += `<tr><td>${query.amount}</td><td>${query.flow}</td><td>${query.payment}</td><td>${query.expense}</td><td>${query.date}</td></tr>`;
      if (query.flow === "out") {
        total -= query.amount;
      } else {
        total += query.amount;
      }
    });

    totalAmount.innerHTML = "₱" + total;
    queryTable.innerHTML = stringTable;
  }
}

const submitQuery = document.getElementById("submit-query");
const amountLabel = document.getElementById("amount");
const flowLabel = document.getElementsByName("flow");
const paymentLabel = document.getElementById("payment");
const expenseLabel = document.getElementById("expense");
const queryTable = document.getElementById("query-table");
const totalAmount = document.getElementById("total-amount");

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
    console.log(amountLabel.value);
    let flowValue;
    flowLabel.forEach((input) => {
      if (input.checked) {
        flowValue = input.value;
      }
    });

    let date = new Date();
    let currentTime = `${date.getHours()}:${date.getMinutes()}`;
    event.preventDefault();

    let query = new Query(
      parseFloat(amountLabel.value),
      flowValue,
      paymentLabel.options[paymentLabel.selectedIndex].text,
      expenseLabel.options[expenseLabel.selectedIndex].text,
      currentTime
    );
    Query.queries.push(query);
    query.render();
  }
});
