var db = require("../models");

module.exports = function (app) {
  
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ]).then((workouts) => {
      res.json(workouts);
    });
  });

  // RETRIEVES LAST 7 WORKOUTS
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // CREATE NEW WORKOUTS
  app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
      .then((workouts) => {
        res.json(workouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // UPDATE WORKOUTS
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
      req.params.id,
      {
        $push: { exercises: req.body }
      },
      {
        new: true,
      }
    ).then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      console.log(err);
    });
  });
};
