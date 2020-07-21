const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URL;
console.log("url为: ", url);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("已连接数据库");
  })
  .catch((error) => {
    console.log("连接数据库失败", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date,
});

personSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
