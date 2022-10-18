const User = require("../models/user.model");
const auth = require("../utils/auth");

function signup(req, res) {
  var data = req.body;
  if (data.Username && data.Password) {
    User.getUserSignUpDetails(data, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Error during signup",
          success: false,
        });
      }
      if (result.length > 0) {
        return res.status(409).send({
          message: "User already exists!!!",
          success: false,
        });
      } else {
        User.signup(data, function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send({
              message: "Error during signup",
              success: false,
            });
          } else {
            return res.status(200).send({
              message: "User successfully signed up!!!",
              success: true,
            });
          }
        });
      }
    });
  } else {
    return res.status(400).send({
      message: "Username or Password is/are missing!!!",
      success: false,
    });
  }
}

function login(req, res) {
  var data = req.body;
  if (data.Username && data.Password) {
    User.login(data, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Some internal error while logging in",
          success: false,
        });
      } else {
        if (result.length == 0) {
          return res.status(404).send({
            message: "Incorrect username/password",
            success: false,
          });
        } else {
          return res.status(200).send({
            message: "User successfully logged in",
            success: true,
            result: result,
          });
        }
      }
    });
  } else {
    return res.status(404).send({
      message: "Username/Password is/are missing!!!",
      success: false,
    });
  }
}

function isAuthenticated(req, res, next) {
  const token = req.headers.x_access_token;
  let response;
  try {
    response = auth.verifyToken(token);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      message: "Invalid Token",
      success: false,
    });
  }
  User.getUserbyID(response.id, (err, result) => {
    if (err) {
      return res.status(401).send({
        message: "Invalid User",
        success: false,
      });
    }
    req.user = result;
    next();
  });
}

module.exports = { signup, login, isAuthenticated };
