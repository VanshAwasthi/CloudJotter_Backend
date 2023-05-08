// Database se connect hone leye
const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/cloudjotter_backend"

const connectToMongo = async () => {
    try {
    //   mongoose.set("strictQuery", false);
      mongoose.connect(mongoURI);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = connectToMongo;