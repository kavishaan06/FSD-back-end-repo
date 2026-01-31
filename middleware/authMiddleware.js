import jwt from 'jsonwebtoken';

// 1. Verify Token
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Expecting format "Bearer <token>"
    // If your frontend sends just the token string, remove .split(" ")[1]
    const tokenString = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    
    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user = decoded.user; // Ensure we attach the user payload correctly
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// 2. Role Check (Admin Only)
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admins only.' });
  }
  next();
};