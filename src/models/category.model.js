const sqlConnection = require("../services/sqlConnection");

function listCategories(callback) {
  var sql = "SELECT ID AS categoryID, Name as name FROM categories";
  var data = [];
  sqlConnection.executeQuery(sql, data, (err, result) => {
    callback(err, result);
  });
}

function addCategories(callback) {
  var sql = "INSERT INTO categories ";
}

module.exports = { listCategories };
