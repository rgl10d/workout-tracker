const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Exercise = require('./exerciseModel.js')

// Define PORT
const PORT = process.env.PORT || 3000;

// Express parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Defining a connection to Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

// Post request to the database
app.post("/submit", ({ body }, res) => {
  Exercise.create(body)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});