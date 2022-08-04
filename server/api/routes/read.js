const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//create routes for scalabe architechure
//GET request
router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

module.exports = router;