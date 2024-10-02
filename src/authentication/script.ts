import "../main.scss";
import $ from "jquery";

$("#log-in").click(() => {
  const username: string = $("#username").val() as string;
  const password: string = $("#password").val() as string;

  if (username && password) {
    window.location.replace("../entry/index.html");
  } else {
    alert("Wrong Username/ Password, Please try again.");
  }
});
