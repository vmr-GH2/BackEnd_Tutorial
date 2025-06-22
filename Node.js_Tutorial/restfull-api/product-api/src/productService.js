const dao = require("./productDAO.js");

module.exports = {
  getAllProducts: () => dao.getAll(),

  getProductById: (id) => dao.getById(id),

  createProduct: (product) => dao.add(product),

  deleteProductById: (id) => dao.removeById(id),

  updateProductById: (id, data) => dao.updateById(id, data),
};
