const express = require("express");
const router = express.Router();
const upload = require("../uploadConfig");

const {
  getAllAssessments,
  getAssessmentById,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  searchAssessments,
  updateAssessmentWithIcon,
} = require("../controllers/assessmentController");

router.get("/search", searchAssessments);
router.put("/:id/icon", upload.single("customIcon"), updateAssessmentWithIcon);
router.get("/", getAllAssessments);
router.post("/", createAssessment);
router.get("/:id", getAssessmentById);
router.put("/:id", updateAssessment);
router.delete("/:id", deleteAssessment);

module.exports = router;
