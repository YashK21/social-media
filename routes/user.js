const router = require("express").Router();
router.get("/", (req, res) => {
  res.send("From home route");
});
module.exports = router;
