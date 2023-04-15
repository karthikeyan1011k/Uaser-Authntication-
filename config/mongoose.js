const mongoose = require("mongoose");

// connect with MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(() => {
    console.log("Unable to connect to mongoDB");
  });

const db = mongoose.connection;

//error
db.on("error", function (err) {
  console.log(err.message);
});

//up and running then print the message
db.once("open", function () {
  console.log("Successfully connected to the database");
});

module.exports = db;