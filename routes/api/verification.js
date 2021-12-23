const express = require("express");
const router = express.Router();
const Streamer = require("../../models/Streamer");

// Verification Required Streamer
router.get("/", async (req, res) => {
  await Streamer.find({ verification: 1 }, async (err, streamers) => {
    console.log(streamers);
    res.json(streamers);
  });
});

// Verification Accept
router.post("/:streamer_id", async (req, res) => {
  const streamer = await Streamer.findOneAndUpdate(
    { _id: req.params.streamer_id },
    { verification: 2 },
    { new: true }
  );

  res.json("success");
});

module.exports = router;
