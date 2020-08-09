const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 1,
    required: true,
  },
  author: String,
  url: {
    type: String,
    minlength: 1,
    required: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (!returnedObject.likes) {
      returnedObject.likes = 0;
    }
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model('Blog', blogSchema);
