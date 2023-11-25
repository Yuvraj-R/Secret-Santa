const Assignment = require("../models/assignmentModel");
const mongoose = require("mongoose");

// GET all Assignment
const getAssignments = async (req, res) => {
  const assignments = await Assignment.find();
  res.status(400).json(assignments);
};

// GET a single Assignment
const getAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such assignment" });
  }
  const assignment = await Assignment.findById(id);
  if (!assignment) {
    return res.status(404).json({ error: "No such assignment" });
  }
  res.status(200).json({ assignment });
};

// Need to add post, delete, and patch

module.exports = {
  getAssignments,
  getAssignment,
};
