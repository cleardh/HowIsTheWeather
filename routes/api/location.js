const express = require('express');
const config = require('config');
const request = require('request');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Location = require('../../models/Location');

// @route   POST api/location
// @desc    Save a location
// @access  private
router.post(
  '/',
  [
    auth,
    [
      check('address', 'Address is required')
        .not()
        .isEmpty(),
      check('latlng', 'Latitude & Longitude not found. Check address again')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newLocation = new Location({
        name: req.body.name,
        address: req.body.address,
        latlng: req.body.latlng,
        user: req.user.id,
        username: user.username
      });
      const location = await newLocation.save();
      res.json(location);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route   GET api/location
// @desc    Get all saved locations
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const locations = await Location.find({ user: req.user.id });
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/location/my/:id
// @desc    Get locations by id
// @access  private
router.get('/my/:id', auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/location/:address
// @desc    Get lat & lng of an address
// @access  public
router.get('/:address', (req, res) => {
  try {
    const options = {
      uri: `http://www.mapquestapi.com/geocoding/v1/address?key=${config.get(
        'mapquestKey'
      )}&location=${req.params.address}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Location not found' });
      }
      res.json(JSON.parse(body).results[0].locations[0].latLng);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE api/location/:id
// @desc    Delete a location
// @access  private
router.delete('/:id', auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ msg: 'Location not found' });
    }
    if (location.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await location.remove();
    res.json({ msg: 'Location removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Location not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// // @route   UPDATE api/location/:id
// // @desc    Update a location
// // @access  private
// router.put(
//   '/:id',
//   [
//     auth,
//     [
//       check('address', 'Address is required')
//         .not()
//         .isEmpty(),
//       check('latlng', 'Latitude & Longitude not found. Check address again')
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       let location = await Location.findById(req.params.id);
//       if (!location) {
//         return res.status(404).json({ msg: 'Location not found' });
//       }
//       if (location.user.toString() !== req.user.id) {
//         return res.status(401).json({ msg: 'User not authorized' });
//       }
//       const { name, address, latlng } = req.body;
//       const locationToUpdate = {
//         name,
//         address,
//         latlng,
//         date: Date.now()
//       };
//       if (name === undefined) {
//         locationToUpdate.name = address;
//       }
//       location = await Location.findByIdAndUpdate(
//         req.params.id,
//         { $set: locationToUpdate },
//         { new: true }
//       );
//       res.json(location);
//     } catch (err) {
//       console.error(err.message);
//       if (err.kind === 'ObjectId') {
//         return res.status(404).json({ msg: 'Location not found' });
//       }
//       res.status(500).json({ msg: 'Server error' });
//     }
//   }
// );

module.exports = router;
