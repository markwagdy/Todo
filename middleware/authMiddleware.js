const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; // Store user info in request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
