import express from 'express';
import User from '../models/User.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Set Access Window
router.put('/set-window/:id', verifyToken, isAdmin, async (req, res) => {
  const { accessStart, accessEnd } = req.body;
  
  try {
    if (!accessStart || !accessEnd) {
        return res.status(400).json({ msg: 'Start and End times are required' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        accessStart: new Date(accessStart), 
        accessEnd: new Date(accessEnd) 
      },
      { new: true }
    ).select('-password');

    res.json({ msg: 'Access window updated', user });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;