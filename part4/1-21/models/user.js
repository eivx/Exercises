const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
  },
  name: String,
  passwordHash: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
    delete returnObj.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
