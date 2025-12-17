const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, 'Please add an artist name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0,
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  dimensions: {
    type: String,
    required: [true, 'Please add dimensions'],
  },
  medium: {
    type: String,
    required: [true, 'Please add medium'],
  },
  year: {
    type: Number,
    required: [true, 'Please add year'],
    min: 1800,
    max: 2100,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['abstract', 'landscape', 'portrait', 'modern', 'classical'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Painting', paintingSchema);


