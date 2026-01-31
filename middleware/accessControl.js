import User from '../models/User.js'; // Note the .js extension

const checkAccessWindow = async (req, res, next) => {
  try {
    // Admin bypasses time checks
    if (req.user.role === 'admin') return next();

    // Fetch fresh user data
    const user = await User.findById(req.user.id);
    
    if (!user.accessStart || !user.accessEnd) {
      return res.status(403).json({ msg: 'Access window not assigned by Admin.' });
    }

    const currentTime = new Date();

    // Logic: Current Time must be BETWEEN Start and End
    if (currentTime < user.accessStart || currentTime > user.accessEnd) {
      return res.status(403).json({ 
        msg: 'Access Denied: You are outside your allowed time window.',
        windowStart: user.accessStart,
        windowEnd: user.accessEnd,
        serverTime: currentTime
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error during access check' });
  }
};

export default checkAccessWindow;