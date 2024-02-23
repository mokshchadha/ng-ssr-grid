function filterUserInfo(userInfoArray, filterCriteria) {
  return userInfoArray.filter((user) => {
    for (const key in filterCriteria) {
      if (
        user.hasOwnProperty(key) &&
        user[key].toLowerCase().includes(filterCriteria[key].toLowerCase())
      ) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  });
}

function paginateUserInfo(filteredUserInfo, page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  return filteredUserInfo.slice(startIndex, startIndex + pageSize);
}

function parseQueryParams(queryParams) {
  const filterCriteria = {};
  let pageNumber = 1;

  for (const key in queryParams) {
    if (key === "page") {
      pageNumber = parseInt(queryParams[key]);
    } else {
      filterCriteria[key] = queryParams[key];
    }
  }

  return { pageNumber, filterCriteria };
}

module.exports = {
  filterUserInfo,
  paginateUserInfo,
  parseQueryParams,
};
