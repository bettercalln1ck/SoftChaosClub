const express = require('express');
const router = express.Router();
const Painting = require('../models/Painting');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/paintings
// @desc    Get all paintings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const paintings = await Painting.find({}).sort({ createdAt: -1 });
    res.json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/paintings/:id
// @desc    Get single painting
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (painting) {
      res.json(painting);
    } else {
      res.status(404).json({ message: 'Painting not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/paintings
// @desc    Create a painting
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const painting = new Painting(req.body);
    const createdPainting = await painting.save();
    res.status(201).json(createdPainting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/paintings/:id
// @desc    Update a painting
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);

    if (painting) {
      painting.title = req.body.title || painting.title;
      painting.artist = req.body.artist || painting.artist;
      painting.price = req.body.price || painting.price;
      painting.image = req.body.image || painting.image;
      painting.description = req.body.description || painting.description;
      painting.dimensions = req.body.dimensions || painting.dimensions;
      painting.medium = req.body.medium || painting.medium;
      painting.year = req.body.year || painting.year;
      painting.category = req.body.category || painting.category;

      const updatedPainting = await painting.save();
      res.json(updatedPainting);
    } else {
      res.status(404).json({ message: 'Painting not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/paintings/:id
// @desc    Delete a painting
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (painting) {
      await painting.deleteOne();
      res.json({ message: 'Painting removed' });
    } else {
      res.status(404).json({ message: 'Painting not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


