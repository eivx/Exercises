const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());


let persons = [
  { name: "a", number: "123132", id: 1 },
  { name: "b", number: "1313", id: 2 },
  { name: "c", number: "1154632", id: 3 },
  { name: "d", number: "1789798132", id: 4 },
];
morgan.token("content", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const time = new Date();
  res.send(
    `<div><p>Phone book has info for ${persons.length} people</p><p>${time}</p></div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person)
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
  const body = req.body;
  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  } else if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  const id = Math.floor(Math.random() * 500);
  const newPerson = {
    id: id,
    number: body.number,
    name: body.name || false,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});
const PORT = 3001;
app.listen(PORT);
