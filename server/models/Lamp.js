// models/Lamp.js

const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const LampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Decimal128,
    required: true,
  },
  description: {
    type: String
  },
  lamp_type: {
    type: String
  },
  in_stock: {
    type: Boolean,
    required: true
  },
  image: {
    type: String
  }
}, {
  versionKey: false
});

LampSchema.index({ lamp_type: 1, price: 1 })
module.exports = Lamp = mongoose.model('lamp', LampSchema);