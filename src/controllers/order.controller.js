const Order = require("../models/order.model");
const Product = require("../models/product.model");

function createOrder(req, res) {
  let data = req.body;
  if (data.userID && data.productID) {
    Product.getProductDetails(data, (err, product) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Some internal server error in creating the order",
          success: false,
        });
      }
      Order.getOrderByUser(data, (err1, order) => {
        if (err1) {
          console.log(err1);
          return res.status(500).send({
            message: "Some internal server error in creating the order",
            success: false,
          });
        }
        if (order.length > 0) {
          data.total =
            parseInt(order[0].total, 10) + parseInt(product[0].price, 10);
          data.userID = order[0].ID;
          Order.editOrder(data, (err2, orderDetail) => {
            if (err2) {
              console.log(err2);
              return res.status(500).send({
                message: "Some internal server error in creating the order",
                success: false,
              });
            }
            Order.addOrderItem(data, (err3, orderItem) => {
              if (err3) {
                console.log(err3);
                return res.status(500).send({
                  message: "Some internal server error in creating the order",
                  success: false,
                });
              }
              return res.status(200).send({
                message: "Successfully created the order",
                success: true,
                orderDetails: {
                  orderID: order[0].ID,
                },
              });
            });
          });
        } else {
          data.total = parseInt(product[0].price, 10);
          Order.addOrder(data, (err, order) => {
            if (err) {
              console.log(err);
              return res.status(500).send({
                message: "Some internal server error in creating the order",
                success: false,
              });
            }
            data.orderID = order[0].insertId;
            Order.addOrderItem(data, (err1, orderItem) => {
              if (err1) {
                console.log(err1);
                return res.status(500).send({
                  message: "Some internal server error in creating the order",
                  success: false,
                });
              }
              return res.status(200).send({
                message: "Successfully created the order",
                success: true,
                orderDetails: {
                  orderID: order[0].ID,
                },
              });
            });
          });
        }
      });
    });
  } else {
    return res.status(400).send({
      message: "Invalid details are passed!!",
      success: false,
    });
  }
}

function getOrderDetails(req, res) {
  let data = req.body;
  if (data.userID) {
    Order.listOrderDetails(data, (err, result) => {
      if (err) {
        return res.status(500).send({
          message: "Unable to fetch the order details",
          success: false,
        });
      }
      return res.status(200).send({
        message: "Successfully fetched the order details",
        success: true,
        orderDetails: result,
      });
    });
  }
}

module.exports = { createOrder, getOrderDetails };
