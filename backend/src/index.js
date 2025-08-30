const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const dotenv = require('dotenv');

// Load .env
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use all routes
app.use(routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));