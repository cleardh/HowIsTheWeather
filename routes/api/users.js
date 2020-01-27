const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route   POST api/users
// @desc    Register user & get token
// @access  public
router.post(
  '/',
  [
    check('username', 'Username is required')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 4 or more characters'
    ).isLength({ min: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: 'Username already exists' });
      }
      user = new User({
        username,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jwt token
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   DELETE api/users
// @desc    Remove user
// @access  private
router.delete('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'Account not found' });
    }
    await user.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'Account removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
