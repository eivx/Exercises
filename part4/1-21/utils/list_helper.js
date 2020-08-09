const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.reduce((s1, s2) => {
    return s1 + s2.likes;
  }, 0);
  return likes;
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((s1, s2) => {
    return s1.likes > s2.likes ? s1 : s2;
  });
};

const mostBlogs = (blogs) => {
  let maxEle,
    maxNum = 1;
  const maxAuthor = blogs.reduce((s1, s2) => {
    s1[s2.author] ? s1[s2.author]++ : (s1[s2.author] = 1);
    if (s1[s2.author] > maxNum) {
      maxEle = s2.author;
      maxNum++;
    }
    return s1;
  }, {});
  return { author: maxEle, maxNum: maxAuthor[maxEle] };
};

const mostLikes = (blogs) => {
  let maxEle,
    maxNum = 0;
  blogs.reduce((s1, s2) => {
    s1[s2.author] ? (s1[s2.author] += s2.likes) : (s1[s2.author] = s2.likes);
    if (s1[s2.author] > maxNum) {
      maxNum = s1[s2.author];
      maxEle = s2.author;
    }
    return s1;
  }, {});
  return { author: maxEle, likes: maxNum };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
