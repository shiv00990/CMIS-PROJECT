const User = require('../models/User');

const updateUserRole = async (req, res) => {
    const userId = req.params.id;
    const { role } = req.body;

    // Basic validation to ensure the role is one of the allowed values
    const allowedRoles = ['student', 'faculty', 'admin'];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ msg: 'Invalid role specified.' });
    }

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        user.role = role;
        await user.save();

        res.json({ msg: `User role updated to ${role}`, user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during role update.');
    }
};

const searchUser = async (req, res) => {
    const searchParam = req.params.id;

    try {
        let user;
        
        // Check if search parameter looks like an email
        if (searchParam.includes('@')) {
            user = await User.findOne({ email: searchParam }).select('-password');
        } else {
            // Assume it's a MongoDB ID
            user = await User.findById(searchParam).select('-password');
        }

        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        // Note: Mongoose throws an error if ID format is invalid, we return 404
        if (err.kind === 'ObjectId') {
             return res.status(404).json({ msg: 'User not found.' });
        }
        res.status(500).send('Server error during user search.');
    }
};

module.exports = {
    updateUserRole,
    searchUser
};