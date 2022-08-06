const mongoose = require('mongoose');

const readDataSchema = mongoose.Schema({
    _id :  mongoose.Schema.Types.ObjectId,
    query : {type  : String , required  : true},
    count : {type : Number, default: 1}
});

module.exports = mongoose.model('ReadData', readDataSchema);