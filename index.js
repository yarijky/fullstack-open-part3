require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("tiny"));
app.use(errorHandler);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :body"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/phonebook", (request, response) => {
  Phonebook.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/phonebook/:id", (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/phonebook", (request, response) => {
  const body = request.body;

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

  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  });

  phonebook.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/phonebook/:id", (request, response, next) => {
  const body = request.body;

  const phonebook = {
    name: body.name,
    number: body.number,
  };

  Phonebook.findByIdAndUpdate(request.params.id, phonebook, { new: true })
    .then((updatedPhonebook) => {
      response.json(updatedPhonebook);
    })
    .catch((error) => next(error));
});

app.delete("/api/phonebook/:id", (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Phonebook.find({}).then((people) => {
    const info =
      people.length !== 1
        ? `Phonebook has info for ${people.length} people`
        : `Phonebook has info for 1 person`;
    const date = new Date(Date.now());
    response.send(`<p>${info}</p><p>${date.toString()}</p>`);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
