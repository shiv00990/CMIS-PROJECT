module.exports = (requiredRole) => (req, res, next) => {
    if (!req.user || !req.user.role) {
        return res.status(500).json({ msg: 'Authorization middleware not applied correctly or user data missing.' });
    }

    if (req.user.role !== requiredRole) {
        return res.status(403).json({ msg: `Access denied. Requires role: ${requiredRole}` });
    }
    next();
};