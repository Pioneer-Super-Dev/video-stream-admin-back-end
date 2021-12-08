const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const adminauth = require('../../middleware/adminauth');
const jwt = require('jsonwebtoken');
const config = require('../../config/default');
const { check, validationResult } = require('express-validator');

const Admin = require('../../models/Admin');

// @route    POST api/auth/admin
// @desc     Authenticate admin & get token
// @access   Public
router.post(
    '/admin/',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let admin = await Admin.findOne({ email });
  
        if (!admin) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const isMatch = await bcrypt.compare(password, admin.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const payload = {
          admin: {
            id: admin.id
          }
        };
  
        jwt.sign(
          payload,
          config.jwtSecret,
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

  module.exports = router;