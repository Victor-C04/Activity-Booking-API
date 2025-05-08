require('dotenv').config();
const mongoose = require('mongoose');
const Activity = require('./models/Activity');

const seedActivities = [
  {
    title: 'Cricket Match',
    description: 'Weekend cricket tournament',
    location: 'Chennai Stadium',
    dateTime: new Date('2025-05-11T16:00:00Z'),
  },
  {
    title: 'Football League',
    description: 'Local league match',
    location: 'Bangalore Sports Ground',
    dateTime: new Date('2025-05-14T19:00:00Z'),
  },
  {
    title: 'Movie Night',
    description: 'Outdoor movie screening',
    location: 'Hyderabad Amphitheater',
    dateTime: new Date('2025-05-12T20:30:00Z'),
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Activity.deleteMany({});
    await Activity.insertMany(seedActivities);
    console.log('🌱 Activities seeded!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDB();
