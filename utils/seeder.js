const Room = require("../models/room");
const mongoose = require("mongoose");

const rooms = require("../data/rooms.json");

mongoose
  .connect("mongodb://localhost:27017/bookit", {
    connectTimeoutMS: 1000,
  })
  .then((con) => console.log("Connected to local database"));

const seederRooms = async () => {
  try {
    await Room.deleteMany();
    console.log("Deleted All rooms!");

    await Room.insertMany(rooms);
    console.log("All rooms has been inserted!");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seederRooms();
