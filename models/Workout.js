const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
  type: {
      type: String,
      required: true,
      trim: true,
  },
  name: {
      type: String,
      required: true,
      trim: true,
  },
  duration: {
      type: Number,
  },
  weight: {
      type: Number,
  },
  reps: {
      type: Number,
  },
  sets: {
      type: Number,
  },
  distance: {
      type: Number
  }
});

const Resistance = mongoose.model("Workout", WorkoutSchema);

module.exports = Resistance;