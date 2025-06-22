Express is middleware-based: It basically funnels incoming requests through a chain of middlewares (of steps) where we can do something with the request, read some data from it, manipulate it, check if the user is authenticated, or basically send back a response immediately. 

In this Sprint we will be creating RESTful API's using ExpressJS and Routes. Build a REST API using ExpressJS to manage the product details and add new products, fetch all the products available, fetch a specific product by id, delete a product .

### Tasks

1.Create an Express server to service requests from clients

2.Create controller, service, DAO, and route layers

3.Define all HTTP methods like GET, POST and DELETE

4.Define routes to the below

Get all the products

Get a product by productid

Create a new product and post the data

Delete a product by productid

## folder structure should be

product-api/
├── controllers/
│   └── productController.js
├── services/
│   └── productService.js
├── dao/
│   └── productDAO.js
├── routes/
│   └── productRoutes.js
├── data/
│   └── products.json
├── app.js
├── package.json

## 🔁 Layer Responsibilities

| Layer           | Responsibility                                                        |
| --------------- | --------------------------------------------------------------------- |
| **Routes**      | Define API endpoints (URLs + HTTP methods)                            |
| **Controllers** | Handle requests/responses, call services                              |
| **Services**    | Business logic (e.g. validation, transformations)                     |
| **DAO**         | Abstract data access (e.g. read/write from file or DB)                |
| **Models**      | Define shape/structure of data (not required for JSON, useful for DB) |
