const Mission = require("../models/missionSchema");

// Utility function to handle errors
const handleErrors = (error) => {
  let errors = {
    cardName: "",
    cardDescription: "",
    cardType: "",
  };

  if (error.message.includes("Mission card validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ errors: handleErrors(error) });
  }
};

const getMissionById = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (mission) {
      res.json(mission);
    } else {
      res.status(404).json({ message: "Mission card not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: handleErrors(error) });
  }
};

const createMission = async (req, res) => {
  try {
    const newMission = new Mission(req.body);
    const savedMission = await newMission.save();
    res.status(201).json(savedMission);
  } catch (error) {
    res.status(400).json({ errors: handleErrors(error) });
  }
};

const updateMission = async (req, res) => {
  try {
    const updatedMission = await Mission.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (updatedMission) {
      res.json(updatedMission);
    } else {
      res.status(404).json({ message: "Mission card not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: handleErrors(error) });
  }
};

const deleteMission = async (req, res) => {
  try {
    const deletedMission = await Mission.findByIdAndDelete(req.params.id);
    if (deletedMission) {
      res.json({ message: "Mission card deleted successfully" });
    } else {
      res.status(404).json({ message: "Mission card not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: handleErrors(error) });
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const selectRandomCards = (cards, count) => {
  shuffleArray(cards);
  return cards.slice(0, count);
};

const searchMissions = async (req, res) => {
  try {
    const { cardType, cardName, random, exclude } = req.query;

    let query = {};
    if (cardType) {
      query.cardType = { $regex: new RegExp(cardType, "i") };
    }
    if (cardName) {
      query.cardName = { $regex: new RegExp(cardName, "i") };
    }

    if (exclude) {
      const excludeIds = exclude
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((id) => parseInt(id.trim()));
      query.cardId = { $nin: excludeIds };
    }

    let missions = await Mission.find(query);

    if (random) {
      const randomCount = parseInt(random, 10);
      missions = selectRandomCards(missions, randomCount);
    }

    res.json(missions);
  } catch (error) {
    console.error("Error searching missions:", error);
    res.status(500).json({ message: "An error occurred during the search." });
  }
};

const updateMissionWithIcon = async (req, res) => {
  try {
    const missionId = req.params.id;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or incorrect field name." });
    }

    const customIconPath = req.file.path;

    const updatedMission = await Mission.findByIdAndUpdate(
      missionId,
      { $set: { customIconUrl: customIconPath } },
      { new: true }
    );

    if (!updatedMission) {
      return res.status(404).json({ message: "Mission not found." });
    }

    res.status(200).json(updatedMission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission,
  searchMissions,
  updateMissionWithIcon,
};
