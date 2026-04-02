const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getOrCreateDemoClient,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/demo-client", getOrCreateDemoClient);

module.exports = router;
