function getOffset(currentPage = 1, listPerPage) {
  const offset = (currentPage - 1) * [listPerPage]
  return offset < 0 ? 0 : offset;
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows,
};
