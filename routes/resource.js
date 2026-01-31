import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import checkAccessWindow from '../middleware/accessControl.js';
import User from '../models/User.js';

const router = express.Router();

// Validates token AND Time Window
router.get('/protected-data', verifyToken, checkAccessWindow, (req, res) => {
  res.json({ 
    msg: 'Access Granted: You are within your time window.',
    data: 'Here is the confidential data.'
  });
});

// Check status (Frontend helper)
router.get('/status', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('accessStart accessEnd');
      res.json(user);
    } catch (err) {
      res.status(500).send('Server Error');
    }
});

export default router;