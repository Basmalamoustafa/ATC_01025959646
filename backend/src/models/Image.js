const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  originalName: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);