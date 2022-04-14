const express = require("express");
const helmet = require("helmet");
const app = express();
const morgan = require("morgan");
require("./conn/conn");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.listen(8800, () => {
  console.log("started");
});
