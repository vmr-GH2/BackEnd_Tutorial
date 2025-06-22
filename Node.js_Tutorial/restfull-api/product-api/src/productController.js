const service = require("./productService.js");

const getAll = (req, res) => {
  const products = service.getAllProducts();
  res.json(products);
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = service.getProductById(id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

const create = (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null)
    return res.status(400).json({ message: "Name and price required" });
  const newProduct = service.createProduct({ name, price });
  res.status(201).json(newProduct);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  if (!name || price == null)
    return res.status(400).json({ message: "Name and price required" });
  const updatedProduct = service.updateProductById(id, { name, price });
  if (!updatedProduct)
    return res.status(404).json({ message: "Product not found" });
  res.json(updatedProduct);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = service.deleteProductById(id);
  if (!deleted) return res.status(404).json({ message: "Product not found" });
  res.json(deleted);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
