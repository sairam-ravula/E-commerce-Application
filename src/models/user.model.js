const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");

function signup(data, callback) {
  console.log(data);
  var sql = `INSERT INTO users (Username, Password, CreatedAt, UpdatedAt) 
             VALUES (?,?,now(),now())`;
  var values = [];
  values.push(data.Username);
  bcrypt.hash(data.Password, 8, function (err, hash) {
    if (err) {
      console.log(err);
    }
    values.push(hash);
    sqlConnection.executeQuery(sql, values, (err, result) => {
      callback(err, result);
    });
  });
}

function login(data, callback) {
  var sql = `SELECT ID AS UserID, Username, Password, UserType
             FROM Users WHERE Username = ?`;
  var values = [];
  values.push(data.Username);
  sqlConnection.executeQuery(sql, values, function (err, result) {
    if (bcrypt.compare(data.Password, result[0].Password)) {
      const token = auth.createToken(result[0]);
      const response = [
        {
          userId: result[0].UserID,
          username: result[0].Username,
          authToken: token,
        },
      ];
      callback(err, response);
    } else callback(err, []);
  });
}

function getUserSignUpDetails(data, callback) {
  var sql = `SELECT ID AS UserID, Username, UserType
               FROM Users WHERE Username = ? AND 
               Password = ?`;
  var values = [];
  values.push(data.Username);
  values.push(data.Password);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function getUserbyID(id, callback) {
  var sql = `SELECT ID as UserID, Username
               FROM Users WHERE ID = ?`;
  sqlConnection.executeQuery(sql, [id], (err, result) => {
    callback(err, result);
  });
}

module.exports = { signup, login, getUserSignUpDetails, getUserbyID };
