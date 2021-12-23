const express = require("express");
const router = express.Router();
const Payment = require("../../models/Payment");
const User = require("../../models/User");
const Streamer = require("../../models/Streamer");

// Verification Required Streamer
router.get("/", async (req, res) => {
  let payments = await Payment.find({}).exec();

  res.json(payments);
});

module.exports = router;
