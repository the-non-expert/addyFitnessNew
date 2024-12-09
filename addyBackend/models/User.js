const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  physicalInfo: {
    height: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
  },
  fitnessInfo: {
    goals: {
      type: String,
      required: false,
    },
    medicalConditions: {
      type: String,
      required: false,
    },
    dietaryRestrictions: {
      type: String,
      required: false,
    },
    emergencyContact: {
      type: String,
      required: false,
    },
    preferredWorkoutTime: {
      type: String,
      required: false,
    },
    experienceLevel: {
      type: String,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// export default mongoose.model("User", userSchema);
