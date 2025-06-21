const http = require("http");
const url = require("url");
let products = require("./utils/data.js");
const parseBody = require("./utils/parseBody.js");

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  const idMatch = path.match(/^\/api\/v1\/products\/(\d+)$/); // \/ is escaped to match the literal slash
  //console.log(idMatch)
  /* [
  '/api/v1/products/3',
  '3',
  index: 0,
  input: '/api/v1/products/3',
  groups: undefined
  ] */
  const id = idMatch ? parseInt(idMatch[1]) : null;

  // GET /products
  if (method === "GET" && path === "/api/v1/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(products));
  }

  res.setHeader("Content-Type", "application/json");

  // GET /products/:id
  if (method === "GET" && idMatch) {
    const product = products.find((p) => p.id === id);
    if (product) {
      return res.end(JSON.stringify(product));
    }
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: "Product not found" }));
  }

  // POST /products
  if (method === "POST" && path === "/api/v1/products") {
    try {
      const body = await parseBody(req);
      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        ...body,
      };
      products.push(newProduct);
      res.statusCode = 201;
      return res.end(
        JSON.stringify({
          ...newProduct,
          message: "Product created successfully",
        })
      );
    } catch (err) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  }

  // PUT /products/:id
  if (method === "PUT" && idMatch) {
    try {
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "Product not found" }));
      }
      const body = await parseBody(req);
      products[index] = { ...products[index], ...body };
      return res.end(JSON.stringify(products[index]));
    } catch (err) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: "Invalid JSON" }));
    }
  }

  // DELETE /products/:id
  if (method === "DELETE" && idMatch) {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: "Product not found" }));
    }
    const deleted = products.splice(index, 1);// index is the position of the element to remove, 1 is the number of elements to remove
    //console.log(deleted); return removed elements as an array
    return res.end(JSON.stringify({...deleted[0], message: "Product deleted successfully"}));
  }

  // 404 - Not Found
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
