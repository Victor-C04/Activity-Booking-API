const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', activityRoutes);

const testRoutes = require('./routes/test');
app.use('/api', testRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Activity Booking API is running');
    // Or serve documentation: res.sendFile(path.join(__dirname, 'docs', 'index.html'));
  });
