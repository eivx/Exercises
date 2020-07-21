const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
let persons = [
  {
    name: "aaaa",
    number: "11111",
    id: 1,
  },
  {
    name: "bbbb",
    number: "22222",
    id: 2,
  },
  {
    name: "cccc",
    number: "33333",
    id: 3,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 500);
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Missing name or phone",
    });
  }
  const person = { ...req.body, id: id };
  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
