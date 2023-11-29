const Assignment = require("../models/assignmentModel");
const mongoose = require("mongoose");

const generateAssignments = async (req, res) => {
  const { namesList } = req.body;
  if (!namesList) {
    res.status(400).json({
      error: "No list of names provided",
    });
    if (!namesList.isArray()) {
      res.status(400).json({
        error: "Body was not of array format",
      });
    }
    namesList.every((element) => {
      if (!typeof element === "string") {
        res.status(400).json({
          error: "Array does not contain only strings",
        });
      }
    });
  }

  // Shuffle names randomly
  const shuffledNames = namesList.slice().sort(() => Math.random() - 0.5);

  // Assign recipients
  const assignments = shuffledNames.map((from, index) => {
    const recipientIndex = (index + 1) % shuffledNames.length;
    const to = shuffledNames[recipientIndex];
    return { to, from };
  });

  const createdAssignments = [];

  for (const assignment of assignments) {
    try {
      const createdAssignment = await Assignment.create(assignment);
      createdAssignments.push(createdAssignment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  // Send a single response after all assignments are created
  res.status(200).json(createdAssignments);
};

module.exports = {
  generateAssignments,
};
