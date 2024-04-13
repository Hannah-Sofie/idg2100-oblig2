const express = require("express");
const router = express.Router();
const upload = require("../uploadConfig");

const {
  getAllMissions,
  getMissionById,
  createMission,
  updateMission,
  deleteMission,
  searchMissions,
  updateMissionWithIcon,
} = require("../controllers/missionController");

router.get("/search", searchMissions);
router.put("/:id/icon", upload.single("customIcon"), updateMissionWithIcon);
router.get("/", getAllMissions);
router.post("/", createMission);
router.get("/:id", getMissionById);
router.put("/:id", updateMission);
router.delete("/:id", deleteMission);

module.exports = router;
