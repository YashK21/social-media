const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
