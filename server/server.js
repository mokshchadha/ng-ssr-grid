const cors = require("cors");
const express = require("express");
const data = require("./dummydata");
const {
  filterUserInfo,
  parseQueryParams,
  paginateUserInfo,
} = require("./utils");
const app = express();

app.use(cors());

app.listen(3000);

app.get("/query", (req, res) => {
  console.log(new Date(), req.url);
  const queryParams = req.query;
  const { pageNumber, filterCriteria } = parseQueryParams(queryParams);
  const filteredUsers = filterUserInfo(data, filterCriteria);
  const pageSize = 10;
  const paginatedUsers = paginateUserInfo(filteredUsers, pageNumber, pageSize);
  res.send(paginatedUsers);
});
