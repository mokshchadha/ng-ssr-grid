const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());

app.listen(3000);

app.get("/query", (req, res) => {
  const params = req.params;
  console.log(new Date(), req.url);
  res.send([
    {
      orderNo: "1234",
      quantity: 10,
    },
    {
      orderNo: "2312",
      quantity: 15,
    },
    {
      orderNo: "1111",
      quantity: 10,
    },
    {
      orderNo: "4312",
      quantity: 2,
    },
  ]);
});
