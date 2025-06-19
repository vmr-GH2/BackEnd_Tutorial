# my project:
```We'll be building an API for a pet shelter business. This pet shelter needs to register the pets that are staying in the shelter, and for that we'll perform basic CRUD operations (create, read, update and delete).```

### link : https://www.freecodecamp.org/news/build-consume-and-document-a-rest-api/

For this project we'll follow a layers architecture in our codebase. Layers architecture is about dividing concerns and responsibilities into different folders and files, and allowing direct communication only between certain folders and files.

### application layer (app.js):
Here we're basically setting up our server and declaring that any request that hits the /pets direction should use the routes (endpoints) we have declared in the ./pets/routes/pets.routes.js directory.

### Routes:
- create a file called pets.routes.js;
- we're initializing a router (the thing that processes our request 
and directs them accordingly given the endpoint URL) and setting up each of our endpoints.
- See that for each endpoint we declare the corresponding HTTP method (get, put, and so on) 
and the corresponding function that that endpoint will trigger (listPets, getPet, and so on). Each function name is quite explicit so we can easily know what each endpoint does without needing to see further code.
- Lastly, we also declare which endpoint will receive URL parameters on the requests like this: 
router.get("/:id", getPet); Here we're saying that we'll receive the id of the pet as an URL parameter.

### Controllers:
- create a pets.controllers.js file
- Controllers are the functions that each endpoint request will trigger
- As you can see, they receive as parameters the request and response objects. In the request object we can read things such as URL or body parameters, and we'll use the response object to send 
our response after doing the corresponding computation.
- Each controller calls a specific function defined in our models.

### Models:
- create a pets.models.js file
- These are the functions responsible for interacting with our data layer (database) and returning the corresponding information to our controllers.

### Database:
- We wont use a real database for this example. Instead we'll just use a simple array that will work just fine for example purposes, though our data
 will of course reset every time our server does.
- our db object contains a pets property whose value is an array of objects, each object being a pet. For each pet, we store an id, name, type, age and breed.

### Now go to your terminal and run nodemon app.js. 

```How to Test a REST API with Supertest : ```
### tools:
- Supertest: a library that allows us to test our API endpoints with ease.
    SuperTest is a JavaScript library that is used for testing HTTP servers or web applications that make HTTP requests. 
    It provides a high-level abstraction for testing HTTP, allowing developers to send HTTP requests and make assertions 
    about the responses received, making it easier to write automated tests for web applications.
- Now go to your terminal, run npm test, and you should see all your tests passing:
- Jest: a testing framework that allows us to write unit tests for our code.
- Mocha: a testing framework that allows us to write integration tests for our code.
- Chai: a library that allows us to write assertions in our tests.

### How to Document a REST API with Swagger
- Documenting and API generally means declaring which endpoints are available, what actions are performed by each endpoint, and the parameters and return values for each of them.
- Swagger is a set of open-source tools that help developers build, document, and consume RESTful web services.
- Swagger provides a comprehensive set of features for API development, including API design, documentation, testing, and code generation. 
- go to http://localhost:3000/api-docs/ 


