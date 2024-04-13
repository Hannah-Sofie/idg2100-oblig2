const mongoose = require("mongoose");
const Mission = require("./models/missionSchema");
const Assessment = require("./models/assessmentSchema");
const User = require("./models/userSchema");
const missionsData = require("./data/mission.json");
const assessmentsData = require("./data/assessment.json");
const usersData = require("./data/users.json");

require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
};

const importData = async () => {
  try {
    await Mission.deleteMany();
    await Assessment.deleteMany();
    await User.deleteMany();

    await Mission.insertMany(missionsData);
    await Assessment.insertMany(assessmentsData);
    await User.insertMany(usersData);

    console.log("Data imported successfully");
  } catch (error) {
    console.error("Error with data import", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
    process.exit();
  }
};

connectDB().then(() => {
  importData();
});
