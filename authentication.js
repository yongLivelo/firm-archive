$("#log-in").click(() => {
  const username = $("#username").val();
  const password = $("#password").val();

  if (username === "julio" && password === "1234") {
    window.location.replace("index.html");
    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName: "Julio",
        lastName: "Livelo",
        profile:
          "https://img.redbull.com/images/c_crop,x_129,y_0,h_540,w_405/c_fill,w_450,h_600/q_auto:low,f_auto/redbullcom/2022/12/21/azhcjkud8fleoctecjml/kiriko-overwatch-2",
        gcash: "09280192843",
        bpi: "6717237676",
      })
    );
  } else if (username === "gambit" && password === "pangit") {
    window.location.replace("index.html");
    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName: "jebikeshop",
        lastName: "admin1",
        profile:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROJR6NsnojBhvvKtY_gBuAUOFtwjgJUvcOg&s",
        gcash: "0903030303",
        bpi: "6969696969",
      })
    );
  } else if (username === "vince" && password === "Jermay22") {
    window.location.replace("index.html");
    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName: "Vince",
        lastName: "Cang",
        profile:
          "https://preview.redd.it/60gq0n0dt9j91.png?width=1140&format=png&auto=webp&s=dfd3ab3c74b0e97df65842ccb9bd12917d7f8a09",
        gcash: "N/A",
        bpi: "N/A",
      })
    );
  } else {
    alert("Wrong Username/Password, Please try again.");
  }
});
