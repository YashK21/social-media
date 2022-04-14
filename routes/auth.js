const router = require("express").Router();
const User = require("../model/schema");
const bcrypt = require("bcrypt");
//register
router.post("/register", async (req, res) => {
  try {
    //hased password
    const salt = await bcrypt.genSalt(10);
    const hasedpassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasedpassword,
    });
    //save new user and res
    const user = await newUser.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user &&
      res.status(404).json({
        success: "false",
        msg: "user not found",
      });
    console.log(user);
    const password = await bcrypt.compare(req.body.password, user.password);
    !password &&
      res.status(400).json({
        success: "false",
        msg: "password doesn't match",
      });
    // if (!user) {
    //   res.status(404).json({
    //     success: "false",
    //     msg: "user not found",
    //   });
    // } else {
    //   res.status(200).json({
    //     success: "true",
    //     msg: "user found",
    //   });
    // }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/", (req, res) => {
  res.send("from auth route");
});

module.exports = router;
