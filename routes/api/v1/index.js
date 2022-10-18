const express = require("express");

const CategoryController = require("../../../src/controllers/category.controller");
const ProductController = require("../../../src/controllers/product.controller");
const userController = require("../../../src/controllers/user.controller");
const orderController = require("../../../src/controllers/order.controller");

let router = express.Router();

router.post("/product/add", ProductController.addProduct);

router.post("/user/signup", userController.signup);
router.post("/user/login", userController.login);

router.get(
  "/category/all",
  userController.isAuthenticated,
  CategoryController.listCategories
);
router.get(
  "/product/all",
  userController.isAuthenticated,
  ProductController.listProducts
);

router.get(
  "/order/details",
  userController.isAuthenticated,
  orderController.getOrderDetails
);

router.post(
  "/order/details",
  userController.isAuthenticated,
  orderController.createOrder
);

module.exports = router;
