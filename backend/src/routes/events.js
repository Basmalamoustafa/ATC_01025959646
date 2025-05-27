const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');
const Event = require('../models/Event');
const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await Event.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch categories' });
  }
});

router.get('/', getEvents);
router.get('/:id', getEvent);

router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;