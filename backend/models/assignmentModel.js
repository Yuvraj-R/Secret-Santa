const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pairingSchema = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pairing", pairingSchema);
