const express = require("express");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs.js");

const app = express();

const mongoUrl = "mongodb://127.0.0.1:27017/bloglist";

mongoose.connect(mongoUrl);

app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
