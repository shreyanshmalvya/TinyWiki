const express = require('express');
const router = express.Router();
const axios = require('axios')
const mongoose = require('mongoose');
const ReadData = require('../model/readData')

//fuction to remove a <base href=\"//en.wikipedia.org/wiki/\"/> tag from the string
function removeBaseHref(str) {
    return str.replace(/<base href=\"\/\/en.wikipedia.org\/wiki\/\"\/>/g, '');
}

//create routes for scalabe architechure
//GET request
router.get('/:slug', (req, res, next) => {
    const title = req.params.slug;
    const response = async () => {
        const result = await axios.get(`https://en.wikipedia.org/w/rest.php/v1/page/${title}/html`,
            { 'Api-User-Agent': 'TinyWiki/1' }
        );
        const data = await result.data;
        return data;
    };
    response()
        .then(result => {
            const html = removeBaseHref(result);
            res.status(200).json({
                message : 'page fetched',
                title : title,
                html: html
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    //creating a counter for each valid read
    ReadData.findOne({ query: title }).exec()
        .then(result => {
            console.log(result);
            //check result using if
            if(result != null){
                let newcount = result.count+1
                ReadData.updateOne({ query: title }, { $set: { count: newcount } }).exec().then(docs => {
                    console.log(docs)
                }).catch();
            }else{
                console.log('reached here')
                const readData = new ReadData({
                    _id : new mongoose.Types.ObjectId(),
                    query : title,
                });
                readData.save();
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