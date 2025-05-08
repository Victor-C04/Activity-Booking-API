const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

router.get('/test', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
