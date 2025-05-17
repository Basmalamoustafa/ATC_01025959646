// backend/src/controllers/eventController.js
const Event = require('../models/Event');

// @desc   Get all events
// @route  GET /api/events
// @access Public
exports.getEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tags } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(',') };

    const events = await Event.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(filter);

    res.json({
      events,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};


// @desc   Get single event
// @route  GET /api/events/:id
// @access Public
exports.getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ msg: 'Event not found' });
  res.json(event);
};

// @desc   Create new event
// @route  POST /api/events
// @access Admin
exports.createEvent = async (req, res) => {
  const newEvent = await Event.create(req.body);
  res.status(201).json(newEvent);
};

// @desc   Update event
// @route  PUT /api/events/:id
// @access Admin
exports.updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// @desc   Delete event
// @route  DELETE /api/events/:id
// @access Admin
exports.deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Event deleted' });
};
