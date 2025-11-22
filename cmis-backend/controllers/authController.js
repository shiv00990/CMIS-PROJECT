const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.register = async (req, res) => {
    const { emailAddress, password } = req.body;
    try {
        let user = await User.findOne({ emailAddress });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user= new User({ emailAddress, password });
        const salt = await bcrypt.genSalt(10);
        user.password =  await bcrypt.hash(password, salt);
        await user.save();
        const payload = { user:{Id: user.id, role: user.role}};
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
            if(err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.login = async (req, res) => {
    const { emailAddress, password } = req.body;
    try {
        let user = await User.findOne({ emailAddress });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};