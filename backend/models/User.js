const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {
        type: String,
        trim: true
    },
    Id: {
        type: String,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'faculty']
        
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;