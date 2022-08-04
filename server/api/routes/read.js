const express = require('express');
const router = express.Router();
const axios = require('axios')
const mongoose = require('mongoose');

//create routes for scalabe architechure
//GET request
router.get('/:slug', (req, res, next) => {
    const title = req.params.slug;
    const response = async () => {
        const result = await axios.get(`https://en.wikipedia.org/w/rest.php/v1/page/${title}/html`,
            { 'Api-User-Agent': 'TinyWiki/1' }
        );
        const data = await result;
        console.log(data);
        return data;
    };
    response()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message : 'page fetched',
                title : title,
                html: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;