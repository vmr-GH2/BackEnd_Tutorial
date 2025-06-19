const express = require("express");
const app = express();

/* `app.use(express.json());` is setting up middleware in the Express application to parse incoming
requests with JSON payloads. This middleware function parses the incoming request body and makes it
available under `req.body` in the request handlers. This allows the application to easily work with
JSON data sent in the request body. */
app.use(express.json());

// In-memory database
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "1984", author: "George Orwell" },
];

//get all books

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

//get single book by id

app.get("/books/:id",(req,res)=>{
    const book = books.find(b=>b.id === parseInt(req.params.id));
    if(!book){
        res.status(404).json({message:"Book not found"});
    }
    res.status(200).json(book);
})

//post a new book

app.post("/books/newbook",(req,res)=>{
    const book = {
        id:books.length+1,
        title:req.body.title,
        author:req.body.author,
    };

    books.push(book);
    res.status(201).json(book);//created a book/resource
})


//put update a book

app.put("/books/:id",(req,res)=>{
  const book = books.find(b=>b.id === parseInt(req.params.id));
  if(!book){
    res.status(404).json({message:"Book not found"});
  }
  book.title = req.body.title;
  book.author = req.body.author;
  res.status(200).json(book);

})

//delete a book

/* The `app.delete("/books/:id", (req, res) => { ... })` route handler in the Express application is
responsible for deleting a book from the in-memory database based on the provided `id` parameter in
the URL. */
app.delete("/books/:id",(req,res)=>{
  const book = books.find(b=>b.id === parseInt(req.params.id));
  if(!book){
    res.status(404).json({message:"Book not found"});
  }
  const index = books.indexOf(book);
  //books.splice(index,1);
  /* The line `books = books.filter(b => b.id !== parseInt(req.params.id));` is filtering the `books`
  array based on the condition that the `id` of each book does not match the `id` provided in the
  request parameters (`req.params.id`). */
  books = books.filter(b => b.id !== parseInt(req.params.id));
  res.status(200).json({message:"Book deleted"});
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});