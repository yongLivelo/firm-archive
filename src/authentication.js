$("#log-in").click(() => {
  const username = $("#username").val();
  const password = $("#password").val();

  if (username === "julio" && password === "1234") {
    window.location.replace("index.html");
    localStorage.setItem("user", "julio");
  } else if (username === "gambit" && password === "nigga") {
    window.location.replace("index.html");
    localStorage.setItem("user", "gambit");
  } else {
    alert("Wrong Username/Password, Please try again.");
  }
});
