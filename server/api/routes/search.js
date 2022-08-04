const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const app = require('../../app');

//create routes for scalabe architechure
//handling get requesting by responding with data from api
router.get('/:searchTerm', (req, res, next) => {
    //create a function to get data from api 
    const query = req.params.searchTerm;
    const response = async () => {
        const result = await axios.get(`https://en.wikipedia.org/w/rest.php/v1/search/page?q=${query}&limit=20`,
            { 'Api-User-Agent': 'TinyWiki/1' }
        );
        const data = await result.data;
        return data.pages;
    }
    response()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'similar pages fetched',
                pages: result.map(page => {
                    return {
                        title: page.title,
                        description: page.description,
                        snippet: page.excerpt
                    }
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;