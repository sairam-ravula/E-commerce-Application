const { response } = require("express");
const Category = require("../models/category.model");

function listCategories(req, res) {
  Category.listCategories((err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error in fetching the Categoies",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Successfully fetched the Categories",
      success: true,
      categories: result,
    });
  });
}

module.exports = { listCategories };
