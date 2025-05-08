const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getActivities, bookActivity, getMyBookings } = require('../controllers/activityController');

router.get('/activities', getActivities);
router.post('/activities/book', auth, bookActivity);
router.get('/activities/my-bookings', auth, getMyBookings);

module.exports = router;
