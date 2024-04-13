const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  cardId: {
    type: Number,
    unique: true,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
  cardDescription: {
    type: String,
    required: true,
  },
  cardDetails: String,
  cardCategory: {
    type: String,
    enum: [
      "Who is assessed",
      "The assessor",
      "Assessment artefact",
      "Assessment format",
      "Context",
      "Assessment timing",
    ],
  },
  customIconUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Assessment", assessmentSchema);
