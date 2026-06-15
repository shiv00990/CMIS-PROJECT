const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    // 1. Destructure all fields, including the new studentId
    const { Name,email,role, password, confirmPassword,Id } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        // 2. Check if email already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User is already registered. Please login to the application.' });
        }

        // 3. (Optional) Check if Student ID is already taken
        // Only perform this check if a studentId was actually provided
        if (Id) {
            let existingId = await User.findOne({ Id: Id });
            if (existingId) {
                return res.status(400).json({ msg: 'Student ID is already registered to another account.' });
            }
        }

        // 4. Create the new User object
        user = new User({
            Name,
            email,
            password,
            role,
            Id
        });

        // 5. Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 6. Save the user to MongoDB
        await user.save();

        // 7. Create the JWT Payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        // 8. Sign and return the Token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: user.role, id: user.id });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: user.role, id: user.id });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    registerUser,
    loginUser
};