const Pairing = require("../models/assignmentModel");
const mongoose = require("mongoose");

// GET all pairings
const getPairings = async (req, res) => {
  const pairings = await Pairing.find();
  res.status(400).json(pairings);
};

// GET a single pairing
const getPairing = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such pairing" });
  }
  const pairing = await Pairing.findById(id);
  if (!pairing) {
    return res.status(404).json({ error: "No such pairing" });
  }
  res.status(200).json({ pairing });
};
