const mongoose = require("mongoose");

mongoose.connect(
 "mongodb+srv://96yoginpatil:yoginsecure@cluster0.087qxnv.mongodb.net/placement"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
