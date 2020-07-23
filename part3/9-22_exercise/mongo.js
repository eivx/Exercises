const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const url = ``;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);
// 只有密码参数
if (process.argv.length === 3) {
  console.log("开始查找");
  Person.find({}).then((result) => {
    console.log("phone book");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length > 3) {
  console.log("正在提交");
  const person = new Person({
    name: process.argv[3].toString(),
    date: new Date(),
    number: parseInt(process.argv[4]),
  });
  person.save().then((result) => {
    console.log("已提交");
    console.log(`add ${result.name} number ${result.number} to phone`);
    mongoose.connection.close();
  });
}
