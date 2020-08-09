const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { body } = req;
  console.log('开始创建')
  if (!body.password) {
      console.log('输入密码')
    return res.status(401).json({ error: '必须输入密码' });
  } else if (body.password.length < 3) {
      console.log('密码长度')
    return res.status(401).json({ error: '密码长度最少3位' });
  }
  console.log(body);
  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  console.log(user);

  const savedUser = await user.save();
  res.json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { user: 0 });
  res.json(users);
});

usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id);
  res.status(204).end();
});
module.exports = usersRouter;
