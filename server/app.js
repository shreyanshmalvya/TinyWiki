const express = require('express');
const app = express();
const mongoose = require('mongoose');

//creating routes for scalabe architechure
const searchRoute = require('./api/routes/search');
const readRoute = require('./api/routes/read');


//mongoose connection request



//handling CORS errors by adding headers
app.use((req,res,next) =>{
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    //for options request
    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods', 'GET, DELETE, POST')
    }
    next();
});

app.use('/search', searchRoute);
app.use('/read', readRoute);

//handling errors 404 and 500 errors and sending a response
app.use((req, res,next) =>{
    const error = new Error();
    error.status = 404;
    next(error);
});

// a funnel for all other errors !404 
app.use((error, req, res, next)=>{
    res.status = error.status || 500;
    res.json({
        error : error.message
    });
});


module.exports = app;