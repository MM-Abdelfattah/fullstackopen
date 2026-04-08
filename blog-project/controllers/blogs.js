const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const {
    search,
    author,
    sortBy,
    order = "asc",
    page = 1,
    limit = 10,
  } = request.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (author) {
    query.author = author;
  }

  let sort = {};

  if (sortBy) {
    if (sortBy !== "likes") {
      return response.status(400).json({
        error: "unsupported sort field",
      });
    }

    sort[sortBy] = order === "desc" ? -1 : 1;
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const totalBlogs = await Blog.countDocuments(query);

  const blogs = await Blog.find(query)
    .populate("user", { username: 1, name: 1 })
    .sort(sort)
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

  response.json({
    pagination: {
      currentPage: pageNumber,
      pageSize: limitNumber,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limitNumber),
    },
    data: blogs,
  });
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

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
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({
      error: "blog not found",
    });
  }

  blog.likes = blog.likes + 1;

  const updatedBlog = await blog.save();

  response.json(updatedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({
        error: "blog not found",
      });
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({
        error: "only creator can delete blog",
      });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  },
);

module.exports = blogsRouter;
