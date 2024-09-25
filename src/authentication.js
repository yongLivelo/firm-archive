$("#log-in").click(() => {
  const username = $("#username").val();
  const password = $("#password").val();

  if (username === "yongk1n" && password === "1234") {
    window.location.replace("index.html");
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "yongk1n",
        firstName: "Julio",
        lastName: "Livelo",
        profile:
          "https://img.redbull.com/images/c_crop,x_129,y_0,h_540,w_405/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2022/12/21/azhcjkud8fleoctecjml/kiriko-overwatch-2",
        gcash: "09280192843",
        bpi: "6717237676",
      })
    );
  } else if (username === "jebikeshop" && password === "admin") {
    window.location.replace("index.html");
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "jebikeshop",
        firstName: "JE",
        lastName: "Bikeshop",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROJR6NsnojBhvvKtY_gBuAUOFtwjgJUvcOg&s",
        gcash: "0903030303",
        bpi: "6969696969",
      })
    );
  } else if (username === "lotusuto" && password === "1022") {
    window.location.replace("index.html");
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: "lotusuto",
        firstName: "lotus",
        lastName: "suto",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROJR6NsnojBhvvKtY_gBuAUOFtwjgJUvcOg&s",
        gcash: "09175142780",
        bpi: "696 894 76",
      })
    );
  } else {
    alert("Wrong Username/Password, Please try again.");
  }
});
