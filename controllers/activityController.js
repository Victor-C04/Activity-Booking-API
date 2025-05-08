const Activity = require('../models/Activity');
const Booking = require('../models/Booking');

exports.getActivities = async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
};

exports.bookActivity = async (req, res) => {
  const { activityId } = req.body;
  try {
    const booking = await Booking.create({ user: req.user, activity: activityId });
    res.status(201).json({ msg: 'Activity booked', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user }).populate('activity');
  res.json(bookings);
};
