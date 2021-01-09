var db = require("../models");

module.exports = function (app) {
  // GET ROUTE
  // app.get("/api/workouts", function (req, res) {
  //   db.Workout.find({})
  //   .then(function (dbWorkout) {
  //     res.json(dbWorkout);
  //   });
  // });

  // CREATE NEW WORKOUTS
  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // PUT ROUTE

  // app.get("/api/workouts/:id", function (req, res) {
  //   db.Workout.findByIdAndUpdate(req.params.id)
  //   .then(function (dbWorkout) {
  //     res.json(dbWorkout);
  //   });
  // });
};
