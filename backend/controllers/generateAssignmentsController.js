const Assignment = require("../models/assignmentModel");
const mongoose = require("mongoose");

const generateAssignments = async (req, res) => {
  const { namesList } = req.body;

  // Validate names list upfront
  if (!namesList || !Array.isArray(namesList)) {
    return res.status(400).json({
      error: "Invalid list of names provided",
    });
  }

  const errors = [];

  // Shuffle names and assign recipients
  const shuffledNames = namesList.slice().sort(() => Math.random() - 0.5);
  const assignments = shuffledNames.map((from, index) => {
    const recipientIndex = (index + 1) % shuffledNames.length;
    const to = shuffledNames[recipientIndex];
    return { to, from };
  });

  // Attempt to create each assignment
  const createdAssignments = [];
  for (const assignment of assignments) {
    try {
      const createdAssignment = await Assignment.create(assignment);
      createdAssignments.push(createdAssignment);
    } catch (error) {
      errors.push(error.message);
    }
  }

  // Check for any errors and send a single response
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(", ") });
  }

  res.status(200).json(createdAssignments);
};

module.exports = {
  generateAssignments,
};
