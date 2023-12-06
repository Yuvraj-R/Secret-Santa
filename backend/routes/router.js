const express = require("express");
const {
  getAssignments,
  getAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment,
} = require("../controllers/basicAssignmentsController.js");
const { generateAssignments } = require("../controllers/generateAssignmentsController.js");
const { sendEmailFacilitator } = require("../controllers/sendEmailController.js")

const router = express.Router();

// DB routes:

// GET all Assignments
router.get("/", getAssignments);

// GET a single Assignment
router.get("/:id", getAssignment);

// POST a Assignment
router.post("/create", createAssignment);

// DELETE a Assignment
router.delete("/:id", deleteAssignment);

// UPDATE a Assignment
router.patch("/:id", updateAssignment);

// Other routes:
router.post("/generate", generateAssignments);

router.post("/send-emails", sendEmailFacilitator);

module.exports = router;