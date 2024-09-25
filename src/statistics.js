const data = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

new Chart($("#bar-graph"), {
  type: "bar",
  data: {
    labels: data.map((row) => row.year),
    datasets: [
      {
        label: "Acquisitions by year",
        data: data.map((row) => row.count),
      },
    ],
  },
});

const data2 = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

new Chart(document.getElementById("pie-graph"), {
  type: "pie",
  data: {
    labels: data.map((row) => row.year),
    datasets: [
      {
        label: "Acquisitions by year",
        data: data.map((row) => row.count),
      },
    ],
  },
});

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
