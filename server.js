const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

// Express instance
const app = express();

// Define PORT
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

// Express parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect routes
app.use(require("./routes/htmlRoutes.js"));
app.use(require("./routes/apiRoutes.js"));

// Defining a connection to Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

// Post request to the database


// Listen to the PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});