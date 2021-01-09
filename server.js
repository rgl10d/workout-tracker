const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");


// Express instance
const app = express();

// Define PORT
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

// Express parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connect routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// Defining a connection to Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Listen to the PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
