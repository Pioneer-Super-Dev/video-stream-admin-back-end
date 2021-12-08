const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/default");
const { check, validationResult } = require("express-validator");

const Setting = require("../../models/Setting");

// @route    POST api/setting/logo
// @desc     Update logo
// @access   Public
router.post("/logo", async (req, res) => {
  const logo = { logo: req.body.logo };

  // Setting.countDocuments({}, function (err, count) {
  //   console.log("there are %d jungle adventures", count);
  // });

  Setting.countDocuments({}, async (err, count) => {
    if (count == 0) {
      let setting = new Setting(logo);
      await setting.save();
    } else {
      let setting = await Setting.findOneAndUpdate({}, logo, { new: true });
    }
  });

  // let setting = await Setting.findOneAndUpdate(
  //   { _id: "61a9935b4403000079003c52" },
  //   logo,
  //   { new: true }
  // );
});

router.post("/menu", async (req, res) => {
  const genders = { genders: req.body.gender };
  // let setting = await Setting.findOneAndUpdate(
  //   { _id: "61a9935b4403000079003c52" },
  //   genders,
  //   { new: true }
  // );

  Setting.countDocuments({}, async (err, count) => {
    if (count == 0) {
      let setting = new Setting(genders);
      await setting.save();
    } else {
      let setting = await Setting.findOneAndUpdate({}, genders, { new: true });
    }
  });
});

router.get("/logo", async (req, res) => {
  const logo = await Setting.findOne({}, {}).select("logo");
  res.json(logo);
});

router.get("/menu", async (req, res) => {
  const gender = await Setting.findOne({}, {}).select("genders");
  res.json(gender);
});

router.delete("/menu/:removeGender", async (req, res) => {
  const genderData = await Setting.findOne({}, {}).select("genders");
  const gender = genderData.genders;
  gender.splice(gender.indexOf(req.params.removeGender), 1);
  console.log(req.params.removeGender, gender);

  let setting = await Setting.findOneAndUpdate(
    {},
    { genders: gender },
    { new: true }
  );

  res.json(setting);
});

module.exports = router;
