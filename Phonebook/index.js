require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./models/person");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

const MONGODB_URI =
  "mongodb+srv://Mohamed:${password}@cluster0.bagboyl.mongodb.net/phonebook?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch(next);
});

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `);
    })
    .catch(next);
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({ error: "Person not found" });
      }
      res.json(person);
    })
    .catch(next);
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ error: "Person not found" });
      }
      res.status(204).end();
    })
    .catch(next);
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  Person.findOne({ name })
    .then((existing) => {
      if (existing) {
        existing.number = number;
        return existing
          .save({ runValidators: true, context: "query" })
          .then((updated) => res.json(updated));
      }

      const person = new Person({ name, number });
      return person.save().then((saved) => res.status(201).json(saved));
    })
    .catch(next);
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: "query",
    },
  )
    .then((updated) => {
      if (!updated) {
        return res.status(404).json({ error: "Person not found" });
      }
      res.json(updated);
    })
    .catch(next);
});

app.use((req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
});

app.use((error, req, res, next) => {
  console.error("Error:", error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformatted id" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Phonebook server running on http://localhost:${PORT}`);
});
