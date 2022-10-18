const Product = require("../models/product.model");
function listProducts(req, res) {
  let data = req.body;
  Product.listProducts(data, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Unable to fetch the product details",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Successfully fetched the product details",
      success: true,
      products: result,
    });
  });
}

function addProduct(req, res) {
  var data = req.body;
  console.log(data);
  if (
    data.Name &&
    data.Description &&
    data.Price &&
    data.vendorID &&
    data.categoryID
  ) {
    Product.addProduct(data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: "Some Internal Server Error while adding products!!!",
          success: false,
        });
      }
      return res.status(200).send({
        message: "Successfully added the product.",
        success: true,
      });
    });
  } else {
    return res.status(401).send({
      message: "Incorrect Product details. Some fields are missing!!!",
      success: false,
    });
  }
}

module.exports = { listProducts, addProduct };
