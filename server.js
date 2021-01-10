const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

connection.on("connected", () => {
  console.log("Mongoose connected successfully.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

// Listen to PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});