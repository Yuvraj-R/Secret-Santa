const Assignment = require("../models/assignmentModel");
const mongoose = require("mongoose");

// GET all Assignment
const getAssignments = async (req, res) => {
  const assignments = await Assignment.find();
  res.status(200).json(assignments);
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

// POST an assignment
const createAssignment = async (req, res) => {
  const { to, from } = req.body;

  let emptyFields = [];

  if (!to) {
    emptyFields.push("to");
  }

  if (!from) {
    emptyFields.push("from");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all required fields",
      emptyFields,
    });
  }

  // add doc to db
  try {
    const assignment = await Assignment.create({ to, from });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE an assignment
const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such assignment" });
  }
  const assignment = await Assignment.findOneAndDelete({ _id: id });
  if (!assignment) {
    return res.status(404).json({ error: "No such assignment" });
  }
  res.status(200).json(assignment);
};

// PATCH an assignment
const updateAssignment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such assignment" });
  }

  const assignment = await Assignment.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!assignment) {
    return res.status(404).json({ error: "No such assignment" });
  }

  res.status(200).json(assignment);
};

module.exports = {
  getAssignments,
  getAssignment,
  deleteAssignment,
  createAssignment,
  updateAssignment,
};
