const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://assingment:assignment123@cluster0.ftufrfj.mongodb.net/");
    
    console.log("MongoDB connected!!");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongoDB;