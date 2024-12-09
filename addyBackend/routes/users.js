const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth"); // Assuming you have this middleware

// Sign Up (existing code)
router.post("/signup", async (req, res) => {
  // ... (keep your existing signup logic)
});

// Login (existing code)
router.post("/login", async (req, res) => {
  // ... (keep your existing login logic)
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const {
      fullName,
      phone,
      dateOfBirth,
      address,
      height,
      weight,
      fitnessGoals,
      medicalConditions,
      dietaryRestrictions,
      emergencyContact,
      preferredWorkoutTime,
      experienceLevel,
    } = req.body;

    // Find user by id (from auth middleware)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.address = address || user.address;
    user.physicalInfo = {
      height: height || user.physicalInfo?.height,
      weight: weight || user.physicalInfo?.weight,
    };
    user.fitnessInfo = {
      goals: fitnessGoals || user.fitnessInfo?.goals,
      medicalConditions:
        medicalConditions || user.fitnessInfo?.medicalConditions,
      dietaryRestrictions:
        dietaryRestrictions || user.fitnessInfo?.dietaryRestrictions,
      emergencyContact: emergencyContact || user.fitnessInfo?.emergencyContact,
      preferredWorkoutTime:
        preferredWorkoutTime || user.fitnessInfo?.preferredWorkoutTime,
      experienceLevel: experienceLevel || user.fitnessInfo?.experienceLevel,
    };

    // Save updated user
    await user.save();

    // Return updated user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json(userResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
