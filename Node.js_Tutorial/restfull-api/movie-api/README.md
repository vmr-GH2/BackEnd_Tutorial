Here’s a complete REST API solution in ExpressJS to manage movie details using a SQL database (like MySQL or SQLite), supporting full CRUD operations with Swagger documentation, structured into layers.
npm init -y
npm install express mysql2 swagger-jsdoc swagger-ui-express
note :  Replace mysql2 with sqlite3 or pg if using SQLite/PostgreSQL 
If you want to mock this instead of connecting to SQL:
npm install -g json-server
json-server --watch db.json --port 4000
Then use: http://localhost:4000/movies