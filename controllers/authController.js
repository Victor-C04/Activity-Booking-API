const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;
  
      // Check if fields are missing
      if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, phone, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ msg: 'Server error', error: err.message }); // Send more detailed error message
    }
  };
  

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
