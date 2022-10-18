const sqlConnection = require("../services/sqlConnection");

function addOrderItem(data, callback) {
  var sql = ` INSERT INTO OrderItems 
                (OrderID, ProductID, Quantity, CreatedAt, UpdatedAt)
                VALUES (?,?,?, now(),now())
    `;
  var values = [];
  values.push(data.orderID);
  values.push(data.productID);
  values.push(data.quantity);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function editOrderItem(data, callback) {
  var sql = ` UPDATE OrderItems SET
                Quanity = ?, UpdatedAt = now()
                WHERE OrderID = ? AND ProductID = ?
    `;
  var values = [];
  values.push(data.quantity);
  values.push(data.orderID);
  values.push(data.productID);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function deleteOrderItem(data, callback) {
  var sql = ` DELETE FROM OrderItems WHERE
                OrderID = ? AND ProductID = ?
    `;
  var values = [];
  values.push(data.orderID);
  values.push(data.productID);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function getOrderItem(data, callback) {
  var sql = ` SELECT * FROM OrderItems WHERE
                  OrderID = ? AND ProductID = ?
      `;
  var values = [];
  values.push(data.orderID);
  values.push(data.productID);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function listOrderDetails(data, callback) {
  let sql = ` SELECT * FROM OrderDetails O
                INNER JOIN OrderItems OI ON
                O.ID = OI.OrderID 
                INNER JOIN Products P ON
                OI.ProductID = P.ID 
                WHERE O.UserID = ?
    `;
  let values = [data.userID];
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function getOrderByUser(data, callback) {
  let sql = ` SELECT ID, Total as total FROM
                OrderDetails WHERE
                UserID = ? AND OrderStatus = 1
    `;
  let values = [data.userID];
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function addOrder(data, callback) {
  let sql = ` INSERT INTO ORDERDETAILS
                (Total, UserID, OrderStatus, CreatedAt, UpdatedAt)
                VALUES (?,?,1,now(),now())
    `;
  let values = [];
  values.push(data.total);
  values.push(data.userID);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function editOrder(data, callback) {
  let sql = ` UPDATE OrderDetails SET
                Total = ?, OrderStatus = ?,
                UpdatedAt = now() WHERE
                ID = ?
    `;
  let values = [];
  if (data.payment) {
    sql = ` UPDATE OrderDetails SET
                OrderStatus = ?, UpdatedAt = now()
                WHERE ID = ?
        `;
    values.push(2);
  } else {
    values.push(data.total);
    values.push(1);
  }
  values.push(data.userID);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

function getOrderDetails(data, callback) {
  let sql = ` SELECT od.ID as OrderItem, od.Total as total, p.ID as productID,
                p.Name as ProductName, p.Price as Price, oi.Quantity as Quantity
                FROM OrderDetails as od LEFT JOIN OrderItems as oi ON
                od.ID = oi.OrderID LEFT JOIN Products as p ON
                p.ID = oi.ProductID WHERE
                od.UserID = ? AND OrderStatus = 1
    `;
  let values = [];
  values.push(data.userID);
  sqlConnection.executeQuery(sql, values, (err, result) => {
    callback(err, result);
  });
}

module.exports = {
  addOrderItem,
  editOrderItem,
  deleteOrderItem,
  getOrderItem,
  listOrderDetails,
  getOrderByUser,
  addOrder,
  editOrder,
  getOrderDetails,
};
