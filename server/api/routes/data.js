const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const SearchData = require('../model/searchData');
const ReadData = require('../model/readData')

router.get('/search', checkAuth , (req, res, next) => {
    //get all the data from mongoose
    SearchData.find().exec()
        .then(result => {
            //declare an array
            let labelArray = [];
            let countArray = [];
            result.map((doc, key) => {
                labelArray[key] = doc.query;
                countArray[key] = doc.count
            })
            console.log(labelArray);
            console.log(countArray);

            //sending it to user
            res.status(200).json({
                message: 'fetched',
                labels: labelArray,
                count: countArray
            });
        })
});

router.get('/read', checkAuth, (req, res, next) => {
    ReadData.find().exec()
        .then(result => {
            //declare an array
            let labelArray = [];
            let countArray = []
            result.map((doc, key) => {
                labelArray[key] = doc.query;
                countArray[key] = doc.count
            })
            console.log(labelArray);
            console.log(countArray);

            //sending it to user
            res.status(200).json({
                message: 'fetched',
                labels: labelArray,
                count: countArray
            });
        })
});


module.exports = router;