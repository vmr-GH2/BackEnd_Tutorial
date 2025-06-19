const path = require("path");
const express = require("express");
const multer = require("multer"); //Multer is a node.js middleware for handling multipart/form-data,
//  which is primarily used for uploading file

//const upload = multer({ dest: 'uploads/' })

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb callback
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//const upload = multer({ storage });

const upload = multer({
  storage,
});

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); //path.resolve() Resolves a sequence of paths or path segments into an absolute path.
app.use(express.static("public"));

app.use(express.json()); //This is a middleware function
app.use(express.urlencoded({ extended: false })); //This middleware allows your Express.js
// application to understand and process data submitted from HTML forms with methods like POST where the data is encoded in the URL.

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("file"), (req, res) => {
  //console.log(req.body);
  console.log(req.file);

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: <a href="/">upload Again</a>`);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
