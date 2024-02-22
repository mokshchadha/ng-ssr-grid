const cors = require("cors");
const express = require("express");
const data = require("./dummydata");
const app = express();

app.use(cors());

app.listen(3000);

app.get("/query", (req, res) => {
  const params = req.params;
  console.log(new Date(), req.url);
  res.send(data);
});
