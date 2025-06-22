const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./products.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function getById(id) {
  const products = readData();
  const product = products.find((p) => p.id === id);
  return product || null;
}

function add(product) {
  const products = readData();
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    ...product,
  };
  products.push(newProduct);
  writeData(products);
  return newProduct;
}

function removeById(id) {
  const products = readData();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const deleted = products.splice(index, 1)[0];
  writeData(products);
  return deleted;
}

function updateById(id, updatedFields) {
  const products = readData();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updatedFields };
  writeData(products);
  return products[index];
}

module.exports = {
  getAll: () => readData(),

  getById,

  add,

  removeById,

  updateById,
};
