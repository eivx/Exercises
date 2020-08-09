const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./helper');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log('已清除');
  const blogObj = helper.listWithOneBlog.map((blog) => new Blog(blog));
  const promiseArr = blogObj.map((blog) => blog.save());
  await Promise.all(promiseArr);
  console.log('初始化完成');
});

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog equals the like of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(36);
  });
});

describe('blog likes max', () => {
  test('Return to the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[2]);
  });
});

describe('Most blog authors', () => {
  const result = listHelper.mostBlogs(listWithOneBlog);
  test('Author with the most blogs', () => {
    expect(result).toEqual({ author: 'Robert C. Martin', maxNum: 3 });
  });
});

describe('Most Likes', () => {
  const result = listHelper.mostLikes(listWithOneBlog);
  test('Author with the most likes', () => {
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});

describe('blog api test', () => {
  let userId = '';
  beforeEach(async () => {
    console.log('开始初始化用户数据库');
    await User.deleteMany({});
    const passwordHash = bcrypt.hash('admin', 10);
    const user = new User({
      username: 'root',
      password: 'admin',
      name: 'root',
    });
    await user.save();
    userId = user.id;
    console.log('初始化完毕');
  });
  test('get all blog', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.listWithOneBlog.length);
  });
  test('verify blog id', async () => {
    const allBlog = await helper.getAllBlog();
    expect(allBlog[0].id).toBeDefined();
  });

  test('post blog', async () => {
    const newBlog = {
      title: 'hello',
      userId: userId,
      url: 'baidu.com',
    };
    await api
      .post('/api/blogs')
      .set(
        'Authorization',
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsImlkIjoiNWYyYWVkM2JjYzM2YTFlNjY3MmQwMWM3IiwiaWF0IjoxNTk2OTY1NDEzfQ.FSJS41CYblmExlF0V7ho45cUY2rYJoi_nwa92UatHKE'
      )
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const allBlog = await helper.getAllBlog();
    expect(allBlog).toHaveLength(helper.listWithOneBlog.length + 1);
  });

  test('test blog like', async () => {
    const newBlog = {
      title: 'hello',
    };
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const allBlogs = await helper.getAllBlog();
    expect(allBlogs.pop().likes).toBe(0);
  });

  test('blog error', async () => {
    const newBlog = {
      title: 'hello',
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
    const allBlogs = await helper.getAllBlog();
    expect(allBlogs).toHaveLength(helper.listWithOneBlog.length);
  });

  test('delete blog', async () => {
    const allBlogs = await helper.getAllBlog();
    const deleteBlog = allBlogs[0];
    await api.delete(`/api/blogs/${deleteBlog.id}`).expect(204);
    const deleteBlogs = await helper.getAllBlog();
    expect(deleteBlogs).toHaveLength(allBlogs.length - 1);
    const titles = deleteBlogs.map((r) => r.title);
    expect(titles).not.toContain(deleteBlog.title);
  });

  test('upload blog', async () => {
    const allBlogs = await helper.getAllBlog();
    const putBlog = allBlogs[0];
    const newBlog = {
      ...putBlog,
      likes: 20,
    };
    await api.put(`/api/blogs/${putBlog.id}`).send(newBlog).expect(200);
    const putBlogs = await helper.getAllBlog();
    expect(putBlogs[0].likes).toBe(newBlog.likes);
  });
});

describe('test User', () => {
  beforeEach(async () => {
    console.log('开始初始化用户数据库');
    await User.deleteMany({});
    const passwordHash = bcrypt.hash('admin', 10);
    const user = new User({
      username: 'root',
      password: 'admin',
      name: 'root',
    });
    await user.save();
    console.log('初始化完毕');
  });

  test('creat user', async () => {
    const oldUsers = await helper.getAllUser();
    const newUser = {
      username: 'aa',
      name: 'a',
      password: 'aaa',
    };
    await api.post('/api/users').send(newUser).expect(200);

    const newUsers = await helper.getAllUser();
    expect(newUsers).toHaveLength(oldUsers.length + 1);

    const usernames = newUsers.map((r) => r.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creat error user', async () => {
    const oldUsers = await helper.getAllUser();
    const newUser = {
      username: 'root',
      name: 'a',
      password: 'aaa',
    };
    const sendUser = await api.post('/api/users').send(newUser).expect(400);
    expect(sendUser.body.error).toContain('`username` to be unique');

    const newUsers = await helper.getAllUser();
    expect(newUsers.length).toBe(oldUsers.length);
  });

  test('login test', async () => {
    const oldUsers = await helper.getAllUser();
    const loginUser = await api
      .post('/api/login')
      .send({ username: 'root', password: 'admin' })
      .expect(200);
    console.log(loginUser);
    const oldUsersName = oldUsers.map((r) => r.username);
    console.log(oldUsersName);
    expect(loginUser.username).toContain(oldUsersName);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
