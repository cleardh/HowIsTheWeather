const mongoose = require('mongoose');
const LocationSchema = mongoose.Schema({
  name: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  latlng: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  username: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Location = mongoose.model('location', LocationSchema);
