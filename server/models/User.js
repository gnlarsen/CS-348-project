// models/User.js

const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, {
    versionKey: false
  });

module.exports = User = mongoose.model('user', UserSchema);