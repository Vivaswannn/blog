const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  topicId: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('File', fileSchema); 