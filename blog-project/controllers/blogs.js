const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const { search, author, sortBy, order, page, limit } = request.query;

  let query = {};

  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (author) {
    query.author = author;
  }

  let sortObject = {};

  if (sortBy) {
    if (sortBy !== "likes") {
      return response.status(400).json({
        error: "unsupported sort field",
      });
    }

    sortObject[sortBy] = order === "asc" ? 1 : -1;
  }

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;

  const skip = (pageNumber - 1) * pageSize;

  const totalBlogs = await Blog.countDocuments(query);

  const blogs = await Blog.find(query)
    .populate("user", {
      username: 1,
      name: 1,
    })
    .sort(sortObject)
    .skip(skip)
    .limit(pageSize);

  response.json({
    pagination: {
      currentPage: pageNumber,
      pageSize: pageSize,
      totalBlogs: totalBlogs,
      totalPages: Math.ceil(totalBlogs / pageSize),
    },

    data: blogs,
  });
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({});

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.patch("/:id/like", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({
        error: "blog not found",
      });
    }

    blog.likes += 1;

    const updatedBlog = await blog.save();

    response.status(200).json(updatedBlog);
  } catch (error) {
    response.status(400).json({
      error: "malformed id",
    });
  }
});

module.exports = blogsRouter;
