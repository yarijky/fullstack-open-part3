const express = require("express");
const app = express();
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :body'))


let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
});

app.get("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = phonebook.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  return Math.floor(Math.random() * 9999999)
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(request.body)

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const checkName = phonebook.find((person) => person.name === body.name);
  if (checkName) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  phonebook = phonebook.concat(person);
  response.json(body);
});

app.delete("/api/phonebook/:id", (request, response) => {
  const id = Number(request.params.id);
  person = phonebook.filter((person) => person.id !== id);

  response.status(204).end();
});

app.get("/info", (request, response) => {
  const info =
    phonebook.length !== 1
      ? `Phonebook has info for ${phonebook.length} people`
      : `Phonebook has info for 1 person`;
  const date = new Date(Date.now());
  response.send(`<p>${info}</p><p>${date.toString()}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
