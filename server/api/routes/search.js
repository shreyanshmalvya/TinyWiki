const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const SearchData = require('../model/searchData');

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
        }
        );


    //creating a counter for each valid search
    SearchData.findOne({ query: query }).exec()
        .then(result => {
            console.log(result);
            //check result using if
            if(result != null){
                let newcount = result.count+1
                SearchData.updateOne({ query: query }, { $set: { count: newcount } }).exec().then(docs => {
                    console.log(docs)
                }).catch();
            }else{
                console.log('reached here')
                const searchdata = new SearchData({
                    _id : new mongoose.Types.ObjectId(),
                    query : query,
                });
                searchdata.save();
                console.log('datasaved');
            }
        })
        .catch(err =>{
            res.status(500).json({
                error : err,
                this: 'yes'
            });
        });
});

module.exports = router;