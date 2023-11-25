const express = require("express");
const {
  getAssignments,
  getAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment,
} = require("../controllers/assignmentsController.js");
const router = express.Router();

// GET all Assignments
router.get("/", getAssignments());

// GET a single Assignment
router.get("/:id", getAssignment());

// POST a Assignment
router.post("/", createAssignment());

// DELETE a Assignment
router.delete("/:id", deleteAssignment());

// UPDATE a Assignment
router.patch("/:id", updateAssignment());

module.exports = router;
