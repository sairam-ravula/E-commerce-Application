const sqlConnection = require("../services/sqlConnection");

function listProducts(data, callback) {
  var sql =
    "SELECT ID AS productID, Name as name, Price as price FROM PRODUCTS";
  var values = [];
  if (data.categoryID) {
    sql += "WHERE categoryID = ?";
    values.push(data.categoryID);
    if (data.minPrice) {
      sql += "AND Price >= ?";
      values.push(data.minPrice);
    } else if (data.maxPrice) {
      sql += "AND Price <= ?";
      values.push(data.maxPrice);
    }
  } else if (data.minPrice) {
    sql += "AND Price >= ?";
    values.push(data.minPrice);
  } else if (data.maxPrice) {
    sql += "AND Price <= ?";
    values.push(data.maxPrice);
  }

  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function addProduct(data, callback) {
  var sql = `INSERT INTO PRODUCTS 
                (Name, Description, Price, vendorID, categoryID, createdAt, updatedAt)
                VALUES (?, ?, ?, ?, ?, now(), now())
    `;
  var values = [];
  values.push(data.Name);
  values.push(data.Description);
  values.push(data.Price);
  values.push(data.vendorID);
  values.push(data.categoryID);

  console.log(values);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function getProductDetails(data, callback) {
  var sql = ` SELECT p.Name as name, p.Price as price, p.Description as description,
                  if((SELECT Count(*) FROM OrderDetails as od LEFT JOIN OrderItems as oi
                  ON oi.OrderID = od.ID WHERE oi.ProductID = p.ID AND od.UserID = ? AND 
                  od.OrderStatus = 1) > 0, 1, 0) AS  addedToCart FROM Products as p
                  WHERE p.ID = ? LIMIT 1
    `;
  let values = [];
  values.push(data.userID);
  values.push(data.productID);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

module.exports = { listProducts, addProduct, getProductDetails };
