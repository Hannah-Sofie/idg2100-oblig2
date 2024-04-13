const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
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
  customIconUrl: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Mission", missionSchema);
