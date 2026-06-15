

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

const app = express();

app.use(cors());

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('College Management System API running'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/marks', require('./routes/marks'));

app.use('/api/courses', require('./routes/courses'));

app.use('/api/fees', require('./routes/fees'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});