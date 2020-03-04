const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');


const app = express();
const PORT = process.env.PORT || 5000;

env.config();

// CONNECT DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('Connected to the database');
});

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// IMPORT ROUTES
const authRoute = require('./routes/auth');

// ROUTE MIDDLEWARE
app.use('/api/user', authRoute);

app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
