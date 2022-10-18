const jwt = require("jsonwebtoken");

function createToken(user) {
  return jwt.sign({ id: user.UserID }, "TejuILoveYou", {
    expiresIn: "10d",
  });
}

function verifyToken(token) {
  try {
    let response = jwt.verify(token, "TejuILoveYou");
    return response;
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = { createToken, verifyToken };
