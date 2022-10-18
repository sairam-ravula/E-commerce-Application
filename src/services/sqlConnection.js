const mysql = require("mysql2");

const config = require("../constants/backendConfig");

var Pool = mysql.createPool(config.mysql.prod);

function executeQuery(sql, data, callback) {
  Pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error in connecting to the database ", err.message);
      callback(err);
    } else {
      console.log("Successfully connected to the database server");
      connection.query(sql, data, (err1, results) => {
        if (err1) {
          callback(err1);
        } else {
          connection.release();
          callback(err1, results);
        }
      });
    }
  });
}

module.exports = { executeQuery };
