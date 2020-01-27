const express = require('express');
const config = require('config');
const request = require('request');
const router = express.Router();

const Location = require('../../models/Location');

// @route   GET api/weather/:location_id
// @desc    Get weather by lat and lng
// @access  public
router.get('/:location_id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.location_id);
    const lat = location.latlng.lat;
    const lng = location.latlng.lng;
    const options = {
      uri: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${config.get(
        'openweathermapKey'
      )}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Weather not found' });
      }
      const weatherData = {
        _id: JSON.parse(body).id,
        coord: JSON.parse(body).coord,
        weather: JSON.parse(body).weather[0],
        main: JSON.parse(body).main,
        dt: JSON.parse(body).dt,
        name: JSON.parse(body).name
      };
      res.json(weatherData);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/weather/:lat/:lng
// @desc    Get weather by lat and lng
// @access  public
router.get('/:lat/:lng', (req, res) => {
  try {
    const lat = req.params.lat;
    const lng = req.params.lng;
    const options = {
      uri: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${config.get(
        'openweathermapKey'
      )}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'Weather not found' });
      }
      const weatherData = {
        _id: JSON.parse(body).id,
        coord: JSON.parse(body).coord,
        weather: JSON.parse(body).weather[0],
        main: JSON.parse(body).main,
        dt: JSON.parse(body).dt,
        name: JSON.parse(body).name
      };
      res.json(weatherData);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE api/weather/:location_id
// @desc    Delete weather by location_id
// @access  public
router.delete('/:location_id', async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
