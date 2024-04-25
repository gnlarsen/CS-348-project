// models/Comment.js

const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: true
    },
    lamp_id: {
      type: String,
      required: true
    },
    text: {
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

module.exports = User = mongoose.model('comment', CommentSchema);