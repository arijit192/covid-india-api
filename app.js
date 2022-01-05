var express = require("express");
var PS = require("./process_site");

const app = express();
const port = 2000;

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

//MIDDLEWARE
app.use((req, res, next) => {
  const error = new Error("Bad Request");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});



app.listen(process.env.PORT || 2000,()=>{console.log("API Server is running at "+port+" :)")});
