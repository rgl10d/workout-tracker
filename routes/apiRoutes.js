var db = require("../models");

module.exports = function (app) {

  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]).then((workout) => {
      res.json(workout);
    });
  });

  // RETRIEVES LAST 7 WORKOUTS, SORTS THEM AND GIVES TOTAL WORKOUT DURATION
  app.get("/api/workouts/range", function (req, res) {
    db.Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        },
      }
    }]).sort({ _id: -1 })
    .limit(7)
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.json(err);
    });
  });

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

  // app.get("/api/workouts/:id", function (req, res) {
  //   db.Workout.findByIdAndUpdate(req.params.id)
  //   .then(function (dbWorkout) {
  //     res.json(dbWorkout);
  //   });
  // });
};
