const { mockResponse, mockRequest } = require("../mocker");
const jest = require("jest-mock");
const categoryModel = require("../../models/category.model");
const categoryController = require("../../controllers/category.controller");

const testPayLoad = [
  {
    categoryID: 1,
    name: "Electronics",
  },
  {
    categoryID: 2,
    name: "fashion",
  },
];
it("Category controller should return error on all category", async () => {
  const spy = jest
    .spyOn(categoryModel, "listCategories")
    .mockImplementation((cb) => {
      cb(null, testPayLoad);
    });
  const req = mockRequest();
  const res = mockResponse();

  await categoryController.listCategories(req, res);
  expect(spy).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith({
    message: "Error in fetching the Categoies",
    success: false,
  });
});
