const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res) => {
  const allBlog = await Blog.find({}).populate('user');
  res.json(allBlog);
});

blogsRouter.get('/:id', async (req, res) => {
  const idBlog = await Blog.findById(req.params.id);
  res.json(idBlog);
});

blogsRouter.post('/', async (req, res) => {
  const { body } = req;
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!(token || decodedToken.id)) {
    console.log('error1');
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  console.log(body.userId);
  const user = await User.findById(body.userId);
  console.log(await User.findById(body.userId));
  console.log('user', body.userId);
  if (!user) {
    console.log('error2');
    return res.status(401).json({ error: 'userId Not found' });
  }
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const saveBlog = await newBlog.save();

  user.blogs = user.blogs.concat(saveBlog._id);
  await user.save();
  res.json(saveBlog);
});
type = (obj) => {
  return typeof obj !== 'object'
    ? typeof obj
    : Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

blogsRouter.delete('/:id', async (req, res) => {
  const deleteBlog = await Blog.findById(req.params.id);
  const upUser = jwt.verify(req.token, process.env.SECRET);
  if (deleteBlog.user.toString() === upUser.id) {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } else {
    res.status(401).json({ error: 'token error' });
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req;
  const newBlog = await Blog.findOneAndUpdate(req.params.id, body);
  console.log(newBlog);
  res.json(newBlog);
});

module.exports = blogsRouter;
