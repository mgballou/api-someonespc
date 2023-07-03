// dependencies

const mongoose = require('mongoose');
const {MONGODB_URI} = process.env


// establish DB connection
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI)


// connection events

mongoose.connection
  .on("open", () => console.log("Mongoose connection established"))
  .on("close", () => console.log("Mongoose connection terminated"))
  .on("error", (error) => console.log(error));