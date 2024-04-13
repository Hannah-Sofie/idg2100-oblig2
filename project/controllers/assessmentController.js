const Assessment = require("../models/assessmentSchema");

// Utility function to handle errors
const handleErrors = (error) => {
  let errors = {
    cardName: "",
    cardDescription: "",
    cardType: "",
    cardCategory: "",
    cardDetails: "",
  };

  if (error.message.includes("Assessment card validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ errors: handleErrors(error) });
  }
};

const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (assessment) {
      res.json(assessment);
    } else {
      res.status(404).json({ message: "Assessment card not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: handleErrors(error) });
  }
};

const createAssessment = async (req, res) => {
  try {
    const newAssessment = new Assessment(req.body);
    const savedAssessment = await newAssessment.save();
    res.status(201).json(savedAssessment);
  } catch (error) {
    res.status(400).json({ errors: handleErrors(error) });
  }
};

const updateAssessment = async (req, res) => {
  try {
    const updatedAssessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (updatedAssessment) {
      res.json(updatedAssessment);
    } else {
      res.status(404).json({ message: "Assessment card not found" });
    }
  } catch (error) {
    res.status(500).json({ errors: handleErrors(error) });
  }
};

const deleteAssessment = async (req, res) => {
  try {
    const deletedAssessment = await Assessment.findByIdAndDelete(req.params.id);
    if (deletedAssessment) {
      res.json({ message: "Assessment card deleted successfully" });
    } else {
      res.status(404).json({ message: "Assessment card not found" });
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

const searchAssessments = async (req, res) => {
  try {
    const { cardType, cardCategory, random, exclude } = req.query;

    let query = {};
    if (cardType) {
      query.cardType = { $regex: new RegExp(cardType, "i") };
    }
    if (cardCategory) {
      query.cardCategory = { $regex: new RegExp(cardCategory, "i") };
    }

    if (exclude) {
      const excludeIds = exclude
        .replace(/[\[\]]/g, "")
        .split(",")
        .map((id) => parseInt(id.trim()));
      query.cardId = { $nin: excludeIds };
    }

    let assessments = await Assessment.find(query);

    if (random) {
      const randomCount = parseInt(random, 10);
      assessments = selectRandomCards(assessments, randomCount);
    }

    res.json(assessments);
  } catch (error) {
    console.error("Error searching assessments:", error);
    res.status(500).json({ message: "An error occurred during the search." });
  }
};

const updateAssessmentWithIcon = async (req, res) => {
  try {
    const assessmentId = req.params.id;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No file uploaded or incorrect field name." });
    }

    const customIconPath = req.file.path;

    const updatedAssessment = await Assessment.findByIdAndUpdate(
      assessmentId,
      { $set: { customIconUrl: customIconPath } },
      { new: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({ message: "Assessment not found." });
    }

    res.status(200).json(updatedAssessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  searchAssessments,
  updateAssessmentWithIcon,
};
