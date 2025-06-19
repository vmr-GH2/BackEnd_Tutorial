const { Router } = require("express");
const router = Router();
const multer = require("multer"); //to upload the file
const Blog = require("../models/blog");
const Comment = require("../models/comments");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.get("/add-new-blog", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  //console.log(blog);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

//for comment

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

router.post("/", upload.single("featuredImage"), async (req, res) => {
  const { blogTitle, blogCategory, blogContent } = req.body;
  const blog = await Blog.create({
    title: blogTitle,
    category: blogCategory,
    body: blogContent,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

module.exports = router;
