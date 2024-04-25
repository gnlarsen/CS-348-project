// models/Order.js

const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    lamp_id: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      required: true
    }
  }, {
    versionKey: false
  });

module.exports = User = mongoose.model('order', OrderSchema);