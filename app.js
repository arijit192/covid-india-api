var express = require("express");
var PS = require("./process_site");

const app = express();

(async function sendData() {
  const total = await PS.FetchTotal();
  const statewise = await PS.FetchStatewise();
  app.get("/total", (req, res) => {
    res.send(total);
  });
  app.get("/statewise", (req, res) => {
    res.send(statewise);
  });
})();

app.listen(2000);
