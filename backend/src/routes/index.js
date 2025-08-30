const express = require('express');
const router = express.Router();

// Routes Import
const imageRoutes = require('./image');

// Routes Def
router.use('/api/image', imageRoutes);

module.exports = router;